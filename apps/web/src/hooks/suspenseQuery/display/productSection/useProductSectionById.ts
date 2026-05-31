import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productSectionByIdOptions,
    type ProductSectionByIdOptionsParams,
} from '@/entities/display/queries';
import type { GetProductSectionByIdResponse } from '@/entities/display/model/productSection';

const useProductSectionById = <T = GetProductSectionByIdResponse>(
    params: ProductSectionByIdOptionsParams<T>,
) => {
    return useSuspenseQuery(productSectionByIdOptions(params));
};

export default useProductSectionById;
