import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import {
    GetRepliesByBoardNoParams,
    GetRepliesByBoardNoResponse,
} from '@/models/manage/board';

interface UseBoardReplyListParams<T = GetRepliesByBoardNoResponse> {
    boardNo: string;
    articleNo: number;
    params?: GetRepliesByBoardNoParams;
    options?: Omit<
        UseQueryOptions<
            GetRepliesByBoardNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['reply']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardReplyList = <T = GetRepliesByBoardNoResponse>({
    boardNo,
    articleNo,
    params,
    options,
}: UseBoardReplyListParams<T>) => {
    return useQuery({
        queryKey: boardKeys.reply(boardNo, articleNo, params),
        queryFn: async () => {
            const { data } = await board.getRepliesByBoardNo(
                boardNo,
                articleNo,
                params,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useBoardReplyList;
