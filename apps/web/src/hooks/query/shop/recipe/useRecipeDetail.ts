import { useQuery } from '@tanstack/react-query';

import {
    recipeDetailOptions,
    type UseRecipeDetailParams,
} from '@/entities/recipe/queries';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

const useRecipeDetail = <T = GetRecipeDetailResponse>(
    params: UseRecipeDetailParams<T>,
) => useQuery(recipeDetailOptions(params));

export default useRecipeDetail;
