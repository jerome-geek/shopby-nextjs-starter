import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import {
    CancelOptionsData,
    ClaimPriceInfo,
    EstimatedRefundPriceData,
    RefundAccountData,
    ReturnSingleOptionData,
} from '@/models/claim';
import {
    CancelClaimData,
    CancelClaimOptionData,
    CheckWithdrawResponse,
    GetClaimOptionPriceParams,
} from '@/models/claim/guest';
import {
    CheckFreeGiftSatisfyData,
    CheckFreeGiftSatisfyResponse,
    GetClaimDetailByClaimNoResponse,
    GetClaimListParams,
    GetClaimListResponse,
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
    RequestExchangeData,
    RequestReturnMultipleOptionsData,
} from '@/models/claim/member';

const memberClaim = {
    /**
     * 회원 클레임 목록 조회하기
     *  - 클레임 목록을 조회하는 API입니다
     */
    getClaimList: (params: GetClaimListParams, options?: Options) => {
        return request.get<GetClaimListResponse>('profile/claims', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 회원 옵션취소 신청하기(복수옵션)
     *  - 다수의 선택옵션을 취소신청하는 API입니다
     */
    requestCancelOptions: (data: CancelOptionsData, options?: Options) => {
        return request.post('profile/claims/cancel', {
            json: data,
            ...options,
        });
    },

    /**
     * 회원 클레임시 변경되는 주문의 환불 예상금액 계산하기(복수옵션)
     *  - 다수의 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 API입니다
     */
    getEstimatedRefundPrice: (
        data: EstimatedRefundPriceData,
        options?: Options,
    ) => {
        return request.post<ClaimPriceInfo>('profile/claims/estimate', {
            json: data,
            ...options,
        });
    },

    /**
     * 회원 반품 신청하기(복수옵션)
     *  - 다수의 선택옵션을 반품하는 API입니다
     */
    requestReturnMultipleOptions: (
        data: RequestReturnMultipleOptionsData,
        options?: Options,
    ) => {
        return request.post('profile/claims/return', {
            json: data,
            ...options,
        });
    },

    /**
     * 사은품 지급 조건 충족 여부 조회하기
     * - 클레임 이후에 사은품 지급 조건이 충족하는지 여부를 조회할 수 있는 API입니다. 정상상태의 옵션 금액의 합계로만 사은품 지급 여부를 판단합니다. (교환 출고 옵션도 계산에서 제외)
     */
    checkFreeGiftSatisfy: (
        data: CheckFreeGiftSatisfyData,
        options?: Options,
    ) => {
        return request.post<CheckFreeGiftSatisfyResponse>(
            'profile/claims/free-gifts/satisfy',
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 회원 환불 계좌 정보 수정하기
     *  - 환불 계좌 정보를 수정하는 API입니다
     */
    updateReturnAccount: (
        claimNo: number,
        data: RefundAccountData,
        options?: Options,
    ) => {
        return request.put(`profile/claims/${claimNo}/account`, {
            json: data,
            ...options,
        });
    },

    /**
     * 회원 클레임 철회시 유효성 검증 타입 조회하기
     *  - 클레임 철회시 유효성 검증 타입 조회하는 API입니다
     */
    checkClaimValidation: (claimNo: number, options?: Options) => {
        return request.get<CheckWithdrawResponse>(
            `profile/claims/${claimNo}/check-withdraw`,
            options,
        );
    },

    /**
     * 회원 클레임 상세보기(클레임 번호)
     *  - 클레임 번호로 클레임 세부 내역을 조회합니다
     */
    getClaimDetailByClaimNo: (claimNo: number, options?: Options) => {
        return request.get<GetClaimDetailByClaimNoResponse>(
            `profile/claims/${claimNo}/result`,
            options,
        );
    },

    /**
     * 회원 클레임 철회하기(클레임번호)
     *  - 클레임 번호로 신청된 클레임을 철회하는 API입니다
     */
    withdrawClaimByClaimNo: (claimNo: number, options?: Options) => {
        return request.put(`profile/claims/${claimNo}/withdraw`, options);
    },

    /**
     * 회원 클레임 신청을 위한 정보 조회하기
     *  - 선택옵션에 대한 클레임을 신청할 때 필요한 정보를 조회합니다
     */
    getOrderOptionDetailForClaim: (
        orderOptionNo: number,
        params: GetOrderOptionDetailForClaimParams,
        options?: Options,
    ) => {
        return request.get<GetOrderOptionDetailForClaimResponse>(
            `profile/order-options/${orderOptionNo}/claims`,
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
     * 회원 옵션취소 신청하기(단일옵션)
     *  - 단일옵션을 취소신청하는 API입니다
     */
    requestCancelClaimOption: (
        orderOptionNo: number,
        data: CancelClaimOptionData,
        options?: Options,
    ) => {
        return request.post(
            `profile/order-options/${orderOptionNo}/claims/cancel`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 회원 클레임시 변경되는 주문의 환불 예상금액 계산하기(단일옵션)
     *  - 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 API입니다
     * 참고 : ClaimType을 EXCHANGE로 요청 시 exchangeProductNo, exchangeOptionNo, exchangeCnt가 null일 경우 동일상품, 동일옵션, 교환수량으로 환불예상금액을 조회
     */
    getClaimOptionPrice: (
        orderOptionNo: number,
        params: GetClaimOptionPriceParams,
        options?: Options,
    ) => {
        return request.get<ClaimPriceInfo>(
            `profile/order-options/${orderOptionNo}/claims/estimate`,
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
     * 회원 클레임 교환 신청하기
     *  - 선택옵션을 교환하는 API입니다.
     */
    requestExchange: (
        orderOptionNo: number,
        data: RequestExchangeData,
        options?: Options,
    ) => {
        return request.post(
            `profile/order-options/${orderOptionNo}/claims/exchange`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 회원 클레임 상세보기(주문상품 옵션번호)
     *  - 주문상품 옵션번호로 클레임 세부 내역을 조회하는 API입니다
     */
    getClaimDetailByOrderOptionNo: (
        orderOptionNo: number,
        options?: Options,
    ) => {
        return request.get<GetClaimDetailByClaimNoResponse>(
            `profile/order-options/${orderOptionNo}/claims/result`,
            options,
        );
    },

    /**
     * 회원 반품 신청하기(단일옵션)
     *  - 단일옵션을 반품하는 API입니다
     */
    requestReturnOfSingleOption: (
        orderOptionNo: number,
        data: ReturnSingleOptionData,
        options?: Options,
    ) => {
        return request.post(
            `profile/order-options/${orderOptionNo}/claims/return`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 회원 클레임 철회하기(주문상품 옵션번호)
     *  - 주문상품 옵션번호로 신청된 클레임을 철회하는 API입니다
     */
    withdrawClaimByOrderOptionNo: (
        orderOptionNo: number,
        options?: Options,
    ) => {
        return request.put(
            `profile/order-options/${orderOptionNo}/claims/withdraw`,
            options,
        );
    },

    /**
     * 회원 주문취소 신청하기
     *  - 주문을 취소신청하는 API입니다
     */
    requestCancel: (
        orderNo: string,
        data: CancelClaimData,
        options?: Options,
    ) => {
        return request.post(`profile/orders/${orderNo}/claims/cancel`, {
            json: data,
            ...options,
        });
    },
};

export default memberClaim;
