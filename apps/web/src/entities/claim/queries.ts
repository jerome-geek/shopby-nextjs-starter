import { isEmpty } from '@fxts/core';
import {
    queryOptions,
    infiniteQueryOptions,
    keepPreviousData,
    type UseQueryOptions,
    type UseInfiniteQueryOptions,
    type InfiniteData,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim, memberClaim } from '@/entities/claim/api';
import { claimsKeys, guestOrderKeys, ordersKeys } from '@/hooks/queryKeys';
import type { ClaimPriceInfo, EstimatedRefundPriceData } from '@/entities/claim/model';
import type { GetClaimOptionPriceParams } from '@/entities/claim/model/guest';
import type {
    GetClaimDetailByClaimNoResponse,
    GetClaimListParams,
    GetClaimListResponse,
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
} from '@/entities/claim/model/member';

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

export interface UseGuestClaimDetailParams<
    T = GetClaimDetailByClaimNoResponse,
> {
    claimNo: number;
    options?: Omit<
        UseQueryOptions<
            GetClaimDetailByClaimNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['guestDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const guestClaimDetailOptions = <T = GetClaimDetailByClaimNoResponse>({
    claimNo,
    options,
}: UseGuestClaimDetailParams<T>) =>
    queryOptions({
        queryKey: claimsKeys.guestDetail(claimNo),
        queryFn: async () => {
            const { data } = await guestClaim.getClaimDetailByClaimNo(claimNo);

            return data;
        },
        ...options,
        enabled: (options?.enabled ?? true) && !!claimNo,
    });

export interface UseGuestEstimateParams<T = ClaimPriceInfo> {
    data: EstimatedRefundPriceData;
    isLogin: boolean;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['guestEstimate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const guestEstimateOptions = <T = ClaimPriceInfo>({
    data,
    isLogin,
    options,
}: UseGuestEstimateParams<T>) =>
    queryOptions({
        queryKey: claimsKeys.guestEstimate(data),
        queryFn: async () => {
            const response = await guestClaim.getRefundPrice(data);

            return response.data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !isLogin &&
            !!data?.claimReasonType &&
            !isEmpty(data?.claimedProductOptions),
    });

export interface UseClaimDetailParams<T = GetClaimDetailByClaimNoResponse> {
    claimNo: number;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetClaimDetailByClaimNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const claimDetailOptions = <T = GetClaimDetailByClaimNoResponse>({
    claimNo,
    memberNo = 0,
    options,
}: UseClaimDetailParams<T>) =>
    queryOptions({
        queryKey: claimsKeys.detail(claimNo, memberNo),
        queryFn: async () => {
            const { data } = await memberClaim.getClaimDetailByClaimNo(claimNo);

            return data;
        },
        enabled: !!claimNo,
        ...options,
    });

export interface UseEstimateParams<T = ClaimPriceInfo> {
    data: EstimatedRefundPriceData;
    isLogin: boolean;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['estimate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const estimateOptions = <T = ClaimPriceInfo>({
    data,
    isLogin,
    options,
}: UseEstimateParams<T>) =>
    queryOptions({
        queryKey: claimsKeys.estimate(data),
        queryFn: async () => {
            const response = await memberClaim.getEstimatedRefundPrice(data);

            return response.data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !!data?.claimReasonType &&
            !!isLogin &&
            !isEmpty(data?.claimedProductOptions),
    });

export interface UseMemberClaimListParams<T = GetClaimListResponse> {
    searchParams: GetClaimListParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetClaimListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const memberClaimListOptions = <T = GetClaimListResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseMemberClaimListParams<T>) =>
    queryOptions({
        queryKey: claimsKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await memberClaim.getClaimList(searchParams);

            return data;
        },
        ...options,
        placeholderData: keepPreviousData,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });

export interface UseInfiniteMemberClaimListParams {
    memberNo: number;
    searchParams: GetClaimListParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetClaimListResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetClaimListResponse>,
            ReturnType<(typeof claimsKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

export const infiniteMemberClaimListOptions = ({
    memberNo,
    searchParams,
    options,
}: UseInfiniteMemberClaimListParams) =>
    infiniteQueryOptions({
        queryKey: claimsKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const { data } = await memberClaim.getClaimList({
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
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
