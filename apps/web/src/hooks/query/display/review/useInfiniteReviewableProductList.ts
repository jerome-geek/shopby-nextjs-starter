import {
    InfiniteData,
    UseInfiniteQueryOptions,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import reviewKeys from '@/hooks/queryKeys/reviewKeys';
import type {
    GetReviewableProductsParams,
    GetReviewableProductsResponse,
} from '@/models/display/review';

interface UseInfiniteReviewableProductListParams {
    searchParams: GetReviewableProductsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetReviewableProductsResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetReviewableProductsResponse>,
            ReturnType<(typeof reviewKeys)['myReviewableInfiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteReviewableProductList = ({
    searchParams,
    options,
}: UseInfiniteReviewableProductListParams) => {
    return useInfiniteQuery({
        queryKey: reviewKeys.myReviewableInfiniteList(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await review.getReviewableProducts({
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

export default useInfiniteReviewableProductList;
