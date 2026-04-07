import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import {
    CheckCartValidationResponse,
    DeleteCartParams,
    GetCartCountResponse,
    GetCartListParams,
    GetCartListResponse,
    GetMaximumCouponCartPriceParams,
    GetMaximumCouponCartPriceResponse,
    GetSelectedCartGroupPriceParams,
    GetSelectedCartPriceParams,
    GetSelectedCartPriceResponse,
    RegisterCartData,
    UpdateCartData,
} from '@/models/order/cart';

const cart = {
    /**
     * 장바구니 가져오기
     *  - 로그인된 유저의 장바구니 목록을 조회하기 위한 API 입니다
     */
    getCartList: (
        params: GetCartListParams = {},
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCartListResponse>({
            method: 'GET',
            url: '/cart',
            params,
            ...options,
        });
    },

    /**
     * 장바구니 수정하기
     *  - 로그인된 유저의 장바구니의 상품 중 구매 수량과 사용자 입력형 옵션을 수정하는 API 입니다
     *  - 옵션 종류는 변경할 수 없습니다
     *  - 옵션변경은 변경할 옵션을 삭제한 후 신규등록하는 방법으로 수정합니다
     */
    updateCart: (data: UpdateCartData, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/cart',
            data,
            ...options,
        });
    },

    /**
     * 장바구니 등록하기
     *  - 로그인된 유저의 장바구니에 상품(옵션)을 추가하는 API 입니다
     */
    registerCart: (data: RegisterCartData, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetCartCountResponse>({
            method: 'POST',
            url: '/cart',
            data,
            ...options,
        });
    },

    /**
     * 장바구니 삭제하기
     *  - 장바구니 목록에서 장바구니를 삭제하는 API 입니다
     *  - cartNo를 List형으로 전달해야 합니다
     */
    deleteCart: (params: DeleteCartParams, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'DELETE',
            url: '/cart',
            params,
            ...options,
        });
    },

    /**
     * 장바구니에서 선택된 상품금액 계산하기
     *  - 장바구니에서 선택된 상품만 계산하여 금액만 리턴하는 API 입니다
     *  - 아래 화면예시에서 상품/옵션별 배송비는 업데이트(재계산)하지 못합니다
     *  - cartNo 파라미터 자체를 넘기지 않는 경우 : 장바구니 전체
     *  - cartNo 에 빈 값을 넘기는 경우 : 0원
     */
    getSelectedCartPrice: (
        params: GetSelectedCartPriceParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetSelectedCartPriceResponse>({
            method: 'GET',
            url: '/cart/calculate',
            params,
            ...options,
        });
    },

    /**
     * 장바구니에 담긴 상품 개수 가져오기
     *  - 로그인된 유저의 장바구니에 담긴 상품 개수를 조회하기 위한 API 입니다
     */
    getCartCount: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetCartCountResponse>({
            method: 'GET',
            url: '/cart/count',
            ...options,
        });
    },

    /**
     * 장바구니에서 선택된 상품만 장바구니 그룹별로 재계산하기
     *  - 장바구니에서 선택된 상품만 계산하여 장바구니 상품들과 금액까지 포함해서 리턴하는 API 입니다.
     *  - 아래 화면예시에서 상품/옵션별 배송비를 함께 업데이트(재계산)할 수 있습니다
     *  - cartNo 파라미터 자체를 넘기지 않는 경우 : 장바구니 전체
     *  - cartNo 에 빈 값을 넘기는 경우 : 0원
     */
    getSelectedCartGroupPrice: (
        params: GetSelectedCartGroupPriceParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCartListResponse>({
            method: 'GET',
            url: '/cart/subset',
            params,
            ...options,
        });
    },

    /**
     * 장바구니에 저장된 모든 상품 구매 가능 여부 확인하기
     *  - 장바구니에 저장된 모든 상품의 구매 가능 여부를 확인하는 API 입니다
     */
    checkCartValidation: (options?: AxiosRequestConfig) => {
        return shopbyRequest<CheckCartValidationResponse>({
            method: 'GET',
            url: '/cart/validate',
            ...options,
        });
    },

    /**
     * 장바구니 기준 최대 쿠폰 할인 금액 가져오기
     *  - 장바구니 기준으로 최대 할인이 가능한 쿠폰 정보를 조회합니다
     */
    getMaximumCouponCartPrice: (
        params: GetMaximumCouponCartPriceParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetMaximumCouponCartPriceResponse>({
            method: 'GET',
            url: '/cart/coupons/maximum',
            params,
            ...options,
        });
    },
};

export default cart;
