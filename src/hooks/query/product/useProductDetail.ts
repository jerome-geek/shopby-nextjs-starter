import { HTTPError } from 'ky';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetProductDetailParams,
    ProductDetailResponse,
} from '@/models/product/product';

interface UseProductDetailParams<T> {
    productNo: number;
    searchParams?: GetProductDetailParams;
    options?: Omit<
        UseQueryOptions<
            ProductDetailResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductDetail = <T = ProductDetailResponse>({
    productNo,
    searchParams,
    options,
}: UseProductDetailParams<T>) => {
    return useQuery({
        queryKey: productKeys.detail(productNo, searchParams),
        queryFn: async () => {
            const response = await product
                .getProductDetail(productNo, searchParams)
                .json();

            return response;
        },
        enabled: !!productNo,
        ...options,
    });
};

export default useProductDetail;
