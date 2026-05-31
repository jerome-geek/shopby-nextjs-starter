import {
    InfiniteData,
    keepPreviousData,
    useInfiniteQuery,
    type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/entities/display/api';
import { eventKeys } from '@/hooks/queryKeys';
import type {
    GetEventsResponse,
    GetEventsV2Params,
} from '@/entities/display/model/event';

interface UseInfiniteEventListParams {
    searchParams: GetEventsV2Params;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetEventsResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetEventsResponse>
        >,
        'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >;
}

const useInfiniteEventList = ({
    searchParams,
    options,
}: UseInfiniteEventListParams) => {
    return useInfiniteQuery({
        queryKey: eventKeys.infiniteList(searchParams),
        initialPageParam: searchParams.page.number ?? 1,
        queryFn: async ({ pageParam }) => {
            const { data } = await event.getEventsV2({
                ...searchParams,
                page: {
                    ...searchParams.page,
                    number: Number(pageParam) || 1,
                },
            });

            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const currentSize = allPages.reduce(
                (acc, page) => acc + page.contents.length,
                0,
            );
            if (currentSize >= lastPage.totalCount) {
                return undefined;
            }
            return allPages.length + 1;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfiniteEventList;
