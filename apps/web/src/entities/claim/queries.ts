import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim, memberClaim } from '@/api/claim';
import { guestOrderKeys, ordersKeys } from '@/hooks/queryKeys';
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
