import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import { GetExtraProductsResponse } from '@/models/product/product';

interface UseShippingInfoParams<T = GetExtraProductsResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetExtraProductsResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['extraProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useExtraProducts = <T = GetExtraProductsResponse>({
    productNo = 0,
    options,
}: UseShippingInfoParams<T>) => {
    return useQuery({
        queryKey: productKeys.extraProducts(productNo),
        queryFn: async () => {
            const data = await product.getExtraProducts(productNo).json();

            return data;
        },
        enabled: productNo !== 0,
        ...options,
    });
};

export default useExtraProducts;
