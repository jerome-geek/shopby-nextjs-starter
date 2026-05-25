import { useSuspenseQuery } from '@tanstack/react-query';

import {
    likeProductListOptions,
    type LikeProductListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetLikeProductsResponse } from '@/models/product/profile';

const useLikeProductList = <T = GetLikeProductsResponse>({
    searchParams,
    options,
}: LikeProductListOptionsParams<T>) => {
    return useSuspenseQuery(likeProductListOptions({ searchParams, options }));
};

export default useLikeProductList;
