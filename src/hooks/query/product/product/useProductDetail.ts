import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import { ChannelType } from '@/models';
import {
    GetProductDetailParams,
    ProductDetailResponse,
} from '@/models/product/product';

interface UseProductDetailParams<T = ProductDetailResponse> {
    productNo: number;
    searchParams?: GetProductDetailParams;
    options?: Omit<
        UseQueryOptions<
            ProductDetailResponse,
            AxiosError<ShopByErrorResponse>,
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
    const query = useSearchParams();
    const preview = query.get('preview') === 'true';
    const channelType = query.get('channelType') as ChannelType;

    return useQuery({
        queryKey: productKeys.detail(productNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getProductDetail(productNo, {
                channelType,
                ...(preview && { preview }),
                ...searchParams,
            });

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useProductDetail;
