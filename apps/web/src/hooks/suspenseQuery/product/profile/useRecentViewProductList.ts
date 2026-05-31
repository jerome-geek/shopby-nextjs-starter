import { useSuspenseQuery } from '@tanstack/react-query';

import {
    recentViewProductListOptions,
    type RecentViewProductListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetRecentViewProductsResponse } from '@/models/product/profile';

const useRecentViewProductList = <T = GetRecentViewProductsResponse>({
    searchParams,
    options,
}: RecentViewProductListOptionsParams<T>) => {
    return useSuspenseQuery(
        recentViewProductListOptions({ searchParams, options }),
    );
};

export default useRecentViewProductList;
