import { useSuspenseQuery } from '@tanstack/react-query';

import {
    commentListSuspenseOptions,
    type UseCommentListSuspenseParams,
} from '@/entities/shop/comment/queries';
import type { GetCommentsResponse } from '@/models/shop/comment';

const useRecipeCommentList = <T = GetCommentsResponse>(
    params: UseCommentListSuspenseParams<T>,
) => useSuspenseQuery(commentListSuspenseOptions(params));

export default useRecipeCommentList;
