import {
    InfiniteData,
    keepPreviousData,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import previousOrder from '@/api/order/previousOrder';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import type {
    GetPreviousOrdersParams,
    GetPreviousOrdersResponse,
} from '@/models/order/previousOrder';

interface UseInfinitePreviousOrderListParams {
    searchParams: GetPreviousOrdersParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetPreviousOrdersResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetPreviousOrdersResponse>,
            ReturnType<(typeof ordersKeys)['infinitePreviousList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

const useInfinitePreviousOrderList = ({
    searchParams,
    options,
}: UseInfinitePreviousOrderListParams) => {
    return useInfiniteQuery({
        queryKey: ordersKeys.infinitePreviousList(searchParams),
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const { data } = await previousOrder.getPreviousOrders({
                ...searchParams,
                page: pageParam,
            });
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const pageSize = searchParams.size || 10;
            const totalCount = lastPage.totalCount || 0;
            const hasNextPage = pageSize * allPages.length < totalCount;

            return hasNextPage ? allPages.length + 1 : undefined;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        ...options,
        enabled: options?.enabled ?? true,
    });
};

export default useInfinitePreviousOrderList;
