import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productSectionDetailOptions,
    type ProductSectionDetailOptionsParams,
} from '@/entities/display/queries';
import type { GetProductSectionResponse } from '@/models/display/productSection';

const useProductSection = <T = GetProductSectionResponse>(
    params: ProductSectionDetailOptionsParams<T>,
) => {
    return useSuspenseQuery(productSectionDetailOptions(params));
};

export default useProductSection;
