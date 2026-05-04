import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetBestReviewProductsParams,
    GetBestReviewProductsResponse,
} from '@/models/product/product';

export interface UseBestSellerProductListParams<
    T = GetBestReviewProductsResponse,
> {
    searchParams: GetBestReviewProductsParams;
    memberNo?: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetBestReviewProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['bestReviewList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBestReviewProductList = <T = GetBestReviewProductsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseBestSellerProductListParams<T>) => {
    return useSuspenseQuery({
        queryKey: productKeys.bestReviewList(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getBestReviewProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useBestReviewProductList;
