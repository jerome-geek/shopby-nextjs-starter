import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productSectionProductListOptions,
    type ProductSectionProductListParams,
} from '@/entities/display/queries';
import type { GetProductSectionProductsResponse } from '@/models/display/productSection';

const useProductSectionProductList = <T = GetProductSectionProductsResponse>(
    params: ProductSectionProductListParams<T>,
) => {
    return useSuspenseQuery(productSectionProductListOptions(params));
};

export default useProductSectionProductList;
