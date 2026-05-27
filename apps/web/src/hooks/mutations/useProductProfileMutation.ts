import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { productProfile } from '@/api/product';
import { productKeys, productProfileKeys } from '@/hooks/queryKeys';
import type {
    DeleteRecentViewProductsParams,
    GetRecentViewProductsResponse,
    RegisterRecentViewProductData,
    UpdateProductsLikeData,
} from '@/models/product/profile';

const useProductProfileMutation = () => {
    const queryClient = useQueryClient();

    const invalidate = useCallback(() => {
        return queryClient.invalidateQueries({
            predicate: (query) =>
                includes(query.queryKey[0], [
                    ...productKeys.all,
                    ...productProfileKeys.all,
                ]),
        });
    }, [queryClient]);

    return {
        /** 최근 본 상품 등록 */
        recentView: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: RegisterRecentViewProductData;
            }) => await productProfile.registerRecentViewProduct(data),
            onSettled: async (_, error) => {
                if (!error) {
                    setTimeout(async () => {
                        await queryClient.invalidateQueries({
                            queryKey: productProfileKeys.recentProduct(),
                        });
                    }, 5500);
                }
            },
        }),

        /** 최근 본 상품 삭제 */
        deleteRecentView: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: DeleteRecentViewProductsParams;
            }) => await productProfile.deleteRecentViewProducts(data),
            onMutate: async ({ data }) => {
                await queryClient.cancelQueries({
                    predicate: (query) =>
                        includes(query.queryKey[0], [
                            ...productProfileKeys.recentProduct(),
                        ]),
                });

                const previousProducts = queryClient.getQueriesData({
                    predicate: (query) => {
                        return (
                            query.queryKey[0] === 'productProfile' &&
                            query.queryKey[1] === 'recentProduct'
                        );
                    },
                });

                previousProducts.forEach(([queryKey]) => {
                    queryClient.setQueryData(
                        queryKey,
                        (old: GetRecentViewProductsResponse) => {
                            if (!old) {
                                  return old;
                            }

                            return old.filter(
                                (item) => item.productNo !== data.productNo,
                            );
                        },
                    );
                });

                return { previousProducts };
            },
            onError: (_, __, context) => {
                // 에러 발생시 이전 상태로 롤백
                if (context?.previousProducts) {
                    // 각 쿼리 데이터를 원래 상태로 복원
                    context.previousProducts.forEach(
                        ([queryKey, previousData]) => {
                            queryClient.setQueryData(queryKey, previousData);
                        },
                    );
                }
            },
        }),

        like: useMutation({
            mutationFn: (params: { data: UpdateProductsLikeData }) =>
                productProfile.updateProductsLike(params.data),
            onSettled: async (_, error) => {
                if (!error) {
                    return invalidate();
                }
            },
        }),
    };
};

export default useProductProfileMutation;
