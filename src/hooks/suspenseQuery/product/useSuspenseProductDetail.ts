import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
            AxiosError<ShopByErrorResponse>,
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
        queryKey: productKeys.detail(productNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getProductDetail(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useSuspenseProductDetail;
