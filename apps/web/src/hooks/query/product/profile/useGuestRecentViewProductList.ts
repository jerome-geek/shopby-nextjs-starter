import { useQuery } from '@tanstack/react-query';

import {
    guestRecentViewProductListOptions,
    type GuestRecentViewProductListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetRecentViewProductsResponse } from '@/models/product/profile';

const useGuestRecentViewProductList = <T = GetRecentViewProductsResponse>({
    searchParams,
    options,
}: GuestRecentViewProductListOptionsParams<T>) => {
    return useQuery(
        guestRecentViewProductListOptions({ searchParams, options }),
    );
};

export default useGuestRecentViewProductList;
