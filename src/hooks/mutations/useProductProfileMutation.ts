import { useMutation } from '@tanstack/react-query';
import { productProfile } from '@/api/product';
import { UpdateProductsLikeData } from '@/models/product/profile';

export const useProductProfileMutation = () => {
    const like = useMutation({
        mutationFn: (params: { data: UpdateProductsLikeData }) =>
            productProfile.updateProductsLike(params.data).json(),
    });

    return {
        like,
    };
};
