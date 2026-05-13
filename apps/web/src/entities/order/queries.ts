import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestOrder, myOrder } from '@/api/order';
import { guestOrderKeys, ordersKeys } from '@/hooks/queryKeys';
import type { OrderDetailResponse } from '@/models/order';
import type {
    GetOrderDetailParams,
    GetOrderStatusSummaryParams,
    GetOrderStatusSummaryResponse,
} from '@/models/order/myOrder';

export interface OrderStatusSummaryOptionsParams<
    T = GetOrderStatusSummaryResponse,
> {
    memberNo?: number;
    searchParams?: GetOrderStatusSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderStatusSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['summary']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderStatusSummaryOptions = <T = GetOrderStatusSummaryResponse>({
    memberNo,
    searchParams,
    options,
}: OrderStatusSummaryOptionsParams<T> = {}) => {
    return queryOptions({
        queryKey: ordersKeys.summary(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderStatusSummary(searchParams);

            return data;
        },
        ...options,
    });
};

export interface OrderDetailOptionsParams<T = OrderDetailResponse> {
    orderNo: string;
    memberNo?: number;
    searchParams?: GetOrderDetailParams;
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

export const orderDetailOptions = <T = OrderDetailResponse>({
    orderNo,
    memberNo = 0,
    searchParams,
    options,
}: OrderDetailOptionsParams<T>) => {
    return queryOptions({
        queryKey: ordersKeys.detail(orderNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderDetail(
                orderNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export interface GuestOrderDetailOptionsParams<T = OrderDetailResponse> {
    orderNo: string;
    searchParams?: GetOrderDetailParams;
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

export const guestOrderDetailOptions = <T = OrderDetailResponse>({
    orderNo,
    searchParams,
    options,
}: GuestOrderDetailOptionsParams<T>) => {
    return queryOptions({
        queryKey: guestOrderKeys.detail(orderNo, searchParams),
        queryFn: async () => {
            const { data } = await guestOrder.getOrderDetail(
                orderNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};
