import { useQuery } from '@tanstack/react-query';

import {
    boardArticleOptions,
    type UseBoardArticleParams,
} from '@/entities/manage/board/queries';
import type { GetArticleResponse } from '@/models/manage/board';

const useBoardArticle = <T = GetArticleResponse>(
    params: UseBoardArticleParams<T>,
) => useQuery(boardArticleOptions(params));

export default useBoardArticle;
