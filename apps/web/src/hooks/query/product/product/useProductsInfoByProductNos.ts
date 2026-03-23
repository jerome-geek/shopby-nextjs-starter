import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetProductsInfoByProductNosData,
    GetProductsInfoByProductNosResponse,
} from '@/models/product/product';

interface UseProductsInfoByProductNosParams<
    T = GetProductsInfoByProductNosResponse,
> {
    searchParams: GetProductsInfoByProductNosData;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetProductsInfoByProductNosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['detailByProductNos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductsInfoByProductNos = <T = GetProductsInfoByProductNosResponse>({
    searchParams,
    memberNo,
    options,
}: UseProductsInfoByProductNosParams<T>) => {
    return useQuery({
        queryKey: productKeys.detailByProductNos(searchParams, memberNo),
        queryFn: async () => {
            const { data } =
                await product.getProductsInfoByProductNos(searchParams);

            return data;
        },
        ...options,
    });
};

export default useProductsInfoByProductNos;
