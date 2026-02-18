import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetProductsShippingInfoParams,
    GetProductsShippingInfoResponse,
} from '@/models/product/product';

interface UseShippingInfoParams<T = GetProductsShippingInfoResponse> {
    searchParams: GetProductsShippingInfoParams;
    options?: Omit<
        UseQueryOptions<
            GetProductsShippingInfoResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['shippingInfo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductShippingInfo = <T = GetProductsShippingInfoResponse>({
    searchParams,
    options,
}: UseShippingInfoParams<T>) => {
    return useQuery({
        queryKey: productKeys.shippingInfo(searchParams),
        queryFn: async () => {
            const data = await product
                .getProductsShippingInfo(searchParams)
                .json();

            return data;
        },

        ...options,
    });
};

export default useProductShippingInfo;
