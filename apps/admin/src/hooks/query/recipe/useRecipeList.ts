import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import { SearchRecipesParams, SearchRecipesResponse } from '@/model/recipe';

interface UseRecipeListParams<T = SearchRecipesResponse> {
    params: SearchRecipesParams;
    options?: Omit<
        UseQueryOptions<
            SearchRecipesResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecipeList = <T = SearchRecipesResponse>({
    params,
    options,
}: UseRecipeListParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.list(params),
        queryFn: async () => {
            const { data } = await recipe.searchRecipes(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useRecipeList;
