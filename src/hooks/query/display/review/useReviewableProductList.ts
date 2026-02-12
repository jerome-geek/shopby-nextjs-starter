import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

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
            HTTPError<ShopByErrorResponse>,
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
            const response = await review
                .getReviewableProducts(searchParams)
                .json();

            return response;
        },
        ...options,
    });
};

export default useReviewableProductList;
