import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { SearchPublicCollectionParams } from '@/models/shop/collection';
import type { SearchCollectionsResponse } from '@/models/shop/recipe';

interface UsePublicCollectionSearchParams<T = SearchCollectionsResponse> {
    params: SearchPublicCollectionParams;
    options?: Omit<
        UseQueryOptions<
            SearchCollectionsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['publicSearch']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePublicCollectionSearch = <T = SearchCollectionsResponse>({
    params,
    options,
}: UsePublicCollectionSearchParams<T>) => {
    return useQuery({
        queryKey: collectionKeys.publicSearch(params),
        queryFn: async () => {
            const { data } = await collection.searchPublic(params);

            return data;
        },
        ...options,
    });
};

export default usePublicCollectionSearch;
