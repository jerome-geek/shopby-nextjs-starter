import { useMutation } from '@tanstack/react-query';

import { review } from '@/api/display';
import type {
    RegisterProductReviewData,
    UpdateProductReviewData,
} from '@/models/display/review';

export const useReviewMutation = ({ productNo }: { productNo: number }) => {
    return {
        register: useMutation({
            mutationFn: async ({ data }: { data: RegisterProductReviewData }) =>
                await review.registerProductReview(productNo, data),
        }),
        modify: useMutation({
            mutationFn: async ({
                reviewNo,
                data,
            }: {
                reviewNo: number;
                data: UpdateProductReviewData;
            }) => await review.updateProductReview(productNo, reviewNo, data),
        }),
        delete: useMutation({
            mutationFn: async ({ reviewNo }: { reviewNo: number }) =>
                await review.deleteProductReview(productNo, reviewNo),
        }),
    };
};

export default useReviewMutation;

