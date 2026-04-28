import { useQuery } from '@tanstack/react-query';

import {
    publicRecipeQueryOptions,
    type PublicRecipeQueryParams,
} from '@/entities/recipe/queries';
import type { SearchRecipesResponse } from '@/models/shop/recipe';

const usePublicRecipeSearch = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: PublicRecipeQueryParams<T>) => {
    return useQuery(publicRecipeQueryOptions({ searchParams, options }));
};

export default usePublicRecipeSearch;
