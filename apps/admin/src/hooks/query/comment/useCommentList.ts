import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { comment } from '@/api/comment';
import { commentKeys } from '@/hooks/queryKeys';
import { GetCommentsParams, GetCommentsResponse } from '@/model/comment';

interface UseCommentListParams<T = GetCommentsResponse> {
    params: GetCommentsParams;
    options?: Omit<
        UseQueryOptions<
            GetCommentsResponse,
            AxiosError,
            T,
            ReturnType<(typeof commentKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCommentList = <T = GetCommentsResponse>({
    params,
    options,
}: UseCommentListParams<T>) => {
    return useQuery({
        queryKey: commentKeys.list(params),
        queryFn: async () => {
            const { data } = await comment.getCommentList(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useCommentList;
