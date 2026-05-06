import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { comment } from '@/api/comment';
import { commentKeys } from '@/hooks/queryKeys';
import {
    GetCommentBlacklistParams,
    GetCommentBlacklistResponse,
} from '@/model/comment';

interface UseCommentBlackListParams<T = GetCommentBlacklistResponse> {
    params: GetCommentBlacklistParams;
    options?: Omit<
        UseQueryOptions<
            GetCommentBlacklistResponse,
            AxiosError,
            T,
            ReturnType<(typeof commentKeys)['blackList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCommentBlackList = <T = GetCommentBlacklistResponse>({
    params,
    options,
}: UseCommentBlackListParams<T>) => {
    return useQuery({
        queryKey: commentKeys.blackList(params),
        queryFn: async () => {
            const { data } = await comment.getCommentBlacklist(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useCommentBlackList;
