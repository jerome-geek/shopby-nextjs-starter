import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

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
            HTTPError<ShopByErrorResponse>,
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
            const data = await productProfile
                .getGuestRecentViewProducts(searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useGuestRecentViewProductList;
