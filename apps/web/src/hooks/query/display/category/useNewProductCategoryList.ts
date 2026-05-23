import { useQuery } from '@tanstack/react-query';

import {
    newProductCategoryListOptions,
    type NewProductCategoryListParams,
} from '@/entities/category/queries';
import type { GetNewProductCategoriesResponse } from '@/models/display/category';

const useNewProductCategoryList = <T = GetNewProductCategoriesResponse>(
    params: NewProductCategoryListParams<T> = {},
) => {
    return useQuery(newProductCategoryListOptions(params));
};

export default useNewProductCategoryList;
