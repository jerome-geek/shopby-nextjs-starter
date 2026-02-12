import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { review } from '@/api/display';

import {
    GetMyProductReviewsParams,
    GetMyProductReviewsResponse,
} from '@/models/display/review';

interface UseMyReviewListParams<T = GetMyProductReviewsResponse> {
    memberNo: number;
    searchParams: GetMyProductReviewsParams;
    options?: Omit<
        UseQueryOptions<
            GetMyProductReviewsResponse,
            HTTPError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: ['myReviewList', { searchParams, memberNo }],
        queryFn: async () => {
            const response = await review
                .getMyProductReviews(searchParams)
                .json();

            return response;
        },
        enabled: memberNo !== 0,
        ...options,
    });
};

export default useMyReviewList;
