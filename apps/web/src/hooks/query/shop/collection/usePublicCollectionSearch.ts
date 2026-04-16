import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type {
    SearchCollectionsResponse,
    SearchPublicCollectionParams,
} from '@/models/shop/collection';

interface UsePublicCollectionSearchParams<T = SearchCollectionsResponse> {
    searchParams: SearchPublicCollectionParams;
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
    searchParams,
    options,
}: UsePublicCollectionSearchParams<T>) => {
    return useQuery({
        queryKey: collectionKeys.publicSearch(searchParams),
        queryFn: async () => {
            const { data } = await collection.searchPublic(searchParams);

            return data;
        },
        ...options,
    });
};

export default usePublicCollectionSearch;
