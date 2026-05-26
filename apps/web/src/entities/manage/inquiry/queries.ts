import {
    infiniteQueryOptions,
    keepPreviousData,
    queryOptions,
    type InfiniteData,
    type UseInfiniteQueryOptions,
    type UseQueryOptions,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import type {
    GetInquiriesItem,
    GetInquiriesParams,
    GetInquiriesResponse,
    GetInquiryConfigResponse,
    GetInquiryResponse,
    GetInquiryTypesParams,
    GetInquiryTypesResponse,
} from '@/models/manage/inquiry';

export interface UseInquiryParams<T = GetInquiryResponse> {
    inquiryNo: number;
    options?: Omit<
        UseQueryOptions<
            GetInquiryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const inquiryDetailOptions = <T = GetInquiryResponse>({
    inquiryNo,
    options,
}: UseInquiryParams<T>) =>
    queryOptions({
        queryKey: inquiryKeys.detail(inquiryNo),
        queryFn: async () => {
            const { data } = await inquiry.getInquiry(inquiryNo);

            return data;
        },
        enabled: !!inquiryNo,
        ...options,
    });

export interface UseInquiryConfigParams<T = GetInquiryConfigResponse> {
    options?: Omit<
        UseQueryOptions<
            GetInquiryConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const inquiryConfigOptions = <T = GetInquiryConfigResponse>({
    options,
}: UseInquiryConfigParams<T> = {}) =>
    queryOptions({
        queryKey: inquiryKeys.config(),
        queryFn: async () => {
            const { data } = await inquiry.getInquiryConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });

export interface UseInquiryListParams<T = GetInquiriesResponse> {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseQueryOptions<
            GetInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const inquiryListOptions = <T = GetInquiriesResponse>({
    searchParams,
    options,
}: UseInquiryListParams<T>) =>
    queryOptions({
        queryKey: inquiryKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await inquiry.getInquiries(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface UseInquiryTypeListParams<T = GetInquiryTypesResponse> {
    searchParams?: GetInquiryTypesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetInquiryTypesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['types']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const inquiryTypeListSuspenseOptions = <T = GetInquiryTypesResponse>({
    searchParams,
    options,
}: UseInquiryTypeListParams<T> = {}) =>
    queryOptions({
        queryKey: inquiryKeys.types(searchParams),
        queryFn: async () => {
            const { data } = await inquiry.getInquiryTypes(searchParams);

            return data;
        },
        ...options,
    });

export type InfiniteInquiryPage = {
    items: GetInquiriesItem[];
    totalCount: number;
};

export interface UseInfiniteInquiryListParams {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteInquiryPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteInquiryPage>
        >,
        'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >;
}

export const infiniteInquiryListOptions = ({
    searchParams,
    options,
}: UseInfiniteInquiryListParams) => {
    const listKeyParams: GetInquiriesParams = {
        ...searchParams,
        pageNumber: 1,
    };

    return infiniteQueryOptions<
        InfiniteInquiryPage,
        AxiosError<ShopByErrorResponse>,
        InfiniteData<InfiniteInquiryPage>
    >({
        queryKey: inquiryKeys.infiniteList(listKeyParams),
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const { data } = await inquiry.getInquiries({
                ...searchParams,
                pageNumber: Number(pageParam) || 1,
            });

            return {
                items: data.items,
                totalCount: data.totalCount,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + page.items.length,
                0,
            );
            if (loaded >= lastPage.totalCount) {
                return undefined;
            }
            return allPages.length + 1;
        },
        ...options,
    });
};
