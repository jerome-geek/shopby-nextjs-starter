import { useSuspenseQuery } from '@tanstack/react-query';

import {
    myRecipeSuspenseQueryOptions,
    type MyRecipeSuspenseParams,
} from '@/entities/recipe/queries';
import type { SearchRecipesResponse } from '@/models/shop/recipe';

const useSearchMyRecipeList = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: MyRecipeSuspenseParams<T> = {}) => {
    return useSuspenseQuery(
        myRecipeSuspenseQueryOptions({
            searchParams,
            options,
        }),
    );
};

export default useSearchMyRecipeList;
