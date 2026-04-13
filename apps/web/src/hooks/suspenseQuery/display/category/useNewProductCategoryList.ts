import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import type { GetNewProductCategoriesResponse } from '@/models/display/category';

interface UseNewProductCategoryListParams<T = GetNewProductCategoriesResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetNewProductCategoriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['newList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useNewProductCategoryList = <T = GetNewProductCategoriesResponse>({
    options,
}: UseNewProductCategoryListParams<T>) => {
    return useSuspenseQuery({
        queryKey: categoryKeys.newList(),
        queryFn: async () => {
            const { data } = await category.getNewProductCategories();

            return data;
        },
        ...options,
    });
};

export default useNewProductCategoryList;
