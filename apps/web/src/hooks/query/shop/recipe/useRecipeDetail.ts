import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import { GetRecipeDetailResponse } from '@/models/shop/recipe';

interface UseRecipeDetailParams<T = GetRecipeDetailResponse> {
    sno: number;
    options?: Omit<
        UseQueryOptions<
            GetRecipeDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useRecipeDetail = ({ sno, options }: UseRecipeDetailParams) => {
    return useQuery({
        queryKey: recipeKeys.detail(sno),
        queryFn: async () => {
            const { data } = await recipe.getRecipeDetail(sno);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useRecipeDetail;
