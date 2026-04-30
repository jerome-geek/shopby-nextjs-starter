import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import previousOrder from '@/api/order/previousOrder';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import type { GetPreviousOrderResponse } from '@/models/order/previousOrder';

interface UsePreviousOrderDetailParams<T = GetPreviousOrderResponse> {
    orderNo: string;
    options?: Omit<
        UseQueryOptions<
            GetPreviousOrderResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['previousDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePreviousOrderDetail = <T = GetPreviousOrderResponse>({
    orderNo,
    options,
}: UsePreviousOrderDetailParams<T>) => {
    return useQuery({
        queryKey: ordersKeys.previousDetail(orderNo),
        queryFn: async () => {
            const { data } = await previousOrder.getPreviousOrder(orderNo);
            return data;
        },
        ...options,
    });
};

export default usePreviousOrderDetail;
