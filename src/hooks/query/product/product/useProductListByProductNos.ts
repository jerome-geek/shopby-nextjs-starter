import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetProductsInfoByProductNosData,
    GetProductsInfoByProductNosResponse,
} from '@/models/product/product';

interface UseProductListByProductNos<T = GetProductsInfoByProductNosResponse> {
    /** POST 요청이지만 다른 hooks와 컨벤션을 맞추기 위해 data -> searchParams */
    searchParams: GetProductsInfoByProductNosData;
    options?: Omit<
        UseQueryOptions<
            GetProductsInfoByProductNosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductListByProductNos = <T = GetProductsInfoByProductNosResponse>({
    searchParams,
    options,
}: UseProductListByProductNos<T>) => {
    return useQuery({
        queryKey: productKeys.list(0, searchParams),
        queryFn: async () => {
            const { data } =
                await product.getProductsInfoByProductNos(searchParams);

            return data;
        },
        enabled: searchParams.productNos.length > 0,
        ...options,
    });
};

export default useProductListByProductNos;
