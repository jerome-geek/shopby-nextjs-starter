import { useQuery } from '@tanstack/react-query';

import {
    relatedProductListOptions,
    type RelatedProductListOptionsParams,
} from '@/entities/product/queries';
import type { GetRelatedProductsResponse } from '@/entities/product/model/product';

const useRelatedProductList = <T = GetRelatedProductsResponse>({
    productNo,
    options,
}: RelatedProductListOptionsParams<T>) => {
    return useQuery(relatedProductListOptions({ productNo, options }));
};

export default useRelatedProductList;
