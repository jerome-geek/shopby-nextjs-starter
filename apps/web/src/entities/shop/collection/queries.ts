import {
    queryOptions,
    infiniteQueryOptions,
    keepPreviousData,
    type UseQueryOptions,
    type UseSuspenseQueryOptions,
    type UseInfiniteQueryOptions,
    type InfiniteData,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type {
    CollectionExposureGroupResponse,
    GetCollectionListResponse,
    SearchCollectionsResponse,
    SearchPublicCollectionParams,
    GetSharedRecipeCollectionResponse,
} from '@/models/shop/collection';

export interface CollectionExposureGroupParams<
    T = CollectionExposureGroupResponse,
> {
    groupId: string;
    options?: Omit<
        UseQueryOptions<
            CollectionExposureGroupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['exposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const collectionExposureGroupOptions = <
    T = CollectionExposureGroupResponse,
>({
    groupId,
    options,
}: CollectionExposureGroupParams<T>) =>
    queryOptions({
        queryKey: collectionKeys.exposureGroup(groupId),
        queryFn: async () => {
            const { data } =
                await collection.getCollectionExposureGroup(groupId);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });

export interface UseCollectionListParams<T = GetCollectionListResponse> {
    options?: Omit<
        UseQueryOptions<
            GetCollectionListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const collectionListOptions = <T = GetCollectionListResponse>({
    options,
}: UseCollectionListParams<T> = {}) =>
    queryOptions({
        queryKey: collectionKeys.list(),
        queryFn: async () => {
            const { data } = await collection.getList();

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });

export interface UseCollectionListSuspenseParams<
    T = GetCollectionListResponse,
> {
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

export const collectionListSuspenseOptions = <T = GetCollectionListResponse>({
    options,
}: UseCollectionListSuspenseParams<T> = {}) =>
    queryOptions({
        queryKey: collectionKeys.list(),
        queryFn: async () => {
            const { data } = await collection.getList();

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });

export interface UsePublicCollectionSearchParams<
    T = SearchCollectionsResponse,
> {
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

export const publicCollectionSearchOptions = <T = SearchCollectionsResponse>({
    searchParams,
    options,
}: UsePublicCollectionSearchParams<T>) =>
    queryOptions({
        queryKey: collectionKeys.publicSearch(searchParams),
        queryFn: async () => {
            const { data } = await collection.searchPublic(searchParams);

            return data;
        },
        ...options,
    });

export type CollectionPublicSearchParams = Omit<
    SearchPublicCollectionParams,
    'page' | 'take'
> & {
    take: number;
};

export interface UseInfinitePublicCollectionSearchParams {
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

export const infinitePublicCollectionSearchOptions = ({
    searchParams,
    options,
}: UseInfinitePublicCollectionSearchParams) =>
    infiniteQueryOptions({
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

export interface UseSharedCollectionParams<
    T = GetSharedRecipeCollectionResponse,
> {
    shareCode: string;
    options?: Omit<
        UseQueryOptions<
            GetSharedRecipeCollectionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const sharedCollectionOptions = <T = GetSharedRecipeCollectionResponse>({
    shareCode,
    options,
}: UseSharedCollectionParams<T>) =>
    queryOptions({
        queryKey: collectionKeys.detail(shareCode),
        queryFn: async () => {
            const { data } = await collection.getShared(shareCode);

            return data;
        },
        ...options,
    });

export interface UseSharedCollectionSuspenseParams<
    T = GetSharedRecipeCollectionResponse,
> {
    shareCode: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetSharedRecipeCollectionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const sharedCollectionSuspenseOptions = <
    T = GetSharedRecipeCollectionResponse,
>({
    shareCode,
    options,
}: UseSharedCollectionSuspenseParams<T>) =>
    queryOptions({
        queryKey: collectionKeys.detail(shareCode),
        queryFn: async () => {
            const { data } = await collection.getShared(shareCode);

            return data;
        },
        ...options,
    });
