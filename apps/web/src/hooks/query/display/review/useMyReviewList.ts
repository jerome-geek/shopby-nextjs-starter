import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import {
    GetMyProductReviewsParams,
    GetMyProductReviewsResponse,
} from '@/models/display/review';
import { reviewKeys } from '@/hooks/queryKeys';

interface UseMyReviewListParams<T = GetMyProductReviewsResponse> {
    searchParams: GetMyProductReviewsParams;
    options?: Omit<
        UseQueryOptions<
            GetMyProductReviewsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['myReviewedList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMyReviewList = <T = GetMyProductReviewsResponse>({
    searchParams,
    options,
}: UseMyReviewListParams<T>) => {
    return useQuery({
        queryKey: reviewKeys.myReviewedList(searchParams),
        queryFn: async () => {
            const { data } = await review.getMyProductReviews(searchParams);

            return data;
        },
        ...options,
    });
};

export default useMyReviewList;
