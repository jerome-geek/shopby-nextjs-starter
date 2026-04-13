import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type { GetRelatedProductsResponse } from '@/models/product/product';

interface UseRelatedProductListParams<T = GetRelatedProductsResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetRelatedProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['relatedProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRelatedProductList = <T = GetRelatedProductsResponse>({
    productNo,
    options,
}: UseRelatedProductListParams<T>) => {
    return useQuery({
        queryKey: productKeys.relatedProducts(productNo),
        queryFn: async () => {
            const { data } = await product.getRelatedProducts(productNo);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useRelatedProductList;
