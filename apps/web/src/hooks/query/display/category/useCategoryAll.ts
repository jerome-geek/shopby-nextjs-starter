import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import type {
    GetCategoriesParams,
    GetCategoriesResponse,
} from '@/models/display/category';

interface UseCategoryAllParams<T = GetCategoriesResponse> {
    params?: GetCategoriesParams;
    options?: Omit<
        UseQueryOptions<
            GetCategoriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCategoryAll = <T = GetCategoriesResponse>({
    params,
    options,
}: UseCategoryAllParams<T> = {}) => {
    return useQuery({
        queryKey: categoryKeys.list(params),
        queryFn: async () => {
            const { data } = await category.getCategories(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useCategoryAll;
