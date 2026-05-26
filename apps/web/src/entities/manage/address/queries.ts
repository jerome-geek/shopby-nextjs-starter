import {
    infiniteQueryOptions,
    keepPreviousData,
    queryOptions,
    type InfiniteData,
    type UseInfiniteQueryOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { address } from '@/api/manage';
import { addressKeys } from '@/hooks/queryKeys';
import type {
    SearchAddressParams,
    SearchAddressResponse,
} from '@/models/manage/address';

export interface UseAddressListParams<T = SearchAddressResponse> {
    params: SearchAddressParams;
    options?: Omit<
        UseQueryOptions<
            SearchAddressResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof addressKeys)['searchList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const addressListOptions = <T = SearchAddressResponse>({
    params,
    options,
}: UseAddressListParams<T>) =>
    queryOptions({
        queryKey: addressKeys.searchList(params),
        queryFn: async () => {
            const { data } = await address.searchAddress(params);

            return data;
        },
        enabled: !!params.keyword,
        placeholderData: keepPreviousData,
        ...options,
    });

type AddressListPage = InfiniteResponse<SearchAddressResponse>;

export interface UseInfiniteAddressListParams {
    searchParams: SearchAddressParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            AddressListPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<AddressListPage>,
            ReturnType<(typeof addressKeys)['searchInfiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam'
    >;
}

export const infiniteAddressListOptions = ({
    searchParams,
    options,
}: UseInfiniteAddressListParams) =>
    infiniteQueryOptions({
        queryKey: addressKeys.searchInfiniteList(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await address.searchAddress({
                ...searchParams,
                pageNumber: pageParam,
            });

            return { data, pageNumber: pageParam };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            return searchParams.pageSize * allPages.length <
                lastPage.data.totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: (options?.enabled ?? true) && !!searchParams.keyword,
    });
