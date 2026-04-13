import { isEmpty } from '@fxts/core';
import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import { reviewKeys } from '@/hooks/queryKeys';
import {
    GetProductReviewListResponse,
    GetProductReviewListParams,
} from '@/models/display/review';

interface UseProductReviewListParams<T = GetProductReviewListResponse> {
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

const useProductReviewList = <T = GetProductReviewListResponse>({
    productNo,
    searchParams,
    options,
}: UseProductReviewListParams<T>) => {
    return useQuery({
        queryKey: reviewKeys.list(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewList(
                productNo,
                searchParams,
            );

            return data;
        },
        enabled: !isEmpty(productNo),
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductReviewList;
