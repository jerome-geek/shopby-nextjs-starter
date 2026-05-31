import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    categoryAllOptions,
    type CategoryAllParams,
} from '@/entities/category/queries';
import type { GetCategoriesResponse } from '@/entities/display/model/category';

const useCategoryAll = <T = GetCategoriesResponse>({
    params,
    options,
}: CategoryAllParams<T> = {}) => {
    return useQuery(
        categoryAllOptions({
            params,
            options: {
                placeholderData: keepPreviousData,
                ...options,
            },
        }),
    );
};

export default useCategoryAll;
