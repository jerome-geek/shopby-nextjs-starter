import { useMutation } from '@tanstack/react-query';
import { productProfile } from '@/api/product';
import { UpdateProductsLikeData } from '@/models/product/profile';

const useProductProfileMutation = () => {
    const like = useMutation({
        mutationFn: (params: { data: UpdateProductsLikeData }) =>
            productProfile.updateProductsLike(params.data),
    });

    return {
        like,
    };
};

export default useProductProfileMutation;
