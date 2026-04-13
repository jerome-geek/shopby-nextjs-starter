import {
    keepPreviousData,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import { accumulationKeys } from '@/hooks/queryKeys';
import type {
    GetAccumulationsParams,
    GetAccumulationsResponse,
} from '@/models/manage/accumulation';

type AccumulationListPage = InfiniteResponse<GetAccumulationsResponse>;

interface UseInfiniteAccumulationListParams {
    memberNo?: number;
    searchParams: GetAccumulationsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            AccumulationListPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<AccumulationListPage>,
            ReturnType<(typeof accumulationKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteAccumulationList = ({
    memberNo = 0,
    searchParams,
    options,
}: UseInfiniteAccumulationListParams) => {
    return useInfiniteQuery({
        queryKey: accumulationKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await accumulation.getAccumulations({
                ...searchParams,
                pageNumber: Number(pageParam) || 1,
            });

            return {
                data,
                pageNumber: pageParam,
            };
        },
        initialPageParam: searchParams.pageNumber ?? 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            return searchParams.pageSize * allPages.length <
                lastPage.data.totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useInfiniteAccumulationList;
