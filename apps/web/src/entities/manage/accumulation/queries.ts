import {
    infiniteQueryOptions,
    keepPreviousData,
    queryOptions,
    type InfiniteData,
    type UseInfiniteQueryOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import { accumulationKeys } from '@/hooks/queryKeys';
import type {
    GetAccumulationsParams,
    GetAccumulationsResponse,
    GetAccumulationSummaryParams,
    GetAccumulationSummaryResponse,
    GetExpirationAccumulationListParams,
    GetExpirationAccumulationListResponse,
    GetExpectAccumulationResponse,
} from '@/models/manage/accumulation';

export interface UseAccumulationListParams<T = GetAccumulationsResponse> {
    searchParams?: GetAccumulationsParams;
    options?: Omit<
        UseQueryOptions<
            GetAccumulationsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const accumulationListOptions = <T = GetAccumulationsResponse>({
    searchParams,
    options,
}: UseAccumulationListParams<T>) =>
    queryOptions({
        queryKey: accumulationKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await accumulation.getAccumulations(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: options?.enabled ?? true,
    });

export interface UseAccumulationSummaryParams<
    T = GetAccumulationSummaryResponse,
> {
    searchParams?: GetAccumulationSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetAccumulationSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['summaryDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const accumulationSummaryOptions = <
    T = GetAccumulationSummaryResponse,
>({
    searchParams,
    options,
}: UseAccumulationSummaryParams<T> = {}) =>
    queryOptions({
        queryKey: accumulationKeys.summaryDetail(searchParams),
        queryFn: async () => {
            const { data } =
                await accumulation.getAccumulationSummary(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface UseExpirationAccumulationListParams<
    T = GetExpirationAccumulationListResponse,
> {
    memberNo?: number;
    searchParams?: GetExpirationAccumulationListParams;
    options?: Omit<
        UseQueryOptions<
            GetExpirationAccumulationListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['expirationList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const expirationAccumulationListOptions = <
    T = GetExpirationAccumulationListResponse,
>({
    memberNo = 0,
    searchParams,
    options,
}: UseExpirationAccumulationListParams<T>) =>
    queryOptions({
        queryKey: accumulationKeys.expirationList(memberNo, searchParams),
        queryFn: async () => {
            const { data } =
                await accumulation.getExpirationAccumulations(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        enabled: memberNo !== 0,
        ...options,
    });

type AccumulationListPage = InfiniteResponse<GetAccumulationsResponse>;

export interface UseInfiniteAccumulationListParams {
    memberNo?: number;
    searchParams: GetAccumulationsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            AccumulationListPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<AccumulationListPage>,
            ReturnType<(typeof accumulationKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

export const infiniteAccumulationListOptions = ({
    memberNo = 0,
    searchParams,
    options,
}: UseInfiniteAccumulationListParams) =>
    infiniteQueryOptions({
        queryKey: accumulationKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await accumulation.getAccumulations({
                ...searchParams,
                pageNumber: Number(pageParam) || 1,
            });

            return { data, pageNumber: pageParam };
        },
        initialPageParam: searchParams.pageNumber ?? 1,
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
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });

export interface UseWaitingAccumulationParams<
    T = GetExpectAccumulationResponse,
> {
    options?: Omit<
        UseQueryOptions<
            GetExpectAccumulationResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['waitingDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const waitingAccumulationOptions = <T = GetExpectAccumulationResponse>({
    options,
}: UseWaitingAccumulationParams<T> = {}) =>
    queryOptions({
        queryKey: accumulationKeys.waitingDetail(),
        queryFn: async () => {
            const { data } = await accumulation.getExpectAccumulation();

            return data;
        },
        ...options,
    });
