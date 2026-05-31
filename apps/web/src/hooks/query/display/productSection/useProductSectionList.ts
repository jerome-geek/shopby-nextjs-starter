import { useQuery } from '@tanstack/react-query';

import {
    productSectionListOptions,
    type ProductSectionListParams,
} from '@/entities/display/queries';
import type { GetProductSectionsResponse } from '@/entities/display/model/productSection';

const useProductSectionList = <T = GetProductSectionsResponse>(
    params: ProductSectionListParams<T> = {},
) => {
    return useQuery(productSectionListOptions(params));
};

export default useProductSectionList;
