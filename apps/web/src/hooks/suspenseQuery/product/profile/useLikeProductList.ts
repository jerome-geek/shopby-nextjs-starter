import { useSuspenseQuery } from '@tanstack/react-query';

import {
    likeProductListOptions,
    type LikeProductListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetLikeProductsResponse } from '@/models/product/profile';

const useLikeProductList = <T = GetLikeProductsResponse>({
    searchParams,
    memberNo,
    options,
}: LikeProductListOptionsParams<T>) => {
    return useSuspenseQuery(
        likeProductListOptions({ searchParams, memberNo, options }),
    );
};

export default useLikeProductList;
