import {
    infiniteQueryOptions,
    keepPreviousData,
    queryOptions,
    type InfiniteData,
    type UseInfiniteQueryOptions,
    type UseQueryOptions,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { isEmpty } from '@fxts/core';
import type { AxiosError } from 'axios';

import {
    cart,
    guestOrder,
    myOrder,
    orderConfiguration,
    orderSheet,
    shippingAddress,
} from '@/entities/order/api';
import previousOrder from '@/entities/order/api/previousOrder';
import {
    addressKeys,
    cartKeys,
    guestOrderKeys,
    orderSheetKeys,
    ordersKeys,
} from '@/hooks/queryKeys';
import type { ClaimType } from '@/models';
import type {
    ApplyCouponResponse,
    GetAvailableCouponsParams,
    OrderDetailResponse,
} from '@/entities/order/model';
import type {
    GetCartCountResponse,
    GetCartListParams,
    GetCartListResponse,
    GetSelectedCartPriceParams,
    GetSelectedCartPriceResponse,
} from '@/entities/order/model/cart';
import type {
    GetCartData,
    GetCartParams,
    GetCartResponse,
} from '@/entities/order/model/guestOrder';
import type {
    GetOrderDetailParams,
    GetOrderListParams,
    GetOrderListResponse,
    GetOrderStatusSummaryParams,
    GetOrderStatusSummaryResponse,
    GetOrderSummaryParams,
    GetOrderSummaryResponse,
} from '@/entities/order/model/myOrder';
import type { GetOrderConfigsResponse } from '@/entities/order/model/orderConfiguration';
import type {
    GetCalculatedOrderSheetData,
    GetCalculatedOrderSheetResponse,
    GetOrderSheetParams,
    GetOrderSheetResponse,
} from '@/entities/order/model/orderSheet';
import type {
    GetPreviousOrderResponse,
    GetPreviousOrdersParams,
    GetPreviousOrdersResponse,
} from '@/entities/order/model/previousOrder';
import type {
    GetPagedShippingAddressListResponse,
    GetPagedShippingAddressParams,
    GetShippingAddressListResponse,
    GetShippingAddressResponse,
} from '@/entities/order/model/shippingAddress';

// --- Order Status Summary ---

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

// --- Order Detail ---

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

// --- Guest Order Detail (base) ---

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

// --- Guest Order Detail (query with isLogin) ---

export interface UseGuestOrderDetailQueryParams<T = OrderDetailResponse> {
    orderNo: string;
    isLogin: boolean;
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

export const guestOrderDetailQueryOptions = <T = OrderDetailResponse>({
    orderNo,
    isLogin,
    params,
    options,
}: UseGuestOrderDetailQueryParams<T>) =>
    queryOptions({
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

// --- Guest Order Detail (suspense with guestToken) ---

export interface UseGuestOrderDetailSuspenseParams<T = OrderDetailResponse> {
    orderNo: string;
    guestToken?: string;
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

export const guestOrderDetailSuspenseOptions = <T = OrderDetailResponse>({
    orderNo,
    guestToken,
    params,
    options,
}: UseGuestOrderDetailSuspenseParams<T>) =>
    queryOptions({
        queryKey: guestOrderKeys.detail(orderNo, params),
        queryFn: async () => {
            const { data } = await guestOrder.getOrderDetail(orderNo, params, {
                headers: { guestToken },
            });
            return data;
        },
        ...options,
    });

// --- Guest Cart List ---

export interface UseGuestCartListParams<T = GetCartResponse> {
    data: GetCartData;
    searchParams?: GetCartParams;
    options?: Omit<
        UseQueryOptions<
            GetCartResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { data: GetCartData; searchParams?: GetCartParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

export const guestCartListOptions = <T = GetCartResponse>({
    data,
    searchParams,
    options,
}: UseGuestCartListParams<T>) =>
    queryOptions({
        queryKey: ['guestCartList', { data, searchParams }] as [
            string,
            { data: GetCartData; searchParams?: GetCartParams },
        ],
        queryFn: async () => {
            const response = await guestOrder.getCart(data, searchParams);
            return response.data;
        },
        staleTime: 10 * 1000,
        placeholderData: keepPreviousData,
        ...options,
    });

// --- Cart ---

export interface UseCartListParams<T = GetCartListResponse> {
    isLogin: boolean;
    searchParams?: GetCartListParams;
    options?: Omit<
        UseQueryOptions<
            GetCartListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof cartKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const cartListOptions = <T = GetCartListResponse>({
    isLogin,
    searchParams,
    options,
}: UseCartListParams<T>) =>
    queryOptions({
        queryKey: cartKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await cart.getCartList(searchParams);
            return data;
        },
        placeholderData: keepPreviousData,
        staleTime: 10 * 1000,
        ...options,
        enabled: (options?.enabled ?? true) && !!isLogin,
    });

export interface UseCartPriceParams<T = GetSelectedCartPriceResponse> {
    isLogin: boolean;
    searchParams: GetSelectedCartPriceParams;
    options?: Omit<
        UseQueryOptions<
            GetSelectedCartPriceResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof cartKeys)['price']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const cartPriceOptions = <T = GetSelectedCartPriceResponse>({
    isLogin,
    searchParams,
    options,
}: UseCartPriceParams<T>) =>
    queryOptions({
        queryKey: cartKeys.price(searchParams),
        queryFn: async () => {
            const { data } = await cart.getSelectedCartPrice(searchParams);
            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !!isLogin &&
            !isEmpty(searchParams.cartNo),
    });

export interface UseCartCountParams<T = GetCartCountResponse> {
    isLogin: boolean;
    options?: Omit<
        UseQueryOptions<
            GetCartCountResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof cartKeys)['count']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const cartCountOptions = <T = GetCartCountResponse>({
    isLogin,
    options,
}: UseCartCountParams<T>) =>
    queryOptions({
        queryKey: cartKeys.count(),
        queryFn: async () => {
            const { data } = await cart.getCartCount();
            return data;
        },
        ...options,
        enabled: (options?.enabled ?? true) && !!isLogin,
    });

// --- My Order ---

export interface UseMyOrderListParams<T = GetOrderListResponse> {
    searchParams: GetOrderListParams;
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

export const myOrderListOptions = <T = GetOrderListResponse>({
    searchParams,
    options,
}: UseMyOrderListParams<T>) =>
    queryOptions({
        queryKey: ordersKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderList(searchParams);
            return data;
        },
        ...options,
        placeholderData: keepPreviousData,
        enabled: options?.enabled ?? true,
    });

export interface UseInfiniteMyOrderListParams {
    searchParams: GetOrderListParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetOrderListResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetOrderListResponse>,
            ReturnType<(typeof ordersKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

export const infiniteMyOrderListOptions = ({
    searchParams,
    options,
}: UseInfiniteMyOrderListParams) =>
    infiniteQueryOptions({
        queryKey: ordersKeys.infiniteList(searchParams),
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const { data } = await myOrder.getOrderList({
                ...searchParams,
                pageNumber: pageParam,
            });
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const pageSize = searchParams.pageSize || 10;
            const totalCount = lastPage.totalCount || 0;
            const hasNextPage = pageSize * allPages.length < totalCount;
            return hasNextPage ? allPages.length + 1 : undefined;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        ...options,
        enabled: options?.enabled ?? true,
    });

export interface UseOrderDetailForClaimParams<T = OrderDetailResponse> {
    orderNo: string;
    memberNo?: number;
    searchParams?: { claimType: ClaimType };
    options?: Omit<
        UseQueryOptions<
            OrderDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['detailsByOrderNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderDetailForClaimOptions = <T = OrderDetailResponse>({
    orderNo,
    memberNo = 0,
    searchParams,
    options,
}: UseOrderDetailForClaimParams<T>) =>
    queryOptions({
        queryKey: ordersKeys.detailsByOrderNo(orderNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderDetailForClaim(
                orderNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });

export interface UseOrderSummaryParams<T = GetOrderSummaryResponse> {
    memberNo: number;
    searchParams: GetOrderSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderSummaryOptions = <T = GetOrderSummaryResponse>({
    memberNo,
    searchParams,
    options,
}: UseOrderSummaryParams<T>) =>
    queryOptions({
        queryKey: ['orders', 'summary', 'amount', searchParams] as const,
        queryFn: async () => {
            const { data } = await myOrder.getOrderSummary(searchParams);
            return data;
        },
        enabled: memberNo > 0 && (options?.enabled ?? true),
        ...options,
    });

// --- Order Configuration ---

export interface UseOrderConfigurationParams<T = GetOrderConfigsResponse> {
    options?: Omit<
        UseQueryOptions<
            GetOrderConfigsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderConfigurationOptions = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationParams<T> = {}) =>
    queryOptions({
        queryKey: ['orderConfiguration'] as [string],
        queryFn: async () => {
            const { data } = await orderConfiguration.getOrderConfigs();
            return data;
        },
        ...options,
    });

export interface UseOrderConfigurationSuspenseParams<
    T = GetOrderConfigsResponse,
> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetOrderConfigsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderConfigurationSuspenseOptions = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationSuspenseParams<T> = {}) =>
    queryOptions({
        queryKey: ordersKeys.config(),
        queryFn: async () => {
            const { data } = await orderConfiguration.getOrderConfigs();
            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });

// --- Order Sheet ---

export interface UseOrderSheetParams<T = GetOrderSheetResponse> {
    orderSheetNo: string;
    searchParams: GetOrderSheetParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderSheetResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderSheetOptions = <T = GetOrderSheetResponse>({
    orderSheetNo,
    searchParams,
    options,
}: UseOrderSheetParams<T>) =>
    queryOptions({
        queryKey: orderSheetKeys.detail(orderSheetNo, searchParams),
        queryFn: async () => {
            const { data } = await orderSheet.getOrderSheet(
                orderSheetNo,
                searchParams,
            );
            return data;
        },
        ...options,
        enabled: (options?.enabled ?? true) && !!orderSheetNo,
    });

export interface UseOrderSheetSuspenseParams<T = GetOrderSheetResponse> {
    orderSheetNo: string;
    searchParams: GetOrderSheetParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetOrderSheetResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderSheetSuspenseOptions = <T = GetOrderSheetResponse>({
    orderSheetNo,
    searchParams,
    options,
}: UseOrderSheetSuspenseParams<T>) =>
    queryOptions({
        queryKey: orderSheetKeys.detail(orderSheetNo, searchParams),
        queryFn: async () => {
            const { data } = await orderSheet.getOrderSheet(
                orderSheetNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });

// --- Available Coupon List ---

export interface UseAvailableCouponListParams<T = ApplyCouponResponse> {
    orderSheetNo: string;
    memberNo?: number;
    searchParams?: GetAvailableCouponsParams;
    options?: Omit<
        UseQueryOptions<
            ApplyCouponResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['coupon']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const availableCouponListOptions = <T = ApplyCouponResponse>({
    orderSheetNo,
    searchParams,
    memberNo,
    options,
}: UseAvailableCouponListParams<T>) =>
    queryOptions({
        queryKey: orderSheetKeys.coupon(orderSheetNo, memberNo),
        queryFn: async () => {
            const { data } = await orderSheet.getAvailableCoupons(
                orderSheetNo,
                searchParams,
            );
            return data;
        },
        enabled: !!orderSheetNo && !!memberNo,
        ...options,
    });

export interface UseAvailableCouponListSuspenseParams<T = ApplyCouponResponse> {
    orderSheetNo: string;
    memberNo?: number;
    searchParams?: GetAvailableCouponsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            ApplyCouponResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['coupon']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const availableCouponListSuspenseOptions = <T = ApplyCouponResponse>({
    orderSheetNo,
    searchParams,
    memberNo,
    options,
}: UseAvailableCouponListSuspenseParams<T>) =>
    queryOptions({
        queryKey: orderSheetKeys.coupon(orderSheetNo, memberNo),
        queryFn: async () => {
            const { data } = await orderSheet.getAvailableCoupons(
                orderSheetNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });

// --- Calculate Order Sheet ---

export interface UseCalculateOrderSheetParams<
    T = GetCalculatedOrderSheetResponse,
> {
    orderSheetNo: string;
    searchParams: GetCalculatedOrderSheetData;
    options?: Omit<
        UseQueryOptions<
            GetCalculatedOrderSheetResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['calculate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const calculateOrderSheetOptions = <
    T = GetCalculatedOrderSheetResponse,
>({
    orderSheetNo,
    searchParams,
    options,
}: UseCalculateOrderSheetParams<T>) =>
    queryOptions({
        queryKey: orderSheetKeys.calculate(orderSheetNo, searchParams),
        queryFn: async () => {
            const { data } = await orderSheet.getCalculatedOrderSheet(
                orderSheetNo,
                searchParams,
            );
            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: (options?.enabled ?? true) && !!orderSheetNo,
    });

// --- Previous Order ---

export interface UsePreviousOrderDetailParams<T = GetPreviousOrderResponse> {
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

export const previousOrderDetailOptions = <T = GetPreviousOrderResponse>({
    orderNo,
    options,
}: UsePreviousOrderDetailParams<T>) =>
    queryOptions({
        queryKey: ordersKeys.previousDetail(orderNo),
        queryFn: async () => {
            const { data } = await previousOrder.getPreviousOrder(orderNo);
            return data;
        },
        ...options,
    });

export interface UsePreviousOrderDetailSuspenseParams<
    T = GetPreviousOrderResponse,
> {
    orderNo: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetPreviousOrderResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['previousDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const previousOrderDetailSuspenseOptions = <
    T = GetPreviousOrderResponse,
>({
    orderNo,
    options,
}: UsePreviousOrderDetailSuspenseParams<T>) =>
    queryOptions({
        queryKey: ordersKeys.previousDetail(orderNo),
        queryFn: async () => {
            const { data } = await previousOrder.getPreviousOrder(orderNo);
            return data;
        },
        ...options,
    });

export interface UsePreviousOrderListParams<T = GetPreviousOrdersResponse> {
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

export const previousOrderListOptions = <T = GetPreviousOrdersResponse>({
    searchParams,
    options,
}: UsePreviousOrderListParams<T>) =>
    queryOptions({
        queryKey: ordersKeys.previousList(searchParams),
        queryFn: async () => {
            const { data } = await previousOrder.getPreviousOrders(searchParams);
            return data;
        },
        ...options,
        placeholderData: keepPreviousData,
        enabled: options?.enabled ?? true,
    });

// --- Shipping Address ---

export interface UseShippingAddressParams<T = GetShippingAddressResponse> {
    addressNo: number;
    options?: Omit<
        UseQueryOptions<
            GetShippingAddressResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof addressKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const shippingAddressOptions = <T = GetShippingAddressResponse>({
    addressNo,
    options,
}: UseShippingAddressParams<T>) =>
    queryOptions({
        queryKey: addressKeys.detail(addressNo),
        queryFn: async () => {
            const { data } = await shippingAddress.getShippingAddress(addressNo);
            return data;
        },
        enabled: !isEmpty(addressNo),
        ...options,
    });

export interface UseShippingAddressListParams<
    T = GetShippingAddressListResponse,
> {
    options?: Omit<
        UseQueryOptions<
            GetShippingAddressListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof addressKeys)['noPagingList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const shippingAddressListOptions = <T = GetShippingAddressListResponse>({
    options,
}: UseShippingAddressListParams<T> = {}) =>
    queryOptions({
        queryKey: addressKeys.noPagingList(),
        queryFn: async () => {
            const { data } = await shippingAddress.getShippingAddressList();
            return data;
        },
        ...options,
    });

export interface UsePagedShippingAddressListParams<
    T = GetPagedShippingAddressListResponse,
> {
    memberNo: number;
    params: GetPagedShippingAddressParams;
    options?: Omit<
        UseQueryOptions<
            GetPagedShippingAddressListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { memberNo: number; params: GetPagedShippingAddressParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

export const pagedShippingAddressListOptions = <
    T = GetPagedShippingAddressListResponse,
>({
    memberNo,
    params,
    options,
}: UsePagedShippingAddressListParams<T>) =>
    queryOptions({
        queryKey: ['shippingAddressList', { memberNo, params }] as [
            string,
            { memberNo: number; params: GetPagedShippingAddressParams },
        ],
        queryFn: async () => {
            const { data } =
                await shippingAddress.getPagedShippingAddressList(params);
            return data;
        },
        ...options,
    });

// --- Order Complete Detail ---

export interface UseOrderCompleteDetailParams {
    orderNo: string;
    isLogin: boolean;
}

export const orderCompleteDetailOptions = ({
    orderNo,
    isLogin,
}: UseOrderCompleteDetailParams) =>
    queryOptions({
        queryKey: ['orderCompleteDetail', orderNo, isLogin] as const,
        queryFn: async () => {
            if (isLogin) {
                const response = await myOrder.getOrderDetail(orderNo);
                return response.data;
            } else {
                const response = await guestOrder.getOrderDetail(orderNo, {
                    orderRequestType: 'ALL',
                });
                return response.data;
            }
        },
    });
