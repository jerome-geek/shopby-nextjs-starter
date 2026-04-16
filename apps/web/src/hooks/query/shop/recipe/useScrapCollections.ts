import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type { GetCollectionsResponse } from '@/models/shop/recipe';

interface UseScrapCollectionsParams<T = GetCollectionsResponse> {
    options?: Omit<
        UseQueryOptions<
            GetCollectionsResponse,
            AxiosError,
            T,
            ReturnType<(typeof recipeKeys)['collections']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useScrapCollections = <T = GetCollectionsResponse>({
    options,
}: UseScrapCollectionsParams<T> = {}) => {
    return useQuery({
        queryKey: recipeKeys.collections(),
        queryFn: async () => {
            const { data } = await recipe.getCollections();

            return data;
        },
        ...options,
    });
};

export default useScrapCollections;
