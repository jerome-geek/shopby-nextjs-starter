import { isNil } from '@fxts/core';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { GetArticleParams, GetArticleResponse } from '@/models/manage/board';

interface UseBoardArticleParams<T = GetArticleResponse> {
    boardNo: string;
    articleNo: number;
    searchParams?: GetArticleParams;
    options?: Omit<
        UseQueryOptions<
            GetArticleResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardArticle = <T = GetArticleResponse>({
    boardNo,
    articleNo,
    searchParams,
    options,
}: UseBoardArticleParams<T>) => {
    return useQuery({
        queryKey: boardKeys.detail(boardNo, articleNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getArticle(
                boardNo,
                articleNo,
                searchParams,
            );

            return data;
        },
        enabled: !isNil(boardNo) && !isNil(articleNo),
        ...options,
    });
};

export default useBoardArticle;
