import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
    productSectionInfiniteProductListOptions,
    type ProductSectionInfiniteProductListParams,
} from '@/entities/display/queries';

const useSuspenseInfiniteProductSectionProductList = (
    params: ProductSectionInfiniteProductListParams,
) => {
    return useSuspenseInfiniteQuery(
        productSectionInfiniteProductListOptions(params),
    );
};

export default useSuspenseInfiniteProductSectionProductList;
