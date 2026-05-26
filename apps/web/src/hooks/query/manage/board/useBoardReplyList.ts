import { useQuery } from '@tanstack/react-query';

import {
    boardReplyListOptions,
    type UseBoardReplyListParams,
} from '@/entities/manage/board/queries';
import type { GetRepliesByBoardNoResponse } from '@/models/manage/board';

const useBoardReplyList = <T = GetRepliesByBoardNoResponse>(
    params: UseBoardReplyListParams<T>,
) => useQuery(boardReplyListOptions(params));

export default useBoardReplyList;
