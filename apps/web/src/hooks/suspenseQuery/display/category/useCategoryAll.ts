import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
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
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: categoryKeys.list(params),
        queryFn: async () => {
            const { data } = await category.getCategories();

            return data;
        },
        ...options,
    });
};

export default useCategoryAll;
