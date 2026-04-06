import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import {
    GetArticleV2Params,
    GetArticleV2Response,
} from '@/models/manage/board';

interface UseBoardPostParams<T = GetArticleV2Response> {
    boardNo: string;
    postNo: number;
    searchParams?: GetArticleV2Params;
    options?: Omit<
        UseQueryOptions<
            GetArticleV2Response,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['postDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardPost = <T = GetArticleV2Response>({
    boardNo,
    postNo,
    searchParams,
    options,
}: UseBoardPostParams<T>) => {
    return useQuery({
        queryKey: boardKeys.postDetail(boardNo, postNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getArticleV2(
                boardNo,
                postNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useBoardPost;
