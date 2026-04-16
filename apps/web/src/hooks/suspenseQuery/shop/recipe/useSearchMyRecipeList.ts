import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type {
    SearchRecipesParams,
    SearchRecipesResponse,
} from '@/models/shop/recipe';

interface UseSearchMyRecipeListParams<T = SearchRecipesResponse> {
    searchParams?: SearchRecipesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSearchMyRecipeList = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: UseSearchMyRecipeListParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: recipeKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await recipe.searchMyRecipes(searchParams);

            return data;
        },
        ...options,
    });
};

export default useSearchMyRecipeList;
