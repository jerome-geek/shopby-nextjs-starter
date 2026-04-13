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

interface UseRecipeExposureGroupListParams<T = RecipeExposureGroupResponse> {
    params: GetRecipeExposureGroupsParams;
    options?: Omit<
        UseQueryOptions<
            RecipeExposureGroupResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['groupList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecipeExposureGroupList = <T = RecipeExposureGroupResponse>({
    params,
    options,
}: UseRecipeExposureGroupListParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.groupList(params),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroups(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useRecipeExposureGroupList;
