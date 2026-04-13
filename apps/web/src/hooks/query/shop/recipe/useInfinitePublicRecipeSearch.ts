import {
    type InfiniteData,
    keepPreviousData,
    useInfiniteQuery,
    type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type {
    SearchPublicRecipesParams,
    SearchRecipesResponse,
} from '@/models/shop/recipe';

type RecipePublicSearchParams = Omit<
    SearchPublicRecipesParams,
    'page' | 'take'
> & {
    take: number;
};

interface UseInfinitePublicRecipeSearchParams {
    searchParams: RecipePublicSearchParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<SearchRecipesResponse>,
            ReturnType<(typeof recipeKeys)['publicSearchInfinite']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfinitePublicRecipeSearch = ({
    searchParams,
    options,
}: UseInfinitePublicRecipeSearchParams) => {
    return useInfiniteQuery({
        queryKey: recipeKeys.publicSearchInfinite(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await recipe.searchPublicRecipes({
                ...searchParams,
                page: pageParam,
            });

            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfinitePublicRecipeSearch;
