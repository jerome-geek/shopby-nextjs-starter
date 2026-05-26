import { useQuery } from '@tanstack/react-query';

import {
    boardPostOptions,
    type UseBoardPostParams,
} from '@/entities/manage/board/queries';
import type { GetArticleV2Response } from '@/models/manage/board';

const useBoardPost = <T = GetArticleV2Response>(params: UseBoardPostParams<T>) =>
    useQuery(boardPostOptions(params));

export default useBoardPost;
