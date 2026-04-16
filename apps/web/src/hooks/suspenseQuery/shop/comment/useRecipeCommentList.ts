import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { comment } from '@/api/shop';
import { commentKeys } from '@/hooks/queryKeys';
import type { GetCommentsParams, GetCommentsResponse } from '@/models/shop/comment';

interface UseRecipeCommentListParams<T = GetCommentsResponse> {
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

const useRecipeCommentList = ({
    params,
    options,
}: UseRecipeCommentListParams) => {
    return useSuspenseQuery({
        queryKey: commentKeys.list(params),
        queryFn: async () => {
            const { data } = await comment.getList(params);

            return data;
        },
        ...options,
    });
};

export default useRecipeCommentList;
