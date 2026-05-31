import { useQuery } from '@tanstack/react-query';

import {
    additionalDiscountOptions,
    type AdditionalDiscountOptionsParams,
} from '@/entities/product/additionalDiscount/queries';
import type { GetAdditionalDiscountResponse } from '@/entities/product/model/additionalDiscount';

const useAdditionalDiscount = <T = GetAdditionalDiscountResponse>({
    searchParams,
    options,
}: AdditionalDiscountOptionsParams<T>) => {
    return useQuery(additionalDiscountOptions({ searchParams, options }));
};

export default useAdditionalDiscount;
