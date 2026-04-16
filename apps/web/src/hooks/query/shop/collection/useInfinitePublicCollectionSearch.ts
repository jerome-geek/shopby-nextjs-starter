import {
    type InfiniteData,
    keepPreviousData,
    useInfiniteQuery,
    type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type {
    SearchCollectionsResponse,
    SearchPublicCollectionParams,
} from '@/models/shop/collection';

type CollectionPublicSearchParams = Omit<
    SearchPublicCollectionParams,
    'page' | 'take'
> & {
    take: number;
};

interface UseInfinitePublicCollectionSearchParams {
    searchParams: CollectionPublicSearchParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            SearchCollectionsResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<SearchCollectionsResponse>,
            ReturnType<(typeof collectionKeys)['publicSearchInfinite']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfinitePublicCollectionSearch = ({
    searchParams,
    options,
}: UseInfinitePublicCollectionSearchParams) => {
    return useInfiniteQuery({
        queryKey: collectionKeys.publicSearchInfinite(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await collection.searchPublic({
                ...searchParams,
                page: pageParam,
            });

            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfinitePublicCollectionSearch;
