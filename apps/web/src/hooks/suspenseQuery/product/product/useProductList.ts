import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';

export interface UseProductListParams<T = ProductsSearchResponse> {
    searchParams: ProductSearchParams;
    memberNo?: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            ProductsSearchResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductList = <T = ProductsSearchResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseProductListParams<T>) => {
    return useSuspenseQuery({
        queryKey: productKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.searchProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useProductList;
