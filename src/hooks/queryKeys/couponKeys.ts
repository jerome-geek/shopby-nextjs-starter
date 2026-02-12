import {
    GetCouponSummaryParams,
    GetIssuableCouponsByProductNoParams,
    GetUserCouponsParams,
} from '@/models/promotion/coupon';

const couponKeys = {
    all: ['coupons'] as const,

    lists: () => [...couponKeys.all, 'list'] as const,

    list: (searchParams: GetUserCouponsParams, memberNo?: number) =>
        [...couponKeys.lists(), memberNo, searchParams] as const,

    infiniteList: (searchParams: GetUserCouponsParams, memberNo?: number) =>
        [...couponKeys.lists(), memberNo, searchParams, 'infinite'] as const,

    issuableList: (memberNo: number) =>
        [...couponKeys.lists(), 'issuable', memberNo] as const,

    listByProductNo: (
        productNo: number,
        memberNo?: number,
        searchParams?: GetIssuableCouponsByProductNoParams,
    ) => [...couponKeys.lists(), productNo, memberNo, searchParams] as const,

    summary: (memberNo: number, params: GetCouponSummaryParams) =>
        [...couponKeys.all, 'summary', memberNo, params] as const,
};

export default couponKeys;
