import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import { ShopByErrorResponse } from '@/models/api/response';
import { GetRelatedProductsResponse } from '@/models/product/product';

interface UseRelatedProductListParams<T = GetRelatedProductsResponse> {
    productNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
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
