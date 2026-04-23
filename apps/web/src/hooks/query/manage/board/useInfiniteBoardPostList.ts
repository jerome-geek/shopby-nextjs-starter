import {
    InfiniteData,
    keepPreviousData,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import {
    GetPostListData,
    GetPostListParams,
    GetPostListResponse,
} from '@/models/manage/board';

interface UseInfiniteBoardPostListParams {
    searchParams?: GetPostListParams;
    data?: GetPostListData;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetPostListResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetPostListResponse>,
            ReturnType<(typeof boardKeys)['infinitePostList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

const useInfiniteBoardPostList = ({
    searchParams,
    data,
    options,
}: UseInfiniteBoardPostListParams) => {
    return useInfiniteQuery({
        queryKey: boardKeys.infinitePostList(searchParams, data),
        queryFn: async ({ pageParam }) => {
            const { data: responseData } = await board.getPostList(
                {
                    ...(searchParams ?? {}),
                    page: pageParam,
                    pageSize: searchParams?.pageSize ?? 10,
                },
                data,
            );

            return responseData;
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + page.items.length,
                0,
            );
            if (loaded >= lastPage.totalCount) {
                return undefined;
            }
            return allPages.length + 1;
        },
        ...options,
    });
};

export default useInfiniteBoardPostList;
