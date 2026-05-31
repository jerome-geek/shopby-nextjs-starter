import { useSuspenseQuery } from '@tanstack/react-query';

import {
    categoryAllOptions,
    type CategoryAllParams,
} from '@/entities/category/queries';
import type { GetCategoriesResponse } from '@/entities/display/model/category';

const useCategoryAll = <T = GetCategoriesResponse>(
    params: CategoryAllParams<T> = {},
) => {
    return useSuspenseQuery(categoryAllOptions(params));
};

export default useCategoryAll;
