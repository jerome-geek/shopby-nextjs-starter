import type {
    AccumulationReasonType,
    AccumulationReserveReasonType,
    AccumulationStatusGroupType,
    AccumulationStatusType,
    OrderDirectionType,
} from '@/models';

export interface AccumulationInfo {
    /** 만료일 */
    expireYmdt: string;
    /** 주문번호 */
    orderNo: string;
    /** 적립금 번호 */
    accumulationNo: number;
    /** 맵핑 키(외부 적립금 사용 시에만 사용함) */
    mappingKey: string;
    /** 잔여 적립금 */
    accumulationRestAmt: number;
    /** 적립사유 코드 */
    accumulationReserveReason: AccumulationReserveReasonType;
    /** 적립사유 코드 표시명 */
    accumulationReserveReasonDisplay: string;
    /** 시작일 */
    startYmdt: string;
    /** 적립사유 상세 */
    reasonDetail: string;
    /** 적립금 총액 */
    totalAvailableAmt: number;
    /** 적립 지급/차감 구분 코드 */
    accumulationStatusGroupType: AccumulationStatusGroupType;
    /** 적립금액 */
    accumulationAmt: number;
    /** 적립상태 코드 */
    accumulationStatus: AccumulationStatusType;
    /** 등록일 */
    registerYmdt: string;
}

export interface GetAccumulationsParams extends Paging, SearchDate {
    /** 적립 유형(ADD: 지급, SUB: 차감) */
    accumulationReason?: AccumulationReasonType;
    /** 정렬방식(DESC:내림차순(default), ASC:오름차순) */
    direction?: OrderDirectionType;
}

export interface GetAccumulationsResponse extends ItemList<AccumulationInfo> {
    /** 회원 번호 */
    memberNo: number;
    /** 적립 총액 */
    totalAmt: number;
}

export type GetExpirationAccumulationListParams = SearchDateTime;

export interface GetExpirationAccumulationListResponse {
    expirations: {
        /** 만료 예정 적립금 적립 사유 */
        accumulationReserveReasonDisplay: string;
        /** 만료 예정 금액 */
        amount: number;
        /** 만료 예정 적립금 적립 상세 사유 */
        reasonDetail: string;
        /** 만료 예정 적립금 번호 */
        accumulationNo: number;
        /** 만료 예정 적립금 만료일 */
        expirationYmdt: string;
    }[];
    /** 만료조회 총 적립금액 */
    expiresAmount: number;
}

export interface GetAccumulationSummaryParams {
    /** 만료 조회 시작일(YYYY-MM-DD HH:mm:ss, default: 한달) */
    expireStartYmdt: string;
    /** 만료 조회 종료일(YYYY-MM-DD HH:mm:ss, default: 한달) */
    expireEndYmdt: string;
}

export interface GetAccumulationSummaryResponse {
    /** 사용가능한 총 적립금액 */
    totalAvailableAmt: number;
    /** 만료조회 총 적립금액 */
    totalExpireAmt: number;
}

export interface GetExpectAccumulationResponse {
    /** 총 적립예상금액 */
    waitingAccumulation: number;
}
