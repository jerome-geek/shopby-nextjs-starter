import { useSuspenseQuery } from '@tanstack/react-query';

import {
    recipeDetailSuspenseOptions,
    type UseRecipeDetailSuspenseParams,
} from '@/entities/recipe/queries';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

const useRecipeDetail = <T = GetRecipeDetailResponse>(
    params: UseRecipeDetailSuspenseParams<T>,
) => useSuspenseQuery(recipeDetailSuspenseOptions(params));

export default useRecipeDetail;
