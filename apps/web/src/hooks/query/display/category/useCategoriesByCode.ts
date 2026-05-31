import { isEmpty } from '@fxts/core';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    categoriesByCodeOptions,
    type CategoriesByCodeParams,
} from '@/entities/category/queries';
import type { GetCategoriesByManagementCodeResponse } from '@/entities/display/model/category';

const useCategoriesByCode = <T = GetCategoriesByManagementCodeResponse>({
    data,
    options,
}: CategoriesByCodeParams<T>) => {
    return useQuery(
        categoriesByCodeOptions({
            data,
            options: {
                enabled: !isEmpty(data.codes),
                placeholderData: keepPreviousData,
                ...options,
            },
        }),
    );
};

export default useCategoriesByCode;
