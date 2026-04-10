import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import { SearchRecipesParams, SearchRecipesResponse } from '@/model/recipe';

interface UseSearchRecipeListParams<T = SearchRecipesResponse> {
    params: SearchRecipesParams;
    options?: Omit<
        UseQueryOptions<
            SearchRecipesResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['searchRecipe']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSearchRecipeList = <T = SearchRecipesResponse>({
    params,
    options,
}: UseSearchRecipeListParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.searchRecipe(params),
        queryFn: async () => {
            const { data } = await recipe.searchRecipes(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useSearchRecipeList;
