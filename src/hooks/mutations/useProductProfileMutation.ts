import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productProfile } from '@/api/product';
import { productKeys, productProfileKeys } from '@/hooks/queryKeys';
import {
    DeleteRecentViewProductsParams,
    RegisterRecentViewProductData,
    ToggleLikeBrandsData,
    UpdateProductsLikeData,
} from '@/models/product/profile';

const useProductProfileMutation = () => {
    const queryClient = useQueryClient();

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
                            refetchType: 'all',
                        });
                    }, 5500);
                }
            },
        }),

        /** 최근 본 상품 삭제 */
        deleteRecentProduct: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: DeleteRecentViewProductsParams;
            }) => await productProfile.deleteRecentViewProducts(data),
        }),

        /** 브랜드 좋아요 설정 및 해제 */
        brandLike: useMutation({
            mutationFn: async ({ data }: { data: ToggleLikeBrandsData }) =>
                await productProfile.toggleLikeBrands(data),
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        queryKey: productProfileKeys.brands(),
                        refetchType: 'all',
                    });
                }
            },
        }),

        /** 상품 좋아요 설정 및 해제 */
        like: useMutation({
            mutationKey: productProfileKeys.likeProducts(),
            mutationFn: async ({ data }: { data: UpdateProductsLikeData }) =>
                await productProfile.updateProductsLike(data),
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [
                                ...productKeys.all,
                                ...productProfileKeys.all,
                            ]),
                    });
                }
            },
        }),
    };
};

export default useProductProfileMutation;
