import {
    CouponSubType,
    CouponTargetType,
    CouponType,
    PayType,
    PlatformType,
} from '@/models';

export interface Coupon {
    /** 쿠폰 생성 사유 */
    reason: string;
    /** 할인율 */
    discountRate: number;
    /** 할인금액 */
    discountAmt: number;
    /** 쿠폰 명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 적립금 단위 */
    accumulationUnit: string;
    /** 최소판매금액기준 */
    minSalePrice: number;
    /** 배송비무료여부 */
    freeDelivery: boolean;
    /** 최대할인금액(정률에서) */
    maxDiscountAmt: number;
    /** 사용여부 (true: 사용함 / false: 사용하지 않음) */
    used: boolean;
    /** 사용종료일 */
    useEndYmdt: string;
    /** 장바구니 쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) */
    cartCouponUsable: boolean;
    /** 혜택 금액 */
    benefitAmt: number;
    /** 쿠폰 유형 */
    couponType: CouponType;
    /** 상품쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) */
    productCouponUsable: boolean;
    /** 발급일 */
    issueYmdt: string;
    /** 정액 여부 (true: 정액 / false: 정률) */
    fixedAmt: boolean;
    /** 사용가능 결제수단 리스트 */
    limitPayTypes: PayType[];
    /** 사용가능 결제수단 */
    limitPayType: PayType;
    /** 사용일시 */
    useYmdt: string;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 할인쿠폰 대상 타입 */
    couponTargetType: CouponTargetType;
    /** 적립금 적립 불가 여부 (true: 적립 불가능 / false: 적립 가능) */
    skipsAccumulation: boolean;
    /** @deprecated(더 이상 제공하지 않는 개체항목입니다) 선택된 쿠폰 외 다른 쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) */
    otherCouponUsable?: boolean;
    /** 사용가능 플랫폼 */
    usablePlatforms: Omit<PlatformType, 'RESPONSIVE'>[];
    /** 배송비쿠폰일경우 최소 배송비 */
    minDeliveryAmt: number;
    /** 최대판매금액기준 */
    maxSalePrice: number;
    /** @deprecated(더 이상 제공하지 않는 개체항목입니다) 정액 여부 (true: 정액 / false: 정률) */
    fiexdAmt: boolean;
    /** 쿠폰 하위 타입 */
    couponSubType: CouponSubType;
    /** 사용 가능 회원 등급 */
    memberGradeNames: Nullable<string[]>;
    /** 사용 가능 회원 그룹 */
    memberGroupNames: Nullable<string[]>;
}

/** 할인정보 */
export interface DiscountInfo {
    /** 쿠폰 할인율 */
    discountRate: number;
    /** 쿠폰 할인액 */
    discountAmt: number;
    /** 타 쿠폰과 함께 사용가능 여부 (true: 사용 가능 / false: 사용 불가능) */
    useOtherCoupon: boolean;
    /** 적립급 지급 불가 여부 (true: 지급 가능 / false: 지급 불가능) */
    skippedAccumulationAmt: boolean;
    /** 상품 쿠폰 사용가능 여부 (true: 사용 가능 / false: 사용 불가능) */
    useProductCoupon: boolean;
    /** 배송비 무료 여부(배송비쿠폰인경우) (true: 무료 / false: 유료) */
    freeDelivery: boolean;
    /** 최대 할인액 */
    maxDiscountAmt: number;
    /** 장바구니 쿠폰 사용가능 여부 (true: 사용 가능 / false: 사용 불가능) */
    useCartCoupon: boolean;
    /** 정액여부 (true: 정액 / false: 정률 ) */
    fixedAmt: boolean;
}

/** 사용제약조건 */
export interface UseConstraint {
    /** 쿠폰 사용가능 결제수단 */
    limitPayType: PayType;
    /** 사용가능 기간 - 쿠폰을 발급받은 날부터 (31은 월말까지, -1은 제한없음) */
    useDays: number;
    /** 쿠폰 사용조건 최소 구매액 */
    minSalePrice: number;
    /** 사용 사용종료 일 */
    useEndYmdt: string;
    /** 사용가능플랫폼 */
    usablePlatformTypes: Omit<PlatformType, 'RESPONSIVE'>[];
    /** 쿠폰 사용조건 최소 배송비 */
    minDeliveryAmt: number;
    /** 쿠폰 사용가능 결제수단 리스트 */
    limitPayTypes: PayType[];
    /** 쿠폰 사용조건 최대 구매액 */
    maxSalePrice: number;
}

/** 발급제약조건 */
export interface IssueConstraint {
    /** 1일내 발급 제한 수량 */
    dailyIssueLimitCnt: number;
    /** 1인당 발급 제한 수량(총기간) */
    issuePerPersonLimitCnt: number;
    /** 발급대상 회원 등급 */
    memberGradeName: string;
    /** 발행가능 플랫폼 */
    issuablePlatformTypes: PlatformType[];
    /** 발급대상 회원 등급 json */
    memberGradeNames: string[];
    /** 발급/사용 채널 */
    channelTypes: string;
    /** 1일내 발급 제한 수량 (true: 제한 있음 / false: 제한 없음) */
    dailyIssuePerPersonLimitCnt: number;
    /** 1일내 발급 수량 제한 여부 (true: 제한 있음 / false: 제한 없음) */
    dailyIssueLimit: boolean;
    /** 1인당 발급 수량 제한 여부(true: 제한 있음 / false: 제한 없음) */
    issuePerPersonLimit: boolean;
    /** 발급대상 회원 그룹 json */
    memberGroupNames: string[];
}

/** 쿠폰발급상태 */
export interface CouponStatus {
    /** 내가 발급 받은 개수 */
    myIssuedCnt: number;
    /** 총 발행수량 */
    totalIssuedCnt: number;
    /** 쿠폰 발행가능 수량 */
    totalIssuableCnt: number;
    /** 발급가능수량 */
    issuableCnt: number;
    /** 내가 발급 받은 개수(오늘) */
    myIssuedCntToday: number;
    /** 총 발행수량(오늘)
     * - 1일 발급 제한이 있는 쿠폰만 해당 값 내려줍니다.
     */
    totalIssuedCntToday: number;
}

/** 발급시간정보 */
export interface DateInfo {
    /** 발급 제한 일 */
    issueEndYmdt: string;
    /** 발급 시작 일 */
    issueStartYmdt: string;
    /** 발급가능요일 */
    issueDaysOfWeek: string;
    /** 발급 종료 시간 */
    issueEndHour: number;
    /** 발급 시작 시간 */
    issueStartHour: number;
}

/** 발급 실패 쿠폰 목록 */
export interface IssueFailCoupon {
    /** 에러코드 */
    errorCode: string;
    /** 쿠폰번호 */
    couponNo: number;
    /** 실패 메세지 */
    failMessage: string;
}

/** 발급된 쿠폰목록 */
export interface IssuedCoupon {
    /** 쿠폰 명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 사용종료일 */
    useEndYmdt: string;
}
