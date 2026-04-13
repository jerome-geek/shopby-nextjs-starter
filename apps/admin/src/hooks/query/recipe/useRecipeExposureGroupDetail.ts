import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import { RecipeExposureGroupDetailResponse } from '@/model/recipe';

interface UseRecipeExposureGroupDetailParams<
    T = RecipeExposureGroupDetailResponse,
> {
    groupSno: number;
    options?: Omit<
        UseQueryOptions<
            RecipeExposureGroupDetailResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecipeExposureGroupDetail = <T = RecipeExposureGroupDetailResponse>({
    groupSno,
    options,
}: UseRecipeExposureGroupDetailParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.detail(groupSno),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroup(groupSno);

            return data;
        },
        ...options,
    });
};

export default useRecipeExposureGroupDetail;
