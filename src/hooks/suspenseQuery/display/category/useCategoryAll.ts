import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import {
    GetCategoriesParams,
    GetCategoriesResponse,
} from '@/models/display/category';

interface UseCategoryAllParams<T = GetCategoriesResponse> {
    params?: GetCategoriesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetCategoriesResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await category.getCategories().json();

            return data;
        },
        ...options,
    });
};

export default useCategoryAll;
