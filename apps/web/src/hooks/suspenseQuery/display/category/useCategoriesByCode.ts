import { useSuspenseQuery } from '@tanstack/react-query';

import {
    categoriesByCodeOptions,
    type CategoriesByCodeParams,
} from '@/entities/category/queries';
import type { GetCategoriesByManagementCodeResponse } from '@/models/display/category';

const useCategoriesByCode = <T = GetCategoriesByManagementCodeResponse>(
    params: CategoriesByCodeParams<T>,
) => {
    return useSuspenseQuery(categoriesByCodeOptions(params));
};

export default useCategoriesByCode;
