import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import {
    SearchRecipesParams,
    SearchRecipesResponse,
} from '@/models/shop/recipe';

interface UseSearchMyRecipesParams<T = SearchRecipesResponse> {
    params?: SearchRecipesParams;
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

const useSearchMyRecipes = <T = SearchRecipesResponse>({
    params,
    options,
}: UseSearchMyRecipesParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: recipeKeys.list(params),
        queryFn: async () => {
            const { data } = await recipe.searchMyRecipes(params || {});
            return data;
        },
        ...options,
    });
};

export default useSearchMyRecipes;
