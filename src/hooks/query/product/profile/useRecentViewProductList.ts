import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productProfile } from '@/api/product';
import { productProfileKeys } from '@/hooks/queryKeys';
import {
    GetRecentViewProductsParams,
    GetRecentViewProductsResponse,
} from '@/models/product/profile';

interface UseRecentViewProductListParams<T = GetRecentViewProductsResponse> {
    memberNo: number;
    searchParams: GetRecentViewProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetRecentViewProductsResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['recentProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecentViewProductList = <T = GetRecentViewProductsResponse>({
    memberNo = 0,
    searchParams,
    options,
}: UseRecentViewProductListParams<T>) => {
    return useQuery({
        queryKey: productProfileKeys.recentProducts(memberNo, searchParams),
        queryFn: async () => {
            const data = await productProfile
                .getRecentViewProducts(searchParams)
                .json();

            return data;
        },
        ...options,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useRecentViewProductList;
