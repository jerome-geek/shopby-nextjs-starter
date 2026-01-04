import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';

import {
    GetCouponSummaryParams,
    GetCouponSummaryResponse,
    GetCouponTargetsParams,
    GetCouponTargetsResponse,
    GetExcludeTargetsByCouponNumberParams,
    GetExcludeTargetsByCouponNumberResponse,
    GetIssuableCouponResponse,
    GetIssuableCouponsByProductNoParams,
    GetIssuableCouponsByProductNoResponse,
    GetUserCouponsParams,
    GetUserCouponsResponse,
    IssueCouponByPromotionCodeResponse,
    IssueCouponData,
    IssueCouponResponse,
    IssueEventCouponsResponse,
    IssueProductCouponsData,
    IssueProductCouponsResponse,
} from '@/models/promotion/coupon';

const coupon = {
    /**
     * 내 쿠폰 가져오기
     *  - 로그인한 사용자가 보유한 쿠폰중 사용가능한 쿠폰과 이미 사용한 쿠폰을 구분하여 조회합니다
     */
    getUserCoupons: (params?: GetUserCouponsParams, options?: Options) => {
        return request.get<GetUserCouponsResponse>('coupons', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 발급 가능한 쿠폰 조회하기
     *  - 상품과 상관없이 오늘 날짜 기준으로 다운로드 가능한 쿠폰을 모두 조회합니다
     */
    getIssuableCoupons: (options?: Options) => {
        return request.get<GetIssuableCouponResponse>('coupons/issuable', {
            ...options,
        });
    },

    /**
     * 내 쿠폰 요약정보 가져오기
     *  - 로그인한 사용자가 보유한 쿠폰의 정보를 요약하여 조회합니다
     */
    getCouponSummary: (params?: GetCouponSummaryParams, options?: Options) => {
        return request.get<GetCouponSummaryResponse>('coupons/summary', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 코드 쿠폰 발급하기
     *  - 등록된 프로모션 코드를 이용해 쿠폰을 발급받습니다
     */
    issueCouponByPromotionCode: (promotionCode: string, options?: Options) => {
        return request.post<IssueCouponByPromotionCodeResponse>(
            `coupons/register-code/${promotionCode}`,
            {
                ...options,
            }
        );
    },

    /**
     * 쿠폰 발급하기
     *  - 선택한 쿠폰번호에 해당하는 다운로드 쿠폰을 발급받습니다
     */
    issueCoupon: (
        couponNo: number,
        data?: IssueCouponData,
        options?: Options
    ) => {
        return request.post<IssueCouponResponse>(
            `coupons/${couponNo}/download`,
            {
                json: data,
                ...options,
            }
        );
    },
    /**
     * 쿠폰번호로 제외 대상 조회하기
     *  - 선택한 쿠폰번호에 해당하는 제외 대상의 목록을 조회합니다
     */
    getExcludeTargetsByCouponNumber: (
        couponNo: number,
        params: GetExcludeTargetsByCouponNumberParams,
        options?: Options
    ) => {
        return request.get<GetExcludeTargetsByCouponNumberResponse>(
            `coupons/${couponNo}/exclude-targets`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 쿠폰번호로 대상 조회하기
     *  - 선택한 쿠폰번호에 해당하는 대상의 목록을 조회합니다
     */
    getCouponTargets: (
        couponNo: number,
        params: GetCouponTargetsParams,
        options?: Options
    ) => {
        return request.get<GetCouponTargetsResponse>(
            `coupons/${couponNo}/targets`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 기획전 번호로 쿠폰 발급하기
     *  - 해당 기획전에서 다운로드받을 수 있는 모든 쿠폰을 발급합니다
     */
    issueEventCoupons: (eventNo: number, options?: Options) => {
        return request.post<IssueEventCouponsResponse>(
            `coupons/events/${eventNo}/download`,
            {
                ...options,
            }
        );
    },

    /**
     * 상품 번호로 쿠폰 발급하기
     *  - 해당 상품에서 다운로드받을 수 있는 모든 쿠폰을 발급합니다
     */
    issueProductCoupons: (
        productNo: number,
        data?: IssueProductCouponsData,
        options?: Options
    ) => {
        return request.post<IssueProductCouponsResponse>(
            `coupons/products/${productNo}/download`,
            {
                json: data,
                ...options,
            }
        );
    },

    /**
     * 상품 번호로 발급 가능한 쿠폰 조회하기
     *  - 해당 상품 상세정보에서 다운로드 할수 있는 모든 쿠폰을 조회합니다
     */
    getIssuableCouponsByProductNo: (
        productNo: number,
        params?: GetIssuableCouponsByProductNoParams,
        options?: Options
    ) => {
        return request.get<GetIssuableCouponsByProductNoResponse>(
            `coupons/products/${productNo}/issuable/coupons`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },
};

export default coupon;
