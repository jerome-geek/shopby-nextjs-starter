import type { SupplyType } from '@/models';

export interface GetMemberGradeParams {
    /** 회원 등급 번호 리스트 (미 입력 시 쇼핑몰에 등록된 모든 그룹 정보를 조회합니다.) (Example : 1,2,3) */
    gradeNos: number[];
}

export interface MemberGradeInfo {
    /** 등급 이미지 URL */
    memberGradeImageUrl?: string;
    /** 등급번호 */
    no: number;
    /** 적립금 자동지급 */
    reserveAutoSupplying: {
        /** 적립금 자동지급 적립금액 */
        amount: number;
        /** 적립금 자동지급 사용여부 */
        used: boolean;
        /** 적립금 자동지급 유형 (NONE, ONCE, MONTHLY) */
        type: SupplyType;
    };
    /** 회원 등급 평가 조건 */
    evaluationCondition: {
        /** 최소 구매 금액 */
        minimumPayment: number;
        /** 최소 구매 횟수 */
        minimumCount: number;
    };
    /** 등급 평가 면제 여부 */
    isEvaluationExempt: boolean;
    /** 등급 설명 */
    description: string;
    /** 등급명 */
    label: string;
    /** 쿠폰 자동지금 */
    couponAutoSupplying: {
        /** 쿠폰 자동지급 사용 여부 */
        used: boolean;
        /** 사용안함: NONE, 1회지급: ONCE, 매월지급: MONTHLY */
        type: SupplyType;
    };
    /** 적립금 혜택 */
    reserveBenefit: {
        /** 적립금 혜택 적립률 */
        reserveRate: number;
        /** 적립금 혜택 사용여부 */
        used: boolean;
    };
}

export interface GetMemberGradeResponse extends Array<MemberGradeInfo> {}
