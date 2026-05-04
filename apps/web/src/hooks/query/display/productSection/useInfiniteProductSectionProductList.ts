import { useInfiniteQuery } from '@tanstack/react-query';

import {
    productSectionInfiniteProductListOptions,
    type ProductSectionInfiniteProductListParams,
} from '@/entities/display/queries';

const useInfiniteProductSectionProductList = (
    params: ProductSectionInfiniteProductListParams,
) => {
    return useInfiniteQuery(productSectionInfiniteProductListOptions(params));
};

export default useInfiniteProductSectionProductList;
