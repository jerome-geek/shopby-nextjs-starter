import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { GetSharedRecipeCollectionResponse } from '@/models/shop/collection';

interface UseSharedCollectionParams<T = GetSharedRecipeCollectionResponse> {
    shareCode: string;
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
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
