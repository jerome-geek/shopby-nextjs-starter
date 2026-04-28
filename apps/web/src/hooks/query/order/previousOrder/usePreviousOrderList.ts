import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import previousOrder from '@/api/order/previousOrder';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import type {
    GetPreviousOrdersParams,
    GetPreviousOrdersResponse,
} from '@/models/order/previousOrder';

interface UsePreviousOrderListParams<T = GetPreviousOrdersResponse> {
    searchParams: GetPreviousOrdersParams;
    options?: Omit<
        UseQueryOptions<
            GetPreviousOrdersResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['previousList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePreviousOrderList = <T = GetPreviousOrdersResponse>({
    searchParams,
    options,
}: UsePreviousOrderListParams<T>) => {
    return useQuery({
        queryKey: ordersKeys.previousList(searchParams),
        queryFn: async () => {
            const { data } = await previousOrder.getPreviousOrders(
                searchParams,
            );
            return data;
        },
        ...options,
        placeholderData: keepPreviousData,
        enabled: options?.enabled ?? true,
    });
};

export default usePreviousOrderList;
