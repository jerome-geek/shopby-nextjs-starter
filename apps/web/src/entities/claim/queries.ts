import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim, memberClaim } from '@/api/claim';
import { claimsKeys, guestOrderKeys, ordersKeys } from '@/hooks/queryKeys';
import type { ClaimPriceInfo } from '@/models/claim';
import type { GetClaimOptionPriceParams } from '@/models/claim/guest';
import type {
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
} from '@/models/claim/member';

export interface MemberOrderOptionDetailForClaimOptionsParams<
    T = GetOrderOptionDetailForClaimResponse,
> {
    orderOptionNo: number;
    searchParams: GetOrderOptionDetailForClaimParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderOptionDetailForClaimResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['detailsByOrderOptionNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const memberOrderOptionDetailForClaimOptions = <
    T = GetOrderOptionDetailForClaimResponse,
>({
    orderOptionNo,
    searchParams,
    options,
}: MemberOrderOptionDetailForClaimOptionsParams<T>) => {
    return queryOptions({
        queryKey: ordersKeys.detailsByOrderOptionNo(
            orderOptionNo,
            searchParams,
        ),
        queryFn: async () => {
            const { data } = await memberClaim.getOrderOptionDetailForClaim(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export interface GuestOrderOptionDetailForClaimOptionsParams<
    T = GetOrderOptionDetailForClaimResponse,
> {
    orderOptionNo: number;
    searchParams: GetOrderOptionDetailForClaimParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderOptionDetailForClaimResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof guestOrderKeys)['detailsByOrderOptionNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const guestOrderOptionDetailForClaimOptions = <
    T = GetOrderOptionDetailForClaimResponse,
>({
    orderOptionNo,
    searchParams,
    options,
}: GuestOrderOptionDetailForClaimOptionsParams<T>) => {
    return queryOptions({
        queryKey: guestOrderKeys.detailsByOrderOptionNo(
            orderOptionNo,
            searchParams,
        ),
        queryFn: async () => {
            const { data } = await guestClaim.getContentsForClaim(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export interface MemberOrderOptionEstimateOptionsParams<T = ClaimPriceInfo> {
    orderOptionNo: number;
    searchParams: GetClaimOptionPriceParams;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['orderOptionEstimate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const memberOrderOptionEstimateOptions = <T = ClaimPriceInfo>({
    orderOptionNo,
    searchParams,
    options,
}: MemberOrderOptionEstimateOptionsParams<T>) => {
    return queryOptions({
        queryKey: claimsKeys.orderOptionEstimate(orderOptionNo, searchParams),
        queryFn: async () => {
            const { data } = await memberClaim.getClaimOptionPrice(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export interface GuestOrderOptionEstimateOptionsParams<T = ClaimPriceInfo> {
    orderOptionNo: number;
    searchParams: GetClaimOptionPriceParams;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['guestOrderOptionEstimate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const guestOrderOptionEstimateOptions = <T = ClaimPriceInfo>({
    orderOptionNo,
    searchParams,
    options,
}: GuestOrderOptionEstimateOptionsParams<T>) => {
    return queryOptions({
        queryKey: claimsKeys.guestOrderOptionEstimate(
            orderOptionNo,
            searchParams,
        ),
        queryFn: async () => {
            const { data } = await guestClaim.getClaimOptionPrice(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};
