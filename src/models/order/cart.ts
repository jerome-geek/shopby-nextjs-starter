import {
    CartPriceInfo,
    DeliveryGroup,
    InvalidProduct,
    OptionInputs,
} from '@/models/order';

export interface GetCartListParams {
    /** 구매하지 못하는 상품 분할여부 */
    divideInvalidProducts?: boolean;
    /** 장바구니 그룹 아이디 */
    groupId?: string;
}

export interface GetCartListResponse {
    /** 배송그룹 */
    deliveryGroups: DeliveryGroup[];
    /** 가격 정보 */
    price: CartPriceInfo;
    /** 유효하지 않은 상품 */
    invalidProducts: InvalidProduct[];
}

/** 장바구니 등록리스트 */
export type RegisterCartData = {
    /** 본상품번호(추가상품이라면 필수 입력) (nullable) */
    baseProductNo?: Nullable<number>;
    /** 장바구니 그룹 아이디 (nullable) */
    groupId?: Nullable<string>;
    /** 구매개수 */
    orderCnt: number;
    /** 구매자 입력형 옵션 */
    optionInputs?: Omit<OptionInputs, 'required'>[];
    /** 옵션번호 */
    optionNo: number;
    /** 상품번호 */
    productNo: number;
}[];

/** 장바구니 수정 리스트 */
export type UpdateCartData = {
    /** 장바구니 그룹 아이디 (nullable) */
    groupId?: Nullable<string>;
    /** 구매개수 */
    orderCnt: number;
    /** 구매자 입력형 옵션 */
    optionInputs?: Omit<OptionInputs, 'required'>[];
    /** 장바구니 번호 */
    cartNo: number;
}[];

export interface GetCartCountResponse {
    /** 회원의 총 Cart 상품수 */
    count: number;
}

export interface DeleteCartParams {
    /** 장바구니 번호 */
    cartNo: number[];
}

export interface GetSelectedCartPriceParams {
    /** 선택된 장바구니 번호 */
    cartNo?: Nullable<number[]>;
    /** 구매하지 못하는 상품 분할여부 */
    divideInvalidProducts?: boolean;
    /** 장바구니 그룹 아이디 */
    groupId?: string;
}

export type GetSelectedCartPriceResponse = CartPriceInfo;

export type GetSelectedCartGroupPriceParams = Omit<
    GetSelectedCartPriceParams,
    'groupId'
>;

export interface CheckCartValidationResponse {
    /** 구매 가능 여부 */
    result: boolean;
}

export interface GetMaximumCouponCartPriceParams {
    /** 장바구니 번호 */
    cartNo: number;
}

export interface GetMaximumCouponCartPriceResponse {
    /** 최적 상품쿠폰 정보 */
    productCoupons: {
        /** 상품쿠폰 할인금액 */
        discountAmt: number;
        /** 상품쿠폰명 */
        productCouponName?: Nullable<string>;
        /** 상품쿠폰 발급번호 */
        productCouponIssueNo?: Nullable<number>;
        /** 상품쿠폰번호 */
        productCouponNo?: Nullable<number>;
        /** 상품번호 */
        mallProductNo: number;
    }[];
    /** 전체 할인 금액 */
    totalDiscountAmt: number;
    /** 최적 장바구니쿠폰 정보 */
    cartCoupons: {
        /** 장바구니쿠폰 할인금액 */
        discountAmt: number;
        /** 장바구니쿠폰 발급번호 */
        cartCouponIssueNo?: Nullable<number>;
        /** 장바구니쿠폰명 */
        cartCouponName?: Nullable<string>;
        /** 장바구니쿠폰 번호 */
        cartCouponNo?: Nullable<number>;
    }[];
}
