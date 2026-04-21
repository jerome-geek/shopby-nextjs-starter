import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type {
    SearchPublicRecipesParams,
    SearchRecipesResponse,
} from '@/models/shop/recipe';

interface UsePublicRecipeSearchParams<T = SearchRecipesResponse> {
    searchParams: SearchPublicRecipesParams;
    options?: Omit<
        UseQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['publicSearch']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePublicRecipeSearch = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: UsePublicRecipeSearchParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.publicSearch(searchParams),
        queryFn: async () => {
            const { data } = await recipe.searchPublicRecipes(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default usePublicRecipeSearch;
