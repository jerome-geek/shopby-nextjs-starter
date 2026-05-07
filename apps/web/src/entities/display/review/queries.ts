import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import reviewKeys from '@/hooks/queryKeys/reviewKeys';
import type {
    GetProductReviewListParams,
    GetProductReviewListResponse,
    GetProductReviewListV2Params,
    GetProductReviewListV2Response,
} from '@/models/display/review';

/**
 * ==========================================
 * Types & Interfaces
 * ==========================================
 */
export interface UseProductReviewListParams<T = GetProductReviewListResponse> {
    productNo: number;
    searchParams: GetProductReviewListParams;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export interface UseProductReviewListV2Params<
    T = GetProductReviewListV2Response,
> {
    productNo: number;
    searchParams: GetProductReviewListV2Params;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewListV2Response,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['listV2']>
        >,
        'queryKey' | 'queryFn'
    >;
}

/**
 * ==========================================
 * Query Options
 * ==========================================
 */

export const productReviewListOptions = <T = GetProductReviewListResponse>({
    productNo,
    searchParams,
    options,
}: UseProductReviewListParams<T>) => {
    return queryOptions({
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

export const productReviewListV2Options = <T = GetProductReviewListV2Response>({
    productNo,
    searchParams,
    options,
}: UseProductReviewListV2Params<T>) => {
    return queryOptions({
        queryKey: reviewKeys.listV2(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewListV2(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};
