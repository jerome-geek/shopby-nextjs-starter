import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import { OrderDetailResponse } from '@/models/order';
import { GetOrderDetailParams } from '@/models/order/myOrder';
import { checkLogin } from '@/utils/users';

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
    return useQuery({
        queryKey: ordersKeys.detail(orderNo, memberNo, params),
        queryFn: async () => {
            const { data } = await myOrder.getOrderDetail(orderNo, {
                ...params,
            });

            return data;
        },
        enabled: !!orderNo && checkLogin(),
        ...options,
    });
};

export default useOrderDetail;
