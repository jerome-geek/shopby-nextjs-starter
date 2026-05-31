import { useSuspenseQuery } from '@tanstack/react-query';

import {
    relatedProductListOptions,
    type RelatedProductListOptionsParams,
} from '@/entities/product/queries';
import type { GetRelatedProductsResponse } from '@/models/product/product';

const useRelatedProductList = <T = GetRelatedProductsResponse>({
    productNo,
    options,
}: RelatedProductListOptionsParams<T>) => {
    return useSuspenseQuery(relatedProductListOptions({ productNo, options }));
};

export default useRelatedProductList;
