import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';

interface UseSharedCollectionParams<T = BookmarkedRecipeCollection> {
    shareCode: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            BookmarkedRecipeCollection,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['sharedCollection']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSharedCollection = <T = BookmarkedRecipeCollection>({
    shareCode,
    options,
}: UseSharedCollectionParams<T>) => {
    return useSuspenseQuery({
        queryKey: recipeKeys.sharedCollection(shareCode),
        queryFn: async () => {
            const { data } = await recipe.getSharedCollection(shareCode);
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useSharedCollection;
