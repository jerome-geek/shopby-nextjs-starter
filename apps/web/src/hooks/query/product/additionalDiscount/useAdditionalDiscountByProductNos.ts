import { useQuery } from '@tanstack/react-query';

import {
    additionalDiscountByProductNosOptions,
    type AdditionalDiscountByProductNosOptionsParams,
} from '@/entities/product/additionalDiscount/queries';
import type { GetAdditionalDiscountByProductNosResponse } from '@/entities/product/model/additionalDiscount';

const useAdditionalDiscountByProductNos = <
    T = GetAdditionalDiscountByProductNosResponse,
>({
    searchParams,
    options,
}: AdditionalDiscountByProductNosOptionsParams<T>) => {
    return useQuery(
        additionalDiscountByProductNosOptions({ searchParams, options }),
    );
};

export default useAdditionalDiscountByProductNos;
