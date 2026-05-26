import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productSectionByIdOptions,
    type ProductSectionByIdOptionsParams,
} from '@/entities/display/queries';
import type { GetProductSectionByIdResponse } from '@/models/display/productSection';

const useProductSectionById = <T = GetProductSectionByIdResponse>(
    params: ProductSectionByIdOptionsParams<T>,
) => {
    return useSuspenseQuery(productSectionByIdOptions(params));
};

export default useProductSectionById;
