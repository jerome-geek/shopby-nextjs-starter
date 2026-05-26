import {
    queryOptions,
    type UseQueryOptions,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { comment } from '@/api/shop';
import { commentKeys } from '@/hooks/queryKeys';
import type { GetCommentsParams, GetCommentsResponse } from '@/models/shop/comment';

export interface UseCommentListParams<T = GetCommentsResponse> {
    params: GetCommentsParams;
    options?: Omit<
        UseQueryOptions<
            GetCommentsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof commentKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const commentListOptions = <T = GetCommentsResponse>({
    params,
    options,
}: UseCommentListParams<T>) =>
    queryOptions({
        queryKey: commentKeys.list(params),
        queryFn: async () => {
            const { data } = await comment.getList(params);

            return data;
        },
        ...options,
    });

export interface UseCommentListSuspenseParams<T = GetCommentsResponse> {
    params: GetCommentsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetCommentsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof commentKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const commentListSuspenseOptions = <T = GetCommentsResponse>({
    params,
    options,
}: UseCommentListSuspenseParams<T>) =>
    queryOptions({
        queryKey: commentKeys.list(params),
        queryFn: async () => {
            const { data } = await comment.getList(params);

            return data;
        },
        ...options,
    });
