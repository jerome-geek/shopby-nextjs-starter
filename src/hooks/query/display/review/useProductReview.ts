import { HTTPError } from 'ky';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { review } from '@/api/display';
import { GetProductReviewResponse } from '@/models/display/review';
import { reviewKeys } from '@/hooks/queryKeys';

interface UseProductReviewParams<T> {
    productNo: number;
    reviewNo: number;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewResponse,
            HTTPError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: reviewKeys.detail(productNo, reviewNo),
        queryFn: async () => {
            const response = await review
                .getProductReview(productNo, reviewNo)
                .json();

            return response;
        },
        enabled: !!productNo && !!reviewNo,
        ...options,
    });
};

export default useProductReview;
