import { useSuspenseQuery } from '@tanstack/react-query';

import {
    publicRecipeSuspenseQueryOptions,
    type PublicRecipeSuspenseParams,
} from '@/entities/recipe/queries';
import type { SearchRecipesResponse } from '@/models/shop/recipe';

const usePublicRecipeSearch = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: PublicRecipeSuspenseParams<T>) => {
    return useSuspenseQuery(
        publicRecipeSuspenseQueryOptions({ searchParams, options })
    );
};

export default usePublicRecipeSearch;
