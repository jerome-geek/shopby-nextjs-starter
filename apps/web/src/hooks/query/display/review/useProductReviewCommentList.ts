import { isEmpty } from '@fxts/core';
import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import { reviewKeys } from '@/hooks/queryKeys';
import type {
    GetProductReviewCommentResponse,
    GetProductReviewListParams,
} from '@/models/display/review';

interface UseProductReviewCommentListParams<
    T = GetProductReviewCommentResponse,
> {
    productNo: number;
    reviewNo: number;
    searchParams: GetProductReviewListParams;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewCommentResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['comment']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductReviewCommentList = <T = GetProductReviewCommentResponse>({
    productNo,
    reviewNo,
    searchParams,
    options,
}: UseProductReviewCommentListParams<T>) => {
    return useQuery({
        queryKey: reviewKeys.comment(productNo, reviewNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewComments(
                productNo,
                reviewNo,
                searchParams,
            );

            return data;
        },
        enabled: !isEmpty(productNo),
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductReviewCommentList;
