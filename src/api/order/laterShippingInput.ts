import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import { OrderDetailResponse } from '@/models/order';
import {
    GetAreaFeesParams,
    GetAreaFeesResponse,
    GetLaterOrderDetailParams,
    GetShippingsParams,
    GetShippingsResponse,
    UpdateShippingData,
} from '@/models/order/laterShippingInput';

const laterShippingInput = {
    /**
     * [샵바이 엔터프라이즈 전용] 지역별 추가 배송비 목록 조회하기 (배송비템플릿 번호 또는 암호화된 배송 번호 리스트 사용)
     *  - 배송비템플릿 번호 또는 암호화된 배송번호 리스트로 지역별 추가 배송비 목록을 조회하는 API 입니다. (두 필드 중 하나만 입력해야 합니다.)
     *  - 암호화 된 배송 번호 리스트(encryptedShippingNo): 선물하는 시점에 동일한 수령자 연락처를 입력한 배송번호 목록
     *  - 배송번호 리스트 중 1개 이상의 배송에 추가 배송비를 부과하는 주소가 응답됩니다.
     */
    getAreaFees: (params: GetAreaFeesParams, options?: Options) => {
        return request.get<GetAreaFeesResponse>('later-input/areafees', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },
    /**
     * [샵바이 엔터프라이즈 전용] 나중배송입력 주문 상세 조회하기
     *  - 암호화된 배송 번호 리스트로 주문 상세정보를 조회하는 API 입니다.
     *  - 암호화 된 배송 번호 리스트(encryptedShippingNo): 선물하는 시점에 동일한 수령자 연락처를 입력한 배송번호 목록
     */
    getOrderDetail: (params: GetLaterOrderDetailParams, options?: Options) => {
        return request.get<OrderDetailResponse>('later-input/order', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * [샵바이 엔터프라이즈 전용] 나중 입력 배송지 조회하기
     *  - 나중에 입력된 배송지를 조회하는 API 입니다.
     *  - 암호화 된 배송 번호 리스트(encryptedShippingNo): 선물하는 시점에 동일한 수령자 연락처를 입력한 배송번호 목록
     */
    getShippings: (params: GetShippingsParams, options?: Options) => {
        return request.get<GetShippingsResponse>('later-input/shippings', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /** [샵바이 엔터프라이즈 전용] 나중 입력 배송지 정보 수정하기
     *  - 나중에 입력된 배송지 정보를 수정하는 API 입니다.
     *  - 암호화 된 배송 번호 리스트(encryptedShippingNo): 선물하는 시점에 동일한 수령자 연락처를 입력한 배송번호
     *  - 암호화된 배송 번호 리스트(encryptedShippingNo)에 해당하는 모든 배송지를 수정합니다.
     */
    updateShippings: (data: UpdateShippingData, options?: Options) => {
        return request.put('later-input/shippings', {
            json: data,
            ...options,
        });
    },
};

export default laterShippingInput;
