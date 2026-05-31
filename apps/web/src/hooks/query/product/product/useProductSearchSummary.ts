import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    productSearchSummaryOptions,
    type ProductSearchSummaryOptionsParams,
} from '@/entities/product/queries';
import type { GetProductSearchSummaryResponse } from '@/entities/product/model/product';

const useProductSearchSummary = <T = GetProductSearchSummaryResponse>({
    searchParams,
    options,
}: ProductSearchSummaryOptionsParams<T>) => {
    return useQuery({
        ...productSearchSummaryOptions({ searchParams, options }),
        placeholderData: keepPreviousData,
    });
};

export default useProductSearchSummary;
