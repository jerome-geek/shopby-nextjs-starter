import {
    InfiniteData,
    UseInfiniteQueryOptions,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import reviewKeys from '@/hooks/queryKeys/reviewKeys';
import type {
    GetMyProductReviewsParams,
    GetMyProductReviewsResponse,
} from '@/models/display/review';

interface UseInfiniteMyReviewListParams {
    searchParams: GetMyProductReviewsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetMyProductReviewsResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetMyProductReviewsResponse>,
            ReturnType<(typeof reviewKeys)['myReviewedInfiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteMyReviewList = ({
    searchParams,
    options,
}: UseInfiniteMyReviewListParams) => {
    return useInfiniteQuery({
        queryKey: reviewKeys.myReviewedInfiniteList(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await review.getMyProductReviews({
                ...searchParams,
                pageNumber: pageParam,
            });
            return data;
        },
        initialPageParam: searchParams.pageNumber ?? 1,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + (page.items?.length ?? 0),
                0,
            );
            if (loaded >= (lastPage.totalCount ?? 0)) {
                return undefined;
            }
            return allPages.length + 1;
        },
        ...options,
    });
};

export default useInfiniteMyReviewList;
