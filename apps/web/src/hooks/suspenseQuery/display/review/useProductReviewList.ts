import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import { reviewKeys } from '@/hooks/queryKeys';
import type {
    GetProductReviewListParams,
    GetProductReviewListResponse,
} from '@/models/display/review';

interface UseProductReviewListParams<T = GetProductReviewListResponse> {
    productNo: number;
    searchParams: GetProductReviewListParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductReviewListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductReviewList = <T = GetProductReviewListResponse>({
    productNo,
    searchParams,
    options,
}: UseProductReviewListParams<T>) => {
    return useSuspenseQuery({
        queryKey: reviewKeys.list(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewList(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useProductReviewList;
