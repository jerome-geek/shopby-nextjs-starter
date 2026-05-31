import { useQuery } from '@tanstack/react-query';

import {
    productsInfoByProductNosOptions,
    type ProductsInfoByProductNosOptionsParams,
} from '@/entities/product/queries';
import type { GetProductsInfoByProductNosResponse } from '@/models/product/product';

const useProductsInfoByProductNos = <T = GetProductsInfoByProductNosResponse>({
    searchParams,
    memberNo,
    options,
}: ProductsInfoByProductNosOptionsParams<T>) => {
    return useQuery(
        productsInfoByProductNosOptions({ searchParams, memberNo, options }),
    );
};

export default useProductsInfoByProductNos;
