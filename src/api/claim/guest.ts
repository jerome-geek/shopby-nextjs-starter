import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
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
    requestCancelOptions: (data: CancelOptionsData, options?: Options) => {
        return request.post('/guest/claims/cancel', { json: data, ...options });
    },

    /**
     * 클레임시 변경되는 주문 환불 예상금액 계산하기(복수옵션)
     *  - 다수의 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 비회원용 API입니다
     */
    getRefundPrice: (data: EstimatedRefundPriceData, options?: Options) => {
        return request.post<ClaimPriceInfo>('/guest/claims/estimate', {
            json: data,
            ...options,
        });
    },

    /**
     * 반품 신청하기(복수옵션)
     *  - 다수의 선택옵션을 반품하는 비회원용 API입니다
     */
    requestReturnMultipleOptions: (
        data: RequestReturnMultipleOptionsData,
        options?: Options,
    ) => {
        return request.post('/guest/claims/return', { json: data, ...options });
    },

    /**
     * 사은품 지급 조건 충족 여부 조회하기
     *  - 클레임 이후에 사은품 지급 조건이 충족하는지 여부를 조회할 수 있는 API입니다. 정상상태의 옵션 금액의 합계로만 사은품 지급 여부를 판단합니다. (교환 출고 옵션도 계산에서 제외)
     */
    checkFreeGiftSatisfy: (
        data: CheckFreeGiftSatisfyData,
        options?: Options,
    ) => {
        return request.post<CheckFreeGiftSatisfyResponse>(
            '/guest/claims/free-gifts/satisfy',
            { json: data, ...options },
        );
    },

    /**
     * 환불 계좌 정보 수정하기
     *  - 환불 계좌 정보를 수정하는 비회원용 API입니다
     */
    updateReturnAccount: (
        claimNo: number,
        data: UpdateReturnAccountData,
        options?: Options,
    ) => {
        return request.put(`/guest/claims/${claimNo}/account`, {
            json: data,
            ...options,
        });
    },

    /**
     * 클레임 철회시 유효성 검증 타입 조회하기
     *  - 클레임 철회시 유효성 검증 타입 조회하는 비회원용 API입니다
     */
    checkClaimValidation: (claimNo: number, options?: Options) => {
        return request.get<CheckWithdrawResponse>(
            `/guest/claims/${claimNo}/check-withdraw`,
            options,
        );
    },

    /**
     * 클레임 상세보기(클레임 번호)
     *  - 비회원을 위한 클레임 번호로 클레임 세부 내역을 조회하는 API입니다
     */
    getClaimDetailByClaimNo: (claimNo: number, options?: Options) => {
        return request<GetClaimDetailByClaimNoResponse>(
            `/guest/claims/${claimNo}/result`,
            options,
        );
    },

    /**
     * 클레임 철회하기(클레임번호)
     *  - 클레임 번호로 신청된 클레임을 철회하는 비회원용 API입니다
     */
    withdrawClaimByClaimNo: (claimNo: number, options?: Options) => {
        return request.put(`/guest/claims/${claimNo}/withdraw`, options);
    },

    /**
     * 클레임 신청을 위한 정보 조회하기
     *  - 클레임 목록을 조회하는 비회원용 API입니다
     */
    getContentsForClaim: (
        orderOptionNo: number,
        params: GetOrderOptionDetailForClaimParams,
        options?: Options,
    ) => {
        return request.get<GetOrderOptionDetailForClaimResponse>(
            `/guest/order-options/${orderOptionNo}/claims`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     *  [샵바이 엔터프라이즈 전용] 나중 배송 입력 주문 취소하기
     *   - 나중 배송 입력 주문을 취소하는 API입니다.
     */
    cancelLaterInputShippingOrder: (
        params: CancelLaterInputShippingOrderParams,
        options?: Options,
    ) => {
        return request.post('/guest/later-input/shippings/claims/cancel', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
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
        options?: Options,
    ) => {
        return request.post(
            `/guest/order-options/${orderOptionNo}/claims/cancel`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 클레임시 변경되는 주문 환불금액 계산하기(단일옵션)
     *  - 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 비회원용 API입니다
     */
    getClaimOptionPrice: (
        orderOptionNo: number,
        params: GetClaimOptionPriceParams,
        options?: Options,
    ) => {
        return request.get<ClaimPriceInfo>(
            `/guest/order-options/${orderOptionNo}/claims/estimate`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 교환 신청하기
     *  - 비회원을 위한 선택옵션을 교환하는 API입니다
     */
    requestExchange: (
        orderOptionNo: number,
        data: RequestExchangeData,
        options?: Options,
    ) => {
        return request.post(
            `/guest/order-options/${orderOptionNo}/claims/exchange`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 클레임 상세보기(주문상품 옵션번호)
     *  - 주문상품 옵션번호로 클레임 세부 내역을 조회하는 비회원용 API입니다
     */
    getClaimDetailByOptionNo: (orderOptionNo: number, options?: Options) => {
        return request.get<GetClaimDetailByClaimNoResponse>(
            `/guest/order-options/${orderOptionNo}/claims/result`,
            options,
        );
    },

    /**
     * 반품 신청하기(단일옵션)
     *  - 단일옵션을 반품하는 비회원용 API입니다
     */
    requestReturnOfSingleOption: (
        orderOptionNo: number,
        data: ReturnSingleOptionData,
        options?: Options,
    ) => {
        return request.post(
            `/guest/order-options/${orderOptionNo}/claims/return`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 클레임 철회하기(주문상품 옵션번호)
     *  - 주문상품 옵션번호로 신청된 클레임을 철회하는 비회원용 API입니다
     */
    withdrawClaimByOrderOptionNo: (
        orderOptionNo: number,
        options?: Options,
    ) => {
        return request.put(
            `/guest/order-options/${orderOptionNo}/claims/withdraw`,
            options,
        );
    },

    /**
     * 주문취소 신청하기
     *  - 주문을 취소신청하는 비회원용 API입니다
     */
    requestCancel: (
        orderNo: string,
        data: CancelClaimData,
        options?: Options,
    ) => {
        return request.post(`/guest/orders/${orderNo}/claims/cancel`, {
            json: data,
            ...options,
        });
    },
};

export default guestClaim;
