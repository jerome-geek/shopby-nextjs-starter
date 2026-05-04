import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type { GetExtraProductsResponse } from '@/models/product/product';

interface UseExtraProductList<T = GetExtraProductsResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
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
}: UseExtraProductList<T>) => {
    return useQuery({
        queryKey: productKeys.extraProducts(productNo),
        queryFn: async () => {
            const { data } = await product.getExtraProducts(productNo);

            return data;
        },
        enabled: productNo !== 0,
        ...options,
    });
};

export default useExtraProductList;
