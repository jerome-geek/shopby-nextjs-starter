import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    likeProductListOptions,
    type LikeProductListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetLikeProductsResponse } from '@/entities/product/model/profile';

const useLikeProductList = <T = GetLikeProductsResponse>({
    searchParams,
    memberNo,
    options,
}: LikeProductListOptionsParams<T>) => {
    return useQuery({
        ...likeProductListOptions({ searchParams, memberNo, options }),
        placeholderData: keepPreviousData,
    });
};

export default useLikeProductList;
