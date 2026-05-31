import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    bestSellerProductListOptions,
    type BestSellerProductListOptionsParams,
} from '@/entities/product/queries';
import type { GetBestSellerProductsResponse } from '@/models/product/product';

const useBestSellerProductList = <T = GetBestSellerProductsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: BestSellerProductListOptionsParams<T>) => {
    return useQuery({
        ...bestSellerProductListOptions({ searchParams, memberNo, options }),
        placeholderData: keepPreviousData,
    });
};

export default useBestSellerProductList;
