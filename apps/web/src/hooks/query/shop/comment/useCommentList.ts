import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { comment } from '@/api/shop';
import { commentKeys } from '@/hooks/queryKeys';
import type { GetCommentsParams, GetCommentsResponse } from '@/models/shop/comment';

interface UseCommentListParams<T = GetCommentsResponse> {
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

const useCommentList = ({ params, options }: UseCommentListParams) => {
    return useQuery({
        queryKey: commentKeys.list(params),
        queryFn: async () => {
            const { data } = await comment.getList(params);

            return data;
        },
        ...options,
    });
};

export default useCommentList;
