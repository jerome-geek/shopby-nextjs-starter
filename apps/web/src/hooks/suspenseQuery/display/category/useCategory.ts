import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import type {
    GetCategoryParams,
    GetCategoryResponse,
} from '@/models/display/category';

interface UseCategoryParams<T = GetCategoryResponse> {
    categoryNo: string;
    searchParams?: GetCategoryParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetCategoryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCategory = <T = GetCategoryResponse>({
    categoryNo,
    searchParams,
    options,
}: UseCategoryParams<T>) => {
    return useSuspenseQuery({
        queryKey: categoryKeys.detail(categoryNo, searchParams),
        queryFn: async () => {
            const { data } = await category.getCategory(
                categoryNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useCategory;
