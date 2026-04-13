import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type { GetCollectionsResponse } from '@/models/shop/recipe';

interface UseScrapCollectionsParams<T = GetCollectionsResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: recipeKeys.collections(),
        queryFn: async () => {
            const { data } = await recipe.getCollections();

            return data;
        },
        ...options,
    });
};

export default useScrapCollections;
