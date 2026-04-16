import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import { GetRecipeResponse } from '@/model/recipe';

interface UseRecipeDetailParams<T = GetRecipeResponse> {
    sno: number;
    options?: Omit<
        UseQueryOptions<
            GetRecipeResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecipeDetail = <T = GetRecipeResponse>({
    sno,
    options,
}: UseRecipeDetailParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.detail(sno),
        queryFn: async () => {
            const { data } = await recipe.getRecipe(sno);

            return data;
        },
        ...options,
    });
};

export default useRecipeDetail;
