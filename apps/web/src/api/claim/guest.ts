import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import {
    CancelOptionsData,
    ClaimPriceInfo,
    EstimatedRefundPriceData,
    ReturnSingleOptionData,
} from '@/models/claim';
import {
    CancelClaimData,
    CancelClaimOptionData,
    CancelLaterInputShippingOrderParams,
    CheckWithdrawResponse,
    GetClaimOptionPriceParams,
    UpdateReturnAccountData,
} from '@/models/claim/guest';
import {
    CheckFreeGiftSatisfyData,
    CheckFreeGiftSatisfyResponse,
    GetClaimDetailByClaimNoResponse,
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
    RequestExchangeData,
    RequestReturnMultipleOptionsData,
} from '@/models/claim/member';

const guestClaim = {
    /**
     * 옵션취소 신청하기(복수옵션)
     *  - 다수의 선택옵션을 취소신청하는 비회원용 API입니다
     */
    requestCancelOptions: (
        data: CancelOptionsData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/guest/claims/cancel',
            data,
            ...options,
        });
    },

    /**
     * 클레임시 변경되는 주문 환불 예상금액 계산하기(복수옵션)
     *  - 다수의 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 비회원용 API입니다
     */
    getRefundPrice: (
        data: EstimatedRefundPriceData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<ClaimPriceInfo>({
            method: 'POST',
            url: '/guest/claims/estimate',
            data,
            ...options,
        });
    },

    /**
     * 반품 신청하기(복수옵션)
     *  - 다수의 선택옵션을 반품하는 비회원용 API입니다
     */
    requestReturnMultipleOptions: (
        data: RequestReturnMultipleOptionsData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/guest/claims/return',
            data,
            ...options,
        });
    },

    /**
     * 사은품 지급 조건 충족 여부 조회하기
     *  - 클레임 이후에 사은품 지급 조건이 충족하는지 여부를 조회할 수 있는 API입니다. 정상상태의 옵션 금액의 합계로만 사은품 지급 여부를 판단합니다. (교환 출고 옵션도 계산에서 제외)
     */
    checkFreeGiftSatisfy: (
        data: CheckFreeGiftSatisfyData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckFreeGiftSatisfyResponse>({
            method: 'POST',
            url: '/guest/claims/free-gifts/satisfy',
            data,
            ...options,
        });
    },

    /**
     * 환불 계좌 정보 수정하기
     *  - 환불 계좌 정보를 수정하는 비회원용 API입니다
     */
    updateReturnAccount: (
        claimNo: number,
        data: UpdateReturnAccountData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: `/guest/claims/${claimNo}/account`,
            data,
            ...options,
        });
    },

    /**
     * 클레임 철회시 유효성 검증 타입 조회하기
     *  - 클레임 철회시 유효성 검증 타입 조회하는 비회원용 API입니다
     */
    checkClaimValidation: (claimNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest<CheckWithdrawResponse>({
            method: 'GET',
            url: `/guest/claims/${claimNo}/check-withdraw`,
            ...options,
        });
    },

    /**
     * 클레임 상세보기(클레임 번호)
     *  - 비회원을 위한 클레임 번호로 클레임 세부 내역을 조회하는 API입니다
     */
    getClaimDetailByClaimNo: (
        claimNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetClaimDetailByClaimNoResponse>({
            method: 'GET',
            url: `/guest/claims/${claimNo}/result`,
            ...options,
        });
    },

    /**
     * 클레임 철회하기(클레임번호)
     *  - 클레임 번호로 신청된 클레임을 철회하는 비회원용 API입니다
     */
    withdrawClaimByClaimNo: (claimNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'PUT',
            url: `/guest/claims/${claimNo}/withdraw`,
            ...options,
        });
    },

    /**
     * 클레임 신청을 위한 정보 조회하기
     *  - 클레임 목록을 조회하는 비회원용 API입니다
     */
    getContentsForClaim: (
        orderOptionNo: number,
        params: GetOrderOptionDetailForClaimParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetOrderOptionDetailForClaimResponse>({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims`,
            params,
            ...options,
        });
    },

    /**
     *  [샵바이 엔터프라이즈 전용] 나중 배송 입력 주문 취소하기
     *   - 나중 배송 입력 주문을 취소하는 API입니다.
     */
    cancelLaterInputShippingOrder: (
        params: CancelLaterInputShippingOrderParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/guest/later-input/shippings/claims/cancel',
            params,
            ...options,
        });
    },

    /**
     * 옵션취소 신청하기
     *  - 단일옵션을 취소신청하는 비회원용 API입니다
     */
    requestCancelClaimOption: (
        orderOptionNo: number,
        data: CancelClaimOptionData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/cancel`,
            data,
            ...options,
        });
    },

    /**
     * 클레임시 변경되는 주문 환불금액 계산하기(단일옵션)
     *  - 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 비회원용 API입니다
     */
    getClaimOptionPrice: (
        orderOptionNo: number,
        params: GetClaimOptionPriceParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<ClaimPriceInfo>({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims/estimate`,
            params,
            ...options,
        });
    },

    /**
     * 교환 신청하기
     *  - 비회원을 위한 선택옵션을 교환하는 API입니다
     */
    requestExchange: (
        orderOptionNo: number,
        data: RequestExchangeData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/exchange`,
            data,
            ...options,
        });
    },

    /**
     * 클레임 상세보기(주문상품 옵션번호)
     *  - 주문상품 옵션번호로 클레임 세부 내역을 조회하는 비회원용 API입니다
     */
    getClaimDetailByOptionNo: (
        orderOptionNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetClaimDetailByClaimNoResponse>({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims/result`,
            ...options,
        });
    },

    /**
     * 반품 신청하기(단일옵션)
     *  - 단일옵션을 반품하는 비회원용 API입니다
     */
    requestReturnOfSingleOption: (
        orderOptionNo: number,
        data: ReturnSingleOptionData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/return`,
            data,
            ...options,
        });
    },

    /**
     * 클레임 철회하기(주문상품 옵션번호)
     *  - 주문상품 옵션번호로 신청된 클레임을 철회하는 비회원용 API입니다
     */
    withdrawClaimByOrderOptionNo: (
        orderOptionNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/claims/withdraw`,
            ...options,
        });
    },

    /**
     * 주문취소 신청하기
     *  - 주문을 취소신청하는 비회원용 API입니다
     */
    requestCancel: (
        orderNo: string,
        data: CancelClaimData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/guest/orders/${orderNo}/claims/cancel`,
            data,
            ...options,
        });
    },
};

export default guestClaim;
