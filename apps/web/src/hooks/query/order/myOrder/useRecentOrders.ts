import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import myOrder from '@/api/order/myOrder';
import type { GetOrderListParams, GetOrderListResponse } from '@/models/order/myOrder';

interface UseRecentOrdersParams<T = GetOrderListResponse> {
    memberNo: number;
    searchParams: GetOrderListParams;
    options?: Omit<
        UseQueryOptions<GetOrderListResponse, AxiosError<ShopByErrorResponse>, T>,
        'queryKey' | 'queryFn'
    >;
}

const useRecentOrders = <T = GetOrderListResponse>({
    memberNo,
    searchParams,
    options,
}: UseRecentOrdersParams<T>) => {
    return useQuery({
        queryKey: ['orders', 'recent', memberNo, searchParams],
        queryFn: async () => {
            const { data } = await myOrder.getOrderList(searchParams);
            return data;
        },
        enabled: memberNo > 0 && (options?.enabled ?? true),
        ...options,
    });
};

export default useRecentOrders;

