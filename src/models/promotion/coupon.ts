import {
    ChannelType,
    CouponSubType,
    CouponTargetType,
    CouponType,
    SearchDateType,
} from '@/models';
import {
    Coupon,
    CouponStatus,
    DateInfo,
    DiscountInfo,
    IssueConstraint,
    IssuedCoupon,
    IssueFailCoupon,
    UseConstraint,
} from '@/models/promotion';

export interface GetUserCouponsParams
    extends Omit<Paging, 'hasTotalCount'>,
        Partial<SearchDate> {
    /** 쿠폰 번호 */
    couponNos?: number[];
    /** 내림차순 정렬 여부 */
    desc?: boolean;
    /** 검색 종료 일 (지정 하지 않을 시 오늘 날짜까지 조회) */
    endYmd?: string;
    /** 기간 검색타입 (REGISTER_YMD: 등록일(default), USE_END_YMD: 사용 종료일) */
    searchDateType?: SearchDateType;
    /** 검색 시작 일 (지정 하지 않을 시 3개월 전 오늘 날짜부터 조회) */
    startYmd?: string;
    /** 사용가능 여부 (true: 사용 가능 / false: 사용 불가능 / null: 조건 없음) */
    usable?: boolean;
}

export interface GetUserCouponsResponse {
    items: Coupon[];
    totalCount: number;
}

export interface IssueCouponsData {
    channelType: ChannelType;
    couponNos: number[];
}

export interface BenefitInfo {
    /** 혜택 만료일자 yyyy-MM-dd HH:mm:ss */
    benefitEndYmdt: string;
    /** 혜택 지급 시점으로부터 혜택 만료일^|3 */
    benefitExpirationDays: number;
    /** 혜택 금액 */
    benefitAmt: number;
}

export interface IssuableCoupon {
    /** 다운로드 가능여부 (true: 다운로드 가능 / false: 다운로드 불가능) */
    downloadable: boolean;
    /** 쿠폰 이름 */
    couponName: string;
    /** 할인정보 */
    discountInfo: DiscountInfo;
    /** 쿠폰 하위 타입 */
    couponSubType: CouponSubType;
    /** 사용제약조건 */
    useConstraint: UseConstraint;
    /** 발급제약조건 */
    issueConstraint: IssueConstraint;
    /** 쿠폰 종류 */
    couponType: CouponType;
    /** 쿠폰발급상태 */
    couponStatus: CouponStatus;
    /** 발급시간정보 */
    dateInfo: DateInfo;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 쿠폰 대상 종류 */
    couponTargetType: CouponTargetType;
    /** 기프트 쿠폰 혜택정보 */
    benefitInfo: BenefitInfo;
    /** @deprecated(더 이상 제공하지 않는 개체항목입니다) 제휴 방문처 타입 */
    allianceRefererType: string;
}

export interface GetIssuableCouponResponse extends Array<IssuableCoupon> {}

export interface GetCouponSummaryParams {
    /** 만료일 - (현재 + 만료일)이 검색 조건에 포함됩니다. */
    expireDay?: number;
}

export interface GetCouponSummaryResponse {
    /** 사용/기간만료 쿠폰 개수 */
    expiringCouponCnt: number;
    /** 사용가능 쿠폰 개수 */
    usableCouponCnt: number;
}

export interface IssueCouponByPromotionCodeResponse {
    /** 쿠폰 명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 사용종료일 */
    useEndYmdt: string;
}

export interface IssueCouponData {
    /** 외부 채널 타입 */
    channelType: ChannelType;
}

export interface IssueCouponResponse {
    /** 쿠폰 명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 사용종료일 */
    useEndYmdt: string;
}

export interface GetCouponTargetsParams
    extends Pick<Paging, 'pageNumber' | 'pageSize'> {}

export interface GetCouponTargetsResponse {
    /** 총 대상 개수 */
    totalCount: number;
    /** 대상 내역 */
    items: {
        /** 대상 이름 */
        targetName: string;
        /** 대상 타입 */
        targetType: CouponTargetType;
        /** 대상 번호 */
        targetNo: number;
    }[];
}

export interface IssueCouponsResponse {
    /** 발급 실패 쿠폰 목록 */
    issueFailCoupons: IssueFailCoupon[];
    /** 발급된 쿠폰목록 */
    issuedCoupons: IssuedCoupon[];
}

export interface IssueProductCouponsData {
    /** 외부 채널 타입 */
    channelType: ChannelType;
}

export type IssueProductCouponsResponse = IssueCouponsResponse;

export interface GetIssuableCouponsByTargetParams {
    /** 외부 채널 타입 */
    channelType: ChannelType;
    /** 쿠폰 할인 대상 */
    couponTargetType:
        | 'BRAND' // 브랜드
        | 'CATEGORY' // 카테고리
        | 'PARTNER'; // 파트너사
    targetNo: string;
    targetNos: string[];
}

export interface GetIssuableCouponsByProductNoParams {
    /** 외부 채널 타입 */
    channelType: ChannelType;
}

export type GetIssuableCouponsByProductNoResponse = IssuableCoupon[];
