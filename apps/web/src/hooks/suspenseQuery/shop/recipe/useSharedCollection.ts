import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';

interface UseSharedCollectionParams<T = BookmarkedRecipeCollection> {
    shareCode: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            BookmarkedRecipeCollection,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSharedCollection = <T = BookmarkedRecipeCollection>({
    shareCode,
    options,
}: UseSharedCollectionParams<T>) => {
    return useSuspenseQuery({
        queryKey: collectionKeys.detail(shareCode),
        queryFn: async () => {
            const { data } = await collection.getShared(shareCode);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useSharedCollection;
