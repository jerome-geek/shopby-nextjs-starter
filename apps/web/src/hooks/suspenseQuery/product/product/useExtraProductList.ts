import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type { GetExtraProductsResponse } from '@/models/product/product';

interface UseExtraProductListParams<T = GetExtraProductsResponse> {
    productNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetExtraProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['extraProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useExtraProductList = <T = GetExtraProductsResponse>({
    productNo = 0,
    options,
}: UseExtraProductListParams<T>) => {
    return useSuspenseQuery({
        queryKey: productKeys.extraProducts(productNo),
        queryFn: async () => {
            const { data } = await product.getExtraProducts(productNo);

            return data;
        },
        ...options,
    });
};

export default useExtraProductList;
