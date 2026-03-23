import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { review } from '@/api/display';
import { reviewKeys } from '@/hooks/queryKeys';
import { GetProductReviewResponse } from '@/models/display/review';

interface UseProductReviewParams<T> {
    productNo: number;
    reviewNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductReviewResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductReview = <T = GetProductReviewResponse>({
    productNo,
    reviewNo,
    options,
}: UseProductReviewParams<T>) => {
    return useSuspenseQuery({
        queryKey: reviewKeys.detail(productNo, reviewNo),
        queryFn: async () => {
            const { data } = await review.getProductReview(productNo, reviewNo);

            return data;
        },
        ...options,
    });
};

export default useProductReview;
