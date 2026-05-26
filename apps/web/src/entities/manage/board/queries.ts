import { isNil } from '@fxts/core';
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

import { board, inquiry } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import type {
    GetArticleListParams,
    GetArticleListResponse,
    GetArticleParams,
    GetArticleResponse,
    GetArticleV2Params,
    GetArticleV2Response,
    GetBoardConfigResponse,
    GetCategoriesResponse,
    GetPostListData,
    GetPostListParams,
    GetPostListResponse,
    GetRepliesByBoardNoParams,
    GetRepliesByBoardNoResponse,
} from '@/models/manage/board';
import type {
    GetInquiriesParams,
    GetInquiriesResponse,
} from '@/models/manage/inquiry';

export interface UseBoardConfigParams<T = GetBoardConfigResponse> {
    options?: Omit<
        UseQueryOptions<
            GetBoardConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardConfigOptions = <T = GetBoardConfigResponse>({
    options,
}: UseBoardConfigParams<T> = {}) =>
    queryOptions({
        queryKey: boardKeys.config(),
        queryFn: async () => {
            const { data } = await board.getConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });

export interface UseBoardConfigSuspenseParams<T = GetBoardConfigResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetBoardConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardConfigSuspenseOptions = <T = GetBoardConfigResponse>({
    options,
}: UseBoardConfigSuspenseParams<T> = {}) =>
    queryOptions({
        queryKey: boardKeys.config(),
        queryFn: async () => {
            const { data } = await board.getConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });

export interface UseBoardArticleParams<T = GetArticleResponse> {
    boardNo: string;
    articleNo: number;
    searchParams?: GetArticleParams;
    options?: Omit<
        UseQueryOptions<
            GetArticleResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardArticleOptions = <T = GetArticleResponse>({
    boardNo,
    articleNo,
    searchParams,
    options,
}: UseBoardArticleParams<T>) =>
    queryOptions({
        queryKey: boardKeys.detail(boardNo, articleNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getArticle(
                boardNo,
                articleNo,
                searchParams,
            );

            return data;
        },
        enabled: !isNil(boardNo) && !isNil(articleNo),
        ...options,
    });

export interface UseBoardArticleListParams<T = GetArticleListResponse> {
    boardNo: string;
    searchParams?: GetArticleListParams;
    options?: Omit<
        UseQueryOptions<
            GetArticleListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardArticleListOptions = <T = GetArticleListResponse>({
    boardNo,
    searchParams,
    options,
}: UseBoardArticleListParams<T>) =>
    queryOptions({
        queryKey: boardKeys.list(boardNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getArticleList(boardNo, searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        enabled: boardNo !== '',
        ...options,
    });

export interface UseBoardCategoryListParams<T = GetCategoriesResponse> {
    boardNo: string;
    options?: Omit<
        UseQueryOptions<
            GetCategoriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['category']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardCategoryListOptions = <T = GetCategoriesResponse>({
    boardNo,
    options,
}: UseBoardCategoryListParams<T>) =>
    queryOptions({
        queryKey: boardKeys.category(boardNo),
        queryFn: async () => {
            const { data } = await board.getCategories(boardNo);

            return data;
        },
        staleTime: 1000 * 60 * 100,
        gcTime: 1000 * 60 * 100,
        ...options,
    });

export interface UseBoardPostParams<T = GetArticleV2Response> {
    boardNo: string;
    postNo: number;
    searchParams?: GetArticleV2Params;
    options?: Omit<
        UseQueryOptions<
            GetArticleV2Response,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['postDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardPostOptions = <T = GetArticleV2Response>({
    boardNo,
    postNo,
    searchParams,
    options,
}: UseBoardPostParams<T>) =>
    queryOptions({
        queryKey: boardKeys.postDetail(boardNo, postNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getArticleV2(
                boardNo,
                postNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });

export interface UseBoardPostListParams<T = GetPostListResponse> {
    searchParams?: GetPostListParams;
    data?: GetPostListData;
    options?: Omit<
        UseQueryOptions<
            GetPostListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['postList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardPostListOptions = <T = GetPostListResponse>({
    searchParams,
    data,
    options,
}: UseBoardPostListParams<T>) =>
    queryOptions({
        queryKey: boardKeys.postList(searchParams, data),
        queryFn: async () => {
            const { data: responseData } = await board.getPostList(
                searchParams,
                data,
            );

            return responseData;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface UseBoardReplyListParams<T = GetRepliesByBoardNoResponse> {
    boardNo: string;
    articleNo: number;
    searchParams?: GetRepliesByBoardNoParams;
    options?: Omit<
        UseQueryOptions<
            GetRepliesByBoardNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['reply']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const boardReplyListOptions = <T = GetRepliesByBoardNoResponse>({
    boardNo,
    articleNo,
    searchParams,
    options,
}: UseBoardReplyListParams<T>) =>
    queryOptions({
        queryKey: boardKeys.reply(boardNo, articleNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getRepliesByBoardNo(
                boardNo,
                articleNo,
                searchParams,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface UseInfiniteBoardPostListParams {
    searchParams?: GetPostListParams;
    data?: GetPostListData;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetPostListResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetPostListResponse>,
            ReturnType<(typeof boardKeys)['infinitePostList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

export const infiniteBoardPostListOptions = ({
    searchParams,
    data,
    options,
}: UseInfiniteBoardPostListParams) =>
    infiniteQueryOptions({
        queryKey: boardKeys.infinitePostList(searchParams, data),
        queryFn: async ({ pageParam }) => {
            const { data: responseData } = await board.getPostList(
                {
                    ...(searchParams ?? {}),
                    page: pageParam,
                    pageSize: searchParams?.pageSize ?? 10,
                },
                data,
            );

            return responseData;
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
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

export interface UseBoardInquiriesParams<T = GetInquiriesResponse> {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseQueryOptions<
            GetInquiriesResponse,
            AxiosError,
            T,
            ['inquiry', { searchParams: GetInquiriesParams }]
        >,
        'queryKey'
    >;
}

export const boardInquiriesListOptions = <T = GetInquiriesResponse>({
    searchParams,
    options,
}: UseBoardInquiriesParams<T>) =>
    queryOptions({
        queryKey: ['inquiry', { searchParams }] as [
            'inquiry',
            { searchParams: GetInquiriesParams },
        ],
        queryFn: async () => {
            const { data } = await inquiry.getInquiries({ ...searchParams });

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
