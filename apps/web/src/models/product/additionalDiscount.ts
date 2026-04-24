import type { MemberTargetType } from '@/models';

export interface GetAdditionalDiscountParams {
    /** 상품번호 */
    productNo: number;
}

export interface GetAdditionalDiscountResponse {
    /** 할인율 (수량할인 사용시 수량1개 기준 정보) (nullable) */
    discountRate: Nullable<number>;
    /** 추가 할인 번호 */
    discountNo: number;
    /** 최소 기준 금액 (nullable) */
    minSalePrice: Nullable<number>;
    /** 할인액 (수량할인 사용시 수량1개 기준 정보) (nullable) */
    discountAmount: Nullable<number>;
    /** 추가 할인 종료일 */
    endDateTime: string;
    /** 구매수량할인 사용여부 */
    isQuantityDiscount: boolean;
    /** 최대 기준 금액 (nullable) */
    maxSalePrice: Nullable<number>;
    /** 추가 할인명 */
    discountName: string;
    /** 추가 할인 시작일 */
    startDateTime: string;
    /** 고객등급별할인 사용여부 */
    isMemberDiscount: boolean;
    /** 최대 할인 금액 (수량할인 사용시 수량1개 기준 정보) (nullable) */
    maxDiscountAmount: Nullable<number>;
    /** 정액 할인 여부 (수량할인 사용시 수량1개 기준 정보) */
    isFixedDiscount: boolean;
    /** 구매수량할인 설정 정보 */
    quantityDiscountInfos: {
        /** 순서 */
        sortNo: number;
        /** 정액: null, 정률: 할인율 (nullable) */
        discountRate: Nullable<number>;
        /** 최소구매수량 */
        minQuantity: number;
        /** 최대구매수량 (nullable) */
        maxQuantity: Nullable<number>;
        /** 정률 시 최대 할인금액 (nullable) */
        maxDiscountAmount: Nullable<number>;
        /** true:정액, false:정률 */
        isFixedDiscount: boolean;
        /** 정액: 할인 금액, 정률: null (nullable) */
        discountAmount: Nullable<number>;
    }[];
    /** 고객등급별할인 설정 정보 */
    memberDiscountInfos: {
        /** 순서 */
        sortNo: number;
        /** 정액: null, 정률: 할인율 */
        discountRate: number;
        /** 타겟회원등급타입 */
        memberGradeTargetType: MemberTargetType;
        /** 타겟회원등급 */
        memberGradeNos: (boolean | string | number)[];
        /** 타겟회원그룹 */
        memberGroupNos: (boolean | string | number)[];
        /** 정률 시 최대 할인금액 */
        maxDiscountAmount: number;
        /** true:정액, false:정률 */
        isFixedDiscount: boolean;
        /** 타겟회원그룹타입 Enum */
        memberGroupTargetType: string;
        /** 정액: 할인 금액, 정률: null */
        discountAmount: MemberTargetType;
    }[];
}

export interface GetAdditionalDiscountByProductNosParams {
    /** 상품번호 */
    productNos: number[];
}

export interface AdditionalDiscountWithProductNo extends GetAdditionalDiscountResponse {
    productNo: number;
}

export interface GetAdditionalDiscountByProductNosResponse {
    data: AdditionalDiscountWithProductNo[];
}
