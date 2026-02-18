import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetProductDetailParams,
    ProductDetailResponse,
} from '@/models/product/product';

interface UseSuspenseProductDetailParams<T = ProductDetailResponse> {
    productNo: number;
    searchParams?: GetProductDetailParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            ProductDetailResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSuspenseProductDetail = <T = ProductDetailResponse>({
    productNo,
    searchParams,
    options,
}: UseSuspenseProductDetailParams<T>) => {
    return useSuspenseQuery({
        queryKey: productKeys.detail(productNo, undefined, searchParams),
        queryFn: async () => {
            const response = await product
                .getProductDetail(productNo, searchParams)
                .json();

            return response;
        },
        ...options,
    });
};

export default useSuspenseProductDetail;
