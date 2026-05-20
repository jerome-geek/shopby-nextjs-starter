import { queryOptions, type UseQueryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { coupon } from '@/api/promotion';
import { couponKeys } from '@/hooks/queryKeys';
import type {
    GetCouponSummaryParams,
    GetCouponSummaryResponse,
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
