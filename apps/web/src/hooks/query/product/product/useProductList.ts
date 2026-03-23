import { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';
import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';

export interface UseProductListParams<T = ProductsSearchResponse> {
    searchParams: ProductSearchParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
        queryKey: productKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.searchProducts(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductList;
