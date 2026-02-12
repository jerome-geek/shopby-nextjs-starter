import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import {
    GetCategoryParams,
    GetCategoryResponse,
} from '@/models/display/category';

interface UseCategoryParams<T = GetCategoryResponse> {
    categoryNo: string;
    searchParams?: GetCategoryParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetCategoryResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await category
                .getCategory(categoryNo, searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useCategory;
