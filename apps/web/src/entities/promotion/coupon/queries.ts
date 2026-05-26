import {
    queryOptions,
    keepPreviousData,
    type UseQueryOptions,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { coupon } from '@/api/promotion';
import { couponKeys } from '@/hooks/queryKeys';
import type {
    GetCouponSummaryParams,
    GetCouponSummaryResponse,
    GetUserCouponsParams,
    GetUserCouponsResponse,
    GetIssuableCouponsByProductNoParams,
    GetIssuableCouponsByProductNoResponse,
} from '@/models/promotion/coupon';

export interface UseCouponSummaryParams<T = GetCouponSummaryResponse> {
    memberNo: number;
    params: GetCouponSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetCouponSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['summary']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const couponSummaryOptions = <T = GetCouponSummaryResponse>({
    memberNo,
    params,
    options,
}: UseCouponSummaryParams<T>) =>
    queryOptions({
        queryKey: couponKeys.summary(memberNo, params),
        queryFn: async () => {
            const { data } = await coupon.getCouponSummary(params);

            return data;
        },
        ...options,
    });

export interface UseCouponSummarySuspenseParams<T = GetCouponSummaryResponse> {
    memberNo: number;
    params: GetCouponSummaryParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetCouponSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['summary']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const couponSummarySuspenseOptions = <T = GetCouponSummaryResponse>({
    memberNo,
    params,
    options,
}: UseCouponSummarySuspenseParams<T>) =>
    queryOptions({
        queryKey: couponKeys.summary(memberNo, params),
        queryFn: async () => {
            const { data } = await coupon.getCouponSummary(params);

            return data;
        },
        ...options,
    });

export interface UseCouponListParams<T = GetUserCouponsResponse> {
    searchParams: GetUserCouponsParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetUserCouponsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const couponListOptions = <T = GetUserCouponsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseCouponListParams<T>) =>
    queryOptions({
        queryKey: couponKeys.list(searchParams, memberNo),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(searchParams);

            return data;
        },
        enabled: memberNo !== 0,
        ...options,
    });

export interface UseCouponListSuspenseParams<T = GetUserCouponsResponse> {
    searchParams: GetUserCouponsParams;
    memberNo?: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetUserCouponsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const couponListSuspenseOptions = <T = GetUserCouponsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseCouponListSuspenseParams<T>) =>
    queryOptions({
        queryKey: couponKeys.list(searchParams, memberNo),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(searchParams);

            return data;
        },
        ...options,
    });

export interface UseCouponListByProductNoParams<
    T = GetIssuableCouponsByProductNoResponse,
> {
    productNo: number;
    memberNo?: number;
    searchParams?: GetIssuableCouponsByProductNoParams;
    options?: Omit<
        UseQueryOptions<
            GetIssuableCouponsByProductNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['listByProductNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const couponListByProductNoOptions = <
    T = GetIssuableCouponsByProductNoResponse,
>({
    productNo,
    memberNo = 0,
    searchParams,
    options,
}: UseCouponListByProductNoParams<T>) =>
    queryOptions({
        queryKey: couponKeys.listByProductNo(productNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await coupon.getIssuableCouponsByProductNo(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });

export interface UseCouponListByProductNoSuspenseParams<
    T = GetIssuableCouponsByProductNoResponse,
> {
    productNo: number;
    memberNo?: number;
    searchParams?: GetIssuableCouponsByProductNoParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetIssuableCouponsByProductNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['listByProductNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const couponListByProductNoSuspenseOptions = <
    T = GetIssuableCouponsByProductNoResponse,
>({
    productNo,
    memberNo = 0,
    searchParams,
    options,
}: UseCouponListByProductNoSuspenseParams<T>) =>
    queryOptions({
        queryKey: couponKeys.listByProductNo(productNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await coupon.getIssuableCouponsByProductNo(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });

export interface UseUserCouponsParams<T = GetUserCouponsResponse> {
    params: GetUserCouponsParams;
    options?: Omit<
        UseQueryOptions<
            GetUserCouponsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const userCouponsOptions = <T = GetUserCouponsResponse>({
    params,
    options,
}: UseUserCouponsParams<T>) =>
    queryOptions({
        queryKey: couponKeys.list(params),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface UseUserCouponsSuspenseParams<T = GetUserCouponsResponse> {
    params: GetUserCouponsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetUserCouponsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const userCouponsSuspenseOptions = <T = GetUserCouponsResponse>({
    params,
    options,
}: UseUserCouponsSuspenseParams<T>) =>
    queryOptions({
        queryKey: couponKeys.list(params),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(params);

            return data;
        },
        ...options,
    });
