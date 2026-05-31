import { useQuery } from '@tanstack/react-query';

import {
    extraProductListOptions,
    type ExtraProductListOptionsParams,
} from '@/entities/product/queries';
import type { GetExtraProductsResponse } from '@/models/product/product';

const useExtraProductList = <T = GetExtraProductsResponse>({
    productNo = 0,
    options,
}: ExtraProductListOptionsParams<T>) => {
    return useQuery({
        ...extraProductListOptions({ productNo, options }),
        enabled: productNo !== 0,
    });
};

export default useExtraProductList;
