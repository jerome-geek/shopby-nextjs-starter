import { useSuspenseQuery } from '@tanstack/react-query';

import {
    newProductCategoryListOptions,
    type NewProductCategoryListParams,
} from '@/entities/category/queries';
import type { GetNewProductCategoriesResponse } from '@/models/display/category';

const useNewProductCategoryList = <T = GetNewProductCategoriesResponse>(
    params: NewProductCategoryListParams<T> = {},
) => {
    return useSuspenseQuery(newProductCategoryListOptions(params));
};

export default useNewProductCategoryList;
