import { useQuery } from '@tanstack/react-query';

import {
    boardPostListOptions,
    type UseBoardPostListParams,
} from '@/entities/manage/board/queries';
import type { GetPostListResponse } from '@/models/manage/board';

const useBoardPostList = <T = GetPostListResponse>(
    params: UseBoardPostListParams<T>,
) => useQuery(boardPostListOptions(params));

export default useBoardPostList;
