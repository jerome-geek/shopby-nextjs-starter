import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

interface UseRecipeDetailParams<T = GetRecipeDetailResponse> {
    sno: number;
    memberNo: number;
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

const useRecipeDetail = <T = GetRecipeDetailResponse>({
    sno,
    memberNo,
    options,
}: UseRecipeDetailParams<T>) => {
    return useQuery({
        queryKey: recipeKeys.detail(sno, memberNo),
        queryFn: async () => {
            const { data } = await recipe.getRecipeDetail(sno);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useRecipeDetail;
