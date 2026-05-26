import { useQuery } from '@tanstack/react-query';

import {
    recipeExposureGroupOptions,
    type UseRecipeExposureGroupParams,
} from '@/entities/recipe/queries';
import type { RecipeExposureGroupResponse } from '@/models/shop/recipe';

const useRecipeExposureGroup = <T = RecipeExposureGroupResponse>(
    params: UseRecipeExposureGroupParams<T>,
) => useQuery(recipeExposureGroupOptions(params));

export default useRecipeExposureGroup;
