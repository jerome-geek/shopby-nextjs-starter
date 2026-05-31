import { useSuspenseQuery } from '@tanstack/react-query';

import {
    guestRecentViewProductListOptions,
    type GuestRecentViewProductListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetRecentViewProductsResponse } from '@/models/product/profile';

const useGuestRecentViewProductList = <T = GetRecentViewProductsResponse>({
    searchParams,
    options,
}: GuestRecentViewProductListOptionsParams<T>) => {
    return useSuspenseQuery(
        guestRecentViewProductListOptions({ searchParams, options }),
    );
};

export default useGuestRecentViewProductList;
