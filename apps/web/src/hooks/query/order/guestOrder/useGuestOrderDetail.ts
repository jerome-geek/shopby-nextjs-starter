import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { guestOrder } from '@/api/order';
import { guestOrderKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import { OrderDetailResponse } from '@/models/order';
import { GetOrderDetailParams } from '@/models/order/myOrder';

interface UseGuestOrderDetailParams<T = OrderDetailResponse> {
    orderNo: string;
    params?: GetOrderDetailParams;
    options?: Omit<
        UseQueryOptions<
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

    return useQuery({
        queryKey: guestOrderKeys.detail(orderNo, params),
        queryFn: async () => {
            const { data } = await guestOrder.getOrderDetail(orderNo, params);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        enabled: !!orderNo && !!isLogin,
        ...options,
    });
};

export default useGuestOrderDetail;
