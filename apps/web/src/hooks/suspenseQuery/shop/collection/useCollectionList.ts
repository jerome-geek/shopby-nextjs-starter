import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { GetCollectionListResponse } from '@/models/shop/collection';

interface UseCollectionListParams<T = GetCollectionListResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetCollectionListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionList = <T = GetCollectionListResponse>({
    options,
}: UseCollectionListParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: collectionKeys.list(),
        queryFn: async () => {
            const { data } = await collection.getList();

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useCollectionList;
