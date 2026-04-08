import {
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
    InfiniteData,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import {
    GetOrderListParams,
    GetOrderListResponse,
} from '@/models/order/myOrder';

interface UseInfiniteMyOrderListParams {
    memberNo: number;
    searchParams: GetOrderListParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetOrderListResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetOrderListResponse>,
            ReturnType<(typeof ordersKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

const useInfiniteMyOrderList = ({
    memberNo,
    searchParams,
    options,
}: UseInfiniteMyOrderListParams) => {
    return useInfiniteQuery({
        queryKey: ordersKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const { data } = await myOrder.getOrderList({
                ...searchParams,
                pageNumber: pageParam,
            });

            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const pageSize = searchParams.pageSize || 10;
            const totalCount = lastPage.totalCount || 0;
            const hasNextPage = pageSize * allPages.length < totalCount;
            
            return hasNextPage ? allPages.length + 1 : undefined;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        ...options,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useInfiniteMyOrderList;
