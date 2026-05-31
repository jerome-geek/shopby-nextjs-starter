import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productListOptions,
    type ProductListOptionsParams,
} from '@/entities/product/queries';
import type { ProductsSearchResponse } from '@/entities/product/model/product';

const useProductList = <T = ProductsSearchResponse>({
    searchParams,
    memberNo = 0,
    options,
}: ProductListOptionsParams<T>) => {
    return useSuspenseQuery(
        productListOptions({ searchParams, memberNo, options }),
    );
};

export default useProductList;
