import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteBestSellerProductListOptions,
    type InfiniteBestSellerProductListOptionsParams,
} from '@/entities/product/queries';

const useInfiniteBestSellerProductList = ({
    searchParams,
    memberNo = 0,
    options,
}: InfiniteBestSellerProductListOptionsParams) => {
    return useInfiniteQuery({
        ...infiniteBestSellerProductListOptions({ searchParams, memberNo, options }),
        placeholderData: keepPreviousData,
    });
};

export default useInfiniteBestSellerProductList;
