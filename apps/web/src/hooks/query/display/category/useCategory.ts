import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import {
    GetCategoryParams,
    GetCategoryResponse,
} from '@/models/display/category';

interface UseCategoryParams<T = GetCategoryResponse> {
    categoryNo: number;
    searchParams?: GetCategoryParams;
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
        queryKey: categoryKeys.detail(categoryNo, searchParams),
        queryFn: async () => {
            const { data } = await category.getCategory(
                categoryNo,
                searchParams,
            );

            return data;
        },
        enabled: !!categoryNo,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useCategory;
