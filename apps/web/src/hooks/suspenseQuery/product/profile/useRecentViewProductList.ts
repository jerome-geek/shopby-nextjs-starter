import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productProfileKeys } from '@/hooks/queryKeys';
import type {
    GetRecentViewProductsParams,
    GetRecentViewProductsResponse,
} from '@/models/product/profile';

interface UseRecentViewProductListParams<T = GetRecentViewProductsResponse> {
    searchParams: GetRecentViewProductsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: productProfileKeys.recentProducts(searchParams),
        queryFn: async () => {
            const { data } =
                await productProfile.getRecentViewProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useRecentViewProductList;
