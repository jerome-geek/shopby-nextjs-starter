import { useQuery } from '@tanstack/react-query';

import {
    boardArticleListOptions,
    type UseBoardArticleListParams,
} from '@/entities/manage/board/queries';
import type { GetArticleListResponse } from '@/models/manage/board';

const useBoardArticleList = <T = GetArticleListResponse>(
    params: UseBoardArticleListParams<T>,
) => useQuery(boardArticleListOptions(params));

export default useBoardArticleList;
