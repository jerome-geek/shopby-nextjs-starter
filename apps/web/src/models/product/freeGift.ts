import { FreeGiftOptionCountType, LimitedMemberType } from '@/models';

export interface GetFreeGiftConditionByOrderAmountParams {
    /** 주문금액 */
    orderAmt?: number;
}

export interface FreeGiftCondition {
    /** 제한멤버 유형 (전체 : ALL, 비회원 불가: MEMBER, 회원등급/그룹 : TARGET) */
    limitedMemberType: LimitedMemberType;
    /** 지급옵션수량 - 선택 지급일 경우 필수 */
    freeGiftOptionCount: number;
    /** 시작일 */
    giveStartDateTime: string;
    freeGifts: {
        /** 대표이미지 */
        imageUrl: string;
        /** 옵션값 */
        optionValue: string;
        /** 옵션명 */
        optionName: string;
        /** 사은품 옵션번호 */
        optionNo: number;
        /** 상품 이름 */
        productName: string;
        /** 사은품 상품번호 */
        productNo: number;
    }[];
    /** 지급조건설명 */
    giveConditionExplain: string;
    /** TARGET에 해당하는 멤버그룹/등급 */
    limitedMember: {
        /** TARGET에 해당하는 맴버등급 */
        memberGrade: number[];
        /** TARGET에 해당하는 맴버그룹 */
        memberGroup: number[];
    };
    /** 제한금액 */
    upperPrice: number;
    /** 종료일 */
    giveEndDateTime: string;
    /** 지급조건번호 */
    giveConditionNo: number;
    /** 지급옵션수량 타입 - (ALL: 전체지급, SELECT: 선택지급) */
    freeGiftOptionCountType: FreeGiftOptionCountType;
    /** 지급조건이름 */
    giveConditionName: string;
}
export interface GetFreeGiftConditionByOrderAmountResponse {
    /** 사은품 지급 조건 리스트 */
    freeGiftConditions: FreeGiftCondition[];
    /** 전체 사은품지급조건 수 */
    totalCount: number;
}

export interface GetFreeGiftConditionResponse {
    /** 사은품 지급 조건 리스트 */
    freeGiftConditions: FreeGiftCondition[];
    /** 전체 사은품지급조건 수 */
    totalCount: number;
}
