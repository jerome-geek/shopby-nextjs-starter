import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import {
    GetRecipeExposureGroupsParams,
    RecipeExposureGroupResponse,
} from '@/model/recipe';

interface UseGetRecipeExposureGroupsParams<T = RecipeExposureGroupResponse> {
    params?: GetRecipeExposureGroupsParams;
    options?: Omit<
        UseQueryOptions<
            RecipeExposureGroupResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['getRecipeExposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGetRecipeExposureGroups = <T = RecipeExposureGroupResponse>({
    params,
    options,
}: UseGetRecipeExposureGroupsParams<T> = {}) => {
    return useQuery({
        queryKey: recipeKeys.getRecipeExposureGroup(params),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroups(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useGetRecipeExposureGroups;
