import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteBoardPostListOptions,
    type UseInfiniteBoardPostListParams,
} from '@/entities/manage/board/queries';

const useInfiniteBoardPostList = (params: UseInfiniteBoardPostListParams) =>
    useInfiniteQuery(infiniteBoardPostListOptions(params));

export default useInfiniteBoardPostList;
