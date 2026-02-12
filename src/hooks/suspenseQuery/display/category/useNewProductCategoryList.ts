import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import { GetNewProductCategoriesResponse } from '@/models/display/category';

interface UseNewProductCategoryListParams<T = GetNewProductCategoriesResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetNewProductCategoriesResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await category.getNewProductCategories().json();

            return data;
        },
        ...options,
    });
};

export default useNewProductCategoryList;
