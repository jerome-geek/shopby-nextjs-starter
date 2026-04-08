import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetBestSellerProductsParams,
    GetBestSellerProductsResponse,
} from '@/models/product/product';

export interface UseBestSellerProductListParams<
    T = GetBestSellerProductsResponse,
> {
    searchParams: GetBestSellerProductsParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetBestSellerProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['bestList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBestSellerProductList = <T = GetBestSellerProductsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseBestSellerProductListParams<T>) => {
    return useQuery({
        queryKey: productKeys.bestList(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getBestSellerProducts(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useBestSellerProductList;
