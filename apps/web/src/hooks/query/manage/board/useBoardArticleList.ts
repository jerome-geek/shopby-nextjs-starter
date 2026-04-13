import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import {
    GetArticleListParams,
    GetArticleListResponse,
} from '@/models/manage/board';

interface UseBoardArticleListParams<T = GetArticleListResponse> {
    boardNo: string;
    searchParams?: GetArticleListParams;
    options?: Omit<
        UseQueryOptions<
            GetArticleListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardArticleList = <T = GetArticleListResponse>({
    boardNo,
    searchParams,
    options,
}: UseBoardArticleListParams<T>) => {
    return useQuery({
        queryKey: boardKeys.list(boardNo, searchParams),
        queryFn: async () => {
            const { data } = await board.getArticleList(boardNo, searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        enabled: boardNo !== '',
        ...options,
    });
};

export default useBoardArticleList;
