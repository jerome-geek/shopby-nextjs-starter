import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type {
    GetRecipeExposureGroupParams,
    RecipeExposureGroupResponse,
} from '@/models/shop/recipe';

interface UseRecipeExposureGroupParams<T = RecipeExposureGroupResponse> {
    groupId: string;
    searchParams?: GetRecipeExposureGroupParams;
    options?: Omit<
        UseQueryOptions<
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
    searchParams,
    options,
}: UseRecipeExposureGroupParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.exposureGroup(groupId, searchParams),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroup(
                groupId,
                searchParams,
            );
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useRecipeExposureGroup;
