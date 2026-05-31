import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { review } from '@/entities/display/api';
import { reviewKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import type {
    RegisterProductReviewData,
    ReportProductReviewData,
    UpdateProductReviewData,
} from '@/entities/display/model/review';

export const useReviewMutation = ({ productNo }: { productNo: number }) => {
    const queryClient = useQueryClient();

    const { handleErrorToast } = useApiError();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [...reviewKeys.all]);
            },
        });
    };

    const onMutationError = (error: Error) => {
        handleErrorToast(error);
    };

    return {
        register: useMutation({
            mutationFn: async ({ data }: { data: RegisterProductReviewData }) =>
                await review.registerProductReview(productNo, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        modify: useMutation({
            mutationFn: async ({
                reviewNo,
                data,
            }: {
                reviewNo: number;
                data: UpdateProductReviewData;
            }) => await review.updateProductReview(productNo, reviewNo, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        delete: useMutation({
            mutationFn: async ({ reviewNo }: { reviewNo: number }) =>
                await review.deleteProductReview(productNo, reviewNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        recommend: useMutation({
            mutationFn: async ({ reviewNo }: { reviewNo: number }) =>
                await review.recommendProductReview(productNo, reviewNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        cancelRecommend: useMutation({
            mutationFn: async ({ reviewNo }: { reviewNo: number }) =>
                await review.cancelProductReviewRecommend(productNo, reviewNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        report: useMutation({
            mutationFn: async ({
                reviewNo,
                data,
            }: {
                reviewNo: number;
                data: ReportProductReviewData;
            }) => await review.reportProductReview(productNo, reviewNo, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        cancelReport: useMutation({
            mutationFn: async ({ reviewNo }: { reviewNo: number }) =>
                await review.cancelReportProductReview(productNo, reviewNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
    };
};

export default useReviewMutation;
