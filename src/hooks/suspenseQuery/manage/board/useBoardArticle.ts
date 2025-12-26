import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { GetArticleParams, GetArticleResponse } from '@/models/manage/board';

interface UseBoardArticleParams<T = GetArticleResponse> {
    boardNo: string;
    articleNo: number;
    memberNo?: number;
    searchParams?: GetArticleParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetArticleResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardArticle = <T = GetArticleResponse>({
    boardNo,
    articleNo,
    memberNo,
    searchParams,
    options,
}: UseBoardArticleParams<T>) => {
    return useSuspenseQuery({
        queryKey: boardKeys.detail(boardNo, articleNo, memberNo, searchParams),
        queryFn: async () => {
            const data = await board
                .getArticle(boardNo, articleNo, searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useBoardArticle;
