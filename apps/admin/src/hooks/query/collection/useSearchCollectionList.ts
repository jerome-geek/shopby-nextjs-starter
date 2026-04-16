import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/collection';
import { collectionKeys } from '@/hooks/queryKeys';
import {
    SearchCollectionsParams,
    SearchCollectionsResponse,
} from '@/model/collection';

interface UseSearchCollectionListParams<T = SearchCollectionsResponse> {
    params: SearchCollectionsParams;
    options?: Omit<
        UseQueryOptions<
            SearchCollectionsResponse,
            AxiosError,
            T,
            ReturnType<(typeof collectionKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useSearchCollectionList = <T = SearchCollectionsResponse>({
    params,
    options,
}: UseSearchCollectionListParams<T>) => {
    return useQuery({
        queryKey: collectionKeys.list(params),
        queryFn: async () => {
            const { data } = await collection.searchCollections(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useSearchCollectionList;
