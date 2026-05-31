import { useSuspenseQuery } from '@tanstack/react-query';

import {
    categoryDetailOptions,
    type CategoryDetailParams,
} from '@/entities/category/queries';
import type { GetCategoryResponse } from '@/entities/display/model/category';

const useCategory = <T = GetCategoryResponse>(
    params: CategoryDetailParams<T>,
) => {
    return useSuspenseQuery(categoryDetailOptions(params));
};

export default useCategory;
