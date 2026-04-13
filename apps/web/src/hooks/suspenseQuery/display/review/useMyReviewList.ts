import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import type {
    GetMyProductReviewsParams,
    GetMyProductReviewsResponse,
} from '@/models/display/review';

interface UseMyReviewListParams<T = GetMyProductReviewsResponse> {
    memberNo: number;
    searchParams: GetMyProductReviewsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetMyProductReviewsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [
                string,
                {
                    searchParams: GetMyProductReviewsParams;
                    memberNo: number;
                },
            ]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMyReviewList = <T = GetMyProductReviewsResponse>({
    memberNo = 0,
    searchParams,
    options,
}: UseMyReviewListParams<T>) => {
    return useSuspenseQuery({
        queryKey: ['myReviewList', { searchParams, memberNo }],
        queryFn: async () => {
            const { data } = await review.getMyProductReviews(searchParams);

            return data;
        },
        ...options,
    });
};

export default useMyReviewList;
