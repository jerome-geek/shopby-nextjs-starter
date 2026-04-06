import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import {
    GetPostListData,
    GetPostListParams,
    GetPostListResponse,
} from '@/models/manage/board';

interface UseBoardPostListParams<T = GetPostListResponse> {
    searchParams?: GetPostListParams;
    data?: GetPostListData;
    options?: Omit<
        UseQueryOptions<
            GetPostListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['postList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardPostList = <T = GetPostListResponse>({
    searchParams,
    data,
    options,
}: UseBoardPostListParams<T>) => {
    return useQuery({
        queryKey: boardKeys.postList(searchParams, data),
        queryFn: async () => {
            const { data: responseData } = await board.getPostList(
                searchParams,
                data,
            );

            return responseData;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useBoardPostList;
