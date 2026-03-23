import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productProfile } from '@/api/product';
import {
    RegisterRecentViewProductData,
    UpdateProductsLikeData,
} from '@/models/product/profile';
import { productProfileKeys } from '@/hooks/queryKeys';

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

        like: useMutation({
            mutationFn: (params: { data: UpdateProductsLikeData }) =>
                productProfile.updateProductsLike(params.data),
        }),
    };
};

export default useProductProfileMutation;
