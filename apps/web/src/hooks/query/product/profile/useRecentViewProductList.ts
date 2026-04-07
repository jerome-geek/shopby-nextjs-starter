import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productProfileKeys } from '@/hooks/queryKeys';
import {
    GetRecentViewProductsParams,
    GetRecentViewProductsResponse,
} from '@/models/product/profile';

interface UseRecentViewProductListParams<T = GetRecentViewProductsResponse> {
    searchParams: GetRecentViewProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetRecentViewProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['recentProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecentViewProductList = <T = GetRecentViewProductsResponse>({
    searchParams,
    options,
}: UseRecentViewProductListParams<T>) => {
    return useQuery({
        queryKey: productProfileKeys.recentProducts(searchParams),
        queryFn: async () => {
            const { data } = await productProfile.getRecentViewProducts(
                searchParams,
            );

            return data;
        },
        ...options,
        enabled: options?.enabled ?? true,
    });
};

export default useRecentViewProductList;
