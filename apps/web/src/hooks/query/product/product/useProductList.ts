import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    productListOptions,
    type ProductListOptionsParams,
} from '@/entities/product/queries';
import type { ProductsSearchResponse } from '@/models/product/product';

const useProductList = <T = ProductsSearchResponse>({
    searchParams,
    memberNo = 0,
    options,
}: ProductListOptionsParams<T>) => {
    return useQuery({
        ...productListOptions({ searchParams, memberNo, options }),
        placeholderData: keepPreviousData,
    });
};

export default useProductList;
