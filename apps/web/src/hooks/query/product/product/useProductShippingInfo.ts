import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetProductsShippingInfoParams,
    GetProductsShippingInfoResponse,
} from '@/models/product/product';

interface UseShippingInfoParams<T = GetProductsShippingInfoResponse> {
    searchParams: GetProductsShippingInfoParams;
    options?: Omit<
        UseQueryOptions<
            GetProductsShippingInfoResponse,
            AxiosError<ShopByErrorResponse>,
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
            const { data } =
                await product.getProductsShippingInfo(searchParams);

            return data;
        },

        ...options,
    });
};

export default useProductShippingInfo;
