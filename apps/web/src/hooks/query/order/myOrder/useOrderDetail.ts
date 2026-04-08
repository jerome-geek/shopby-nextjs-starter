import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import { ordersKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import type { OrderDetailResponse } from '@/models/order';
import type { GetOrderDetailParams } from '@/models/order/myOrder';

interface UseOrderDetailParams<T = OrderDetailResponse> {
    orderNo: string;
    memberNo?: number;
    params?: GetOrderDetailParams;
    options?: Omit<
        UseQueryOptions<
            OrderDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderDetail = <T = OrderDetailResponse>({
    orderNo,
    memberNo = 0,
    params,
    options,
}: UseOrderDetailParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: ordersKeys.detail(orderNo, memberNo, params),
        queryFn: async () => {
            const { data } = await myOrder.getOrderDetail(orderNo, {
                ...params,
            });

            return data;
        },
        enabled: !!orderNo && !!isLogin,
        ...options,
    });
};

export default useOrderDetail;
