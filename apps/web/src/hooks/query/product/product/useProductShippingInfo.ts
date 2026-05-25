import { useQuery } from '@tanstack/react-query';

import {
    productShippingInfoOptions,
    type ProductShippingInfoOptionsParams,
} from '@/entities/product/queries';
import type { GetProductsShippingInfoResponse } from '@/models/product/product';

const useProductShippingInfo = <T = GetProductsShippingInfoResponse>({
    searchParams,
    options,
}: ProductShippingInfoOptionsParams<T>) => {
    return useQuery(productShippingInfoOptions({ searchParams, options }));
};

export default useProductShippingInfo;
