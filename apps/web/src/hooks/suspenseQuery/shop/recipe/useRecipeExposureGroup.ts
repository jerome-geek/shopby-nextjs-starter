import { useSuspenseQuery } from '@tanstack/react-query';

import {
    recipeExposureGroupSuspenseOptions,
    type UseRecipeExposureGroupSuspenseParams,
} from '@/entities/recipe/queries';
import type { RecipeExposureGroupResponse } from '@/models/shop/recipe';

const useRecipeExposureGroup = <T = RecipeExposureGroupResponse>(
    params: UseRecipeExposureGroupSuspenseParams<T>,
) => useSuspenseQuery(recipeExposureGroupSuspenseOptions(params));

export default useRecipeExposureGroup;
