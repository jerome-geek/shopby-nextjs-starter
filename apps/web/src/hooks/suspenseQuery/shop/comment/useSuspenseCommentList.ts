import { useSuspenseQuery, type UseSuspenseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { comment } from '@/api/shop';
import { commentKeys } from '@/hooks/queryKeys';
import { GetCommentsParams, GetCommentsResponse } from '@/models/shop/comment';

interface UseSuspenseCommentListParams<T = GetCommentsResponse> {
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

const useSuspenseCommentList = ({
    params,
    options,
}: UseSuspenseCommentListParams) => {
    return useSuspenseQuery({
        queryKey: commentKeys.list(params),
        queryFn: async () => {
            const { data } = await comment.getList(params);

            return data;
        },
        ...options,
    });
};

export default useSuspenseCommentList;
