import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import {
    GetOrderListParams,
    GetOrderListResponse,
} from '@/models/order/myOrder';

interface UseOrderListParams<T = GetOrderListResponse> {
    searchParams: GetOrderListParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetOrderListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMyOrderList = <T = GetOrderListResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseOrderListParams<T>) => {
    return useQuery({
        queryKey: ordersKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderList(searchParams);

            return data;
        },

        ...options,
        placeholderData: keepPreviousData,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useMyOrderList;
