import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { CollectionListResponse } from '@/models/shop/collection';

interface UseCollectionListParams<T = CollectionListResponse> {
    options?: Omit<
        UseQueryOptions<
            CollectionListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            // ReturnType<(typeof collectionKeys)['list']>
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionList = <T = CollectionListResponse>({
    options,
}: UseCollectionListParams<T> = {}) => {
    return useQuery({
        queryKey: ['collection-list'],
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
