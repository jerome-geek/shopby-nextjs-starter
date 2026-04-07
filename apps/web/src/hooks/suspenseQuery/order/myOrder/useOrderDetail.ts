import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import { ordersKeys } from '@/hooks/queryKeys';
import { OrderDetailResponse } from '@/models/order';
import { GetOrderDetailParams } from '@/models/order/myOrder';

interface UseOrderDetailParams<T = OrderDetailResponse> {
    orderNo: string;
    memberNo?: number;
    params?: GetOrderDetailParams;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: ordersKeys.detail(orderNo, memberNo, params),
        queryFn: async () => {
            const { data } = await myOrder.getOrderDetail(orderNo, {
                ...params,
            });

            return data;
        },
        ...options,
    });
};

export default useOrderDetail;
