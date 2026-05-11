import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { GetSharedRecipeCollectionResponse } from '@/models/shop/collection';

interface UseSharedCollectionParams<T = GetSharedRecipeCollectionResponse> {
    shareCode: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetSharedRecipeCollectionResponse,
            AxiosError,
            T,
            ReturnType<(typeof collectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSharedCollection = <T = GetSharedRecipeCollectionResponse>({
    shareCode,
    options,
}: UseSharedCollectionParams<T>) => {
    return useSuspenseQuery({
        queryKey: collectionKeys.detail(shareCode),
        queryFn: async () => {
            const { data } = await collection.getShared(shareCode);
            return data;
        },

        ...options,
    });
};

export default useSharedCollection;
