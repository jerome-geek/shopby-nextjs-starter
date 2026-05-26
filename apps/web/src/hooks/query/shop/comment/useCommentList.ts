import { useQuery } from '@tanstack/react-query';

import {
    commentListOptions,
    type UseCommentListParams,
} from '@/entities/shop/comment/queries';
import type { GetCommentsResponse } from '@/models/shop/comment';

const useCommentList = <T = GetCommentsResponse>(
    params: UseCommentListParams<T>,
) => useQuery(commentListOptions(params));

export default useCommentList;
