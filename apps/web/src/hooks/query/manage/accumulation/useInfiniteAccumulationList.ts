import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import type {
    AccumulationInfo,
    GetAccumulationsParams,
} from '@/models/manage/accumulation';

export type InfiniteAccumulationPage = {
    items: AccumulationInfo[];
    totalCount: number;
    pageNumber: number;
};

interface UseInfiniteAccumulationListParams {
    memberNo?: number;
    searchParams: GetAccumulationsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteAccumulationPage,
            AxiosError<ShopByErrorResponse>
        >,
        'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >;
}

const useInfiniteAccumulationList = ({
    memberNo = 0,
    searchParams,
    options,
}: UseInfiniteAccumulationListParams) => {
    return useInfiniteQuery<InfiniteAccumulationPage, AxiosError<ShopByErrorResponse>>({
        queryKey: accumulationKeys.list(memberNo, searchParams),
        initialPageParam: searchParams.pageNumber ?? 1,
        queryFn: async ({ pageParam }) => {
            const { data } = await accumulation.getAccumulations({
                ...searchParams,
                pageNumber: Number(pageParam) || 1,
            });

            return {
                items: data.items,
                totalCount: data.totalCount,
                pageNumber: data.pageNumber,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + page.items.length,
                0,
            );
            if (loaded >= lastPage.totalCount) {
                return undefined;
            }
            return lastPage.pageNumber + 1;
        },
        ...options,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useInfiniteAccumulationList;

