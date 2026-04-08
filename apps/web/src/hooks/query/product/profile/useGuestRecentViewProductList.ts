import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import {
    GetGuestRecentViewProductsParams,
    GetRecentViewProductsResponse,
} from '@/models/product/profile';

interface UseGuestRecentViewProductListParams<
    T = GetRecentViewProductsResponse,
> {
    searchParams: GetGuestRecentViewProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetRecentViewProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { searchParams: GetGuestRecentViewProductsParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGuestRecentViewProductList = <T = GetRecentViewProductsResponse>({
    searchParams,
    options,
}: UseGuestRecentViewProductListParams<T>) => {
    return useQuery({
        queryKey: ['guestRecentViewProducts', { searchParams }],
        queryFn: async () => {
            const { data } =
                await productProfile.getGuestRecentViewProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useGuestRecentViewProductList;
