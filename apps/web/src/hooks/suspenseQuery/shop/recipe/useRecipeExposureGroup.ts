import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type {
    GetRecipeExposureGroupParams,
    RecipeExposureGroupResponse,
} from '@/models/shop/recipe';

interface UseRecipeExposureGroupParams<T = RecipeExposureGroupResponse> {
    groupId: string;
    params?: GetRecipeExposureGroupParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            RecipeExposureGroupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['exposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecipeExposureGroup = <T = RecipeExposureGroupResponse>({
    groupId,
    params,
    options,
}: UseRecipeExposureGroupParams<T>) => {
    return useSuspenseQuery({
        queryKey: recipeKeys.exposureGroup(groupId, params),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroup(
                groupId,
                params,
            );

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useRecipeExposureGroup;
