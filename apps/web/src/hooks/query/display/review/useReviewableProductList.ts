import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import {
    GetReviewableProductsParams,
    GetReviewableProductsResponse,
} from '@/models/display/review';

interface UseReviewableProductListParams<T = GetReviewableProductsResponse> {
    searchParams: GetReviewableProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetReviewableProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { searchParams: GetReviewableProductsParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useReviewableProductList = <T = GetReviewableProductsResponse>({
    searchParams,
    options,
}: UseReviewableProductListParams<T>) => {
    return useQuery({
        queryKey: ['reviewableList', { searchParams }],
        queryFn: async () => {
            const { data } = await review.getReviewableProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useReviewableProductList;
