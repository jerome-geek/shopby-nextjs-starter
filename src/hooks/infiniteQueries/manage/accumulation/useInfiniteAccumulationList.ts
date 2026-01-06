import {
    keepPreviousData,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import {
    GetAccumulationsParams,
    GetAccumulationsResponse,
} from '@/models/manage/accumulation';

type AccumulationListPage = {
    data: GetAccumulationsResponse;
    pageNumber: number;
};

interface UseInfiniteAccumulationListParams<
    TData = InfiniteData<AccumulationListPage>,
> {
    searchParams: GetAccumulationsParams;
    memberNo?: number;
    initialPageParam?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            AccumulationListPage,
            HTTPError<ShopByErrorResponse>,
            TData,
            ReturnType<(typeof accumulationKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteAccumulationList = ({
    memberNo,
    searchParams,
    initialPageParam,
    options,
}: UseInfiniteAccumulationListParams) => {
    return useInfiniteQuery({
        queryKey: accumulationKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const data = await accumulation
                .getAccumulations({
                    ...searchParams,
                    pageNumber: pageParam,
                })
                .json();

            return {
                data,
                pageNumber: pageParam,
            };
        },
        initialPageParam: initialPageParam ?? searchParams.pageNumber ?? 1,
        // getNextPageParam: (lastPage) => {
        //     const {
        //         data: { pageCount },
        //         pageNumber,
        //     } = lastPage;

        //     if (pageNumber < pageCount) {
        //         return pageNumber + 1;
        //     }

        //     return undefined;
        // },
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
    });
};

export default useInfiniteAccumulationList;
