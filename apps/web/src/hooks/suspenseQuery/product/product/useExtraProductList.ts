import { useSuspenseQuery } from '@tanstack/react-query';

import {
    extraProductListOptions,
    type ExtraProductListOptionsParams,
} from '@/entities/product/queries';
import type { GetExtraProductsResponse } from '@/models/product/product';

const useExtraProductList = <T = GetExtraProductsResponse>({
    productNo = 0,
    options,
}: ExtraProductListOptionsParams<T>) => {
    return useSuspenseQuery(extraProductListOptions({ productNo, options }));
};

export default useExtraProductList;
