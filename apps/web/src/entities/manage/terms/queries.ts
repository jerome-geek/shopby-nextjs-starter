import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import type {
    GetTermDetailByPostResponse,
    GetTermHistoryParams,
    GetTermListByPostData,
    GetTermListParams,
    GetTermListResponse,
    GetTermsHistoryResponse,
} from '@/models/manage/terms';

export interface UseTermListParams<T = GetTermListResponse> {
    searchParams: GetTermListParams;
    options?: Omit<
        UseQueryOptions<
            GetTermListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const termListOptions = <T = GetTermListResponse>({
    searchParams,
    options,
}: UseTermListParams<T>) =>
    queryOptions({
        queryKey: termsKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await terms.getTermList(searchParams);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });

export interface UseTermDetailParams<T = GetTermDetailByPostResponse> {
    termsNo: number;
    options?: Omit<
        UseQueryOptions<
            GetTermDetailByPostResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const termDetailOptions = <T = GetTermDetailByPostResponse>({
    termsNo,
    options,
}: UseTermDetailParams<T>) =>
    queryOptions({
        queryKey: termsKeys.detail(termsNo),
        queryFn: async () => {
            const { data } = await terms.getTermDetail(termsNo);

            return data;
        },
        ...options,
    });

export interface UseTermHistoryParams<T = GetTermsHistoryResponse> {
    searchParams: GetTermHistoryParams;
    options?: Omit<
        UseQueryOptions<
            GetTermsHistoryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['history']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const termHistoryOptions = <T = GetTermsHistoryResponse>({
    searchParams,
    options,
}: UseTermHistoryParams<T>) =>
    queryOptions({
        queryKey: termsKeys.history(searchParams),
        queryFn: async () => {
            const { data } = await terms.getTermHistory(searchParams);

            return data;
        },
        ...options,
    });

export interface UseTermListV2Params<T = GetTermListResponse> {
    data: GetTermListByPostData;
    axiosOptions?: AxiosRequestConfig;
    options?: Omit<
        UseQueryOptions<
            GetTermListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['listV2']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const termListV2Options = <T = GetTermListResponse>({
    data,
    axiosOptions,
    options,
}: UseTermListV2Params<T>) =>
    queryOptions({
        queryKey: termsKeys.listV2(data),
        queryFn: async () => {
            const response = await terms.getTermListByPost(data, axiosOptions);

            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
