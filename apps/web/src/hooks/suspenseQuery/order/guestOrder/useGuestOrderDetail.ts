import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestOrder } from '@/api/order';
import { guestOrderKeys } from '@/hooks/queryKeys';
import type { OrderDetailResponse } from '@/models/order';
import type { GetOrderDetailParams } from '@/models/order/myOrder';

interface UseGuestOrderDetailParams<T = OrderDetailResponse> {
    orderNo: string;
    params?: GetOrderDetailParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            OrderDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof guestOrderKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGuestOrderDetail = <T = OrderDetailResponse>({
    orderNo,
    params,
    options,
}: UseGuestOrderDetailParams<T>) => {
    return useSuspenseQuery({
        queryKey: guestOrderKeys.detail(orderNo, params),
        queryFn: async () => {
            const { data } = await guestOrder.getOrderDetail(orderNo, params);

            return data;
        },
        ...options,
    });
};

export default useGuestOrderDetail;
