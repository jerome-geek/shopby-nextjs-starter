import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import type {
    GetReviewableProductsParams,
    GetReviewableProductsResponse,
} from '@/models/display/review';
import { reviewKeys } from '@/hooks/queryKeys';

interface UseReviewableProductListParams<T = GetReviewableProductsResponse> {
    searchParams: GetReviewableProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetReviewableProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['myReviewableList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useReviewableProductList = <T = GetReviewableProductsResponse>({
    searchParams,
    options,
}: UseReviewableProductListParams<T>) => {
    return useQuery({
        queryKey: reviewKeys.myReviewableList(searchParams),
        queryFn: async () => {
            const { data } = await review.getReviewableProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useReviewableProductList;
