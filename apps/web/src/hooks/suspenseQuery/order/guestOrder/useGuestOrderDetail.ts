import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestOrder } from '@/api/order';
import { guestOrderKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
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
    const isLogin = useAuth();

    return useSuspenseQuery({
        queryKey: guestOrderKeys.detail(orderNo, params),
        queryFn: async () => {
            const { data } = await guestOrder.getOrderDetail(orderNo, params);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        ...options,
    });
};

export default useGuestOrderDetail;
