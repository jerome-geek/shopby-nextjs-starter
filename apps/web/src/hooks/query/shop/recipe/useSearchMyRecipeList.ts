import { useQuery } from '@tanstack/react-query';

import {
    myRecipeQueryOptions,
    type MyRecipeQueryParams,
} from '@/entities/recipe/queries';
import type { SearchRecipesResponse } from '@/models/shop/recipe';

const useSearchMyRecipeList = <T = SearchRecipesResponse>(
    params: MyRecipeQueryParams<T> = {},
) => useQuery(myRecipeQueryOptions(params));

export default useSearchMyRecipeList;
