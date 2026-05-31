import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    categoryDetailOptions,
    type CategoryDetailParams,
} from '@/entities/category/queries';
import type { GetCategoryResponse } from '@/entities/display/model/category';

const useCategory = <T = GetCategoryResponse>({
    categoryNo,
    searchParams,
    options,
}: CategoryDetailParams<T>) => {
    return useQuery(
        categoryDetailOptions({
            categoryNo,
            searchParams,
            options: {
                enabled: !!categoryNo,
                placeholderData: keepPreviousData,
                ...options,
            },
        }),
    );
};

export default useCategory;
