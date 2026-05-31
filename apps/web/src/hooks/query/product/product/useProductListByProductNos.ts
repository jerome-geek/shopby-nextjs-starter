import { useQuery } from '@tanstack/react-query';

import {
    productListByProductNosOptions,
    type ProductListByProductNosOptionsParams,
} from '@/entities/product/queries';
import type { GetProductsInfoByProductNosResponse } from '@/entities/product/model/product';

const useProductListByProductNos = <T = GetProductsInfoByProductNosResponse>({
    searchParams,
    options,
}: ProductListByProductNosOptionsParams<T>) => {
    return useQuery({
        ...productListByProductNosOptions({ searchParams, options }),
        enabled: searchParams.productNos.length > 0,
    });
};

export default useProductListByProductNos;
