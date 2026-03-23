import { EstimatedRefundPriceData } from '@/models/claim';
import { GetClaimListParams } from '@/models/claim/member';

const claimsKeys = {
    all: ['claims'] as const,
    /** 클레임 리스트 조회 */
    lists: () => [...claimsKeys.all, 'list'] as const,
    list: (memberNo: number, searchParams: GetClaimListParams) =>
        [...claimsKeys.lists(), memberNo, searchParams] as const,

    /** 클레임 리스트 조회 (무한스크롤)) */
    infiniteList: (memberNo: number, searchParams: GetClaimListParams) =>
        [...claimsKeys.lists(), 'infinite', memberNo, searchParams] as const,

    /** 클레임 상세 조회 */
    details: () => [...claimsKeys.all, 'detail'] as const,
    detail: (claimNo: string, memberNo?: number) =>
        [...claimsKeys.details(), claimNo, memberNo] as const,

    /** 클레임 옵션 예상 환불 금액 조회 */
    estimates: () => ['estimate'] as const,
    estimate: (
        orderOptionNo: string,
        searchParams: Omit<EstimatedRefundPriceData, 'claimedProductOptions'>,
    ) => [...claimsKeys.estimates(), orderOptionNo, searchParams] as const,

    /** 게스트 클레임 상세 조회 */
    guestDetails: () => [...claimsKeys.all, 'guestDetail'] as const,
    guestDetail: (claimNo: string) =>
        [...claimsKeys.details(), claimNo] as const,

    /** 게스트 클레임 옵션 예상 환불 금액 조회 */
    guestEstimates: () => ['guestEstimate'] as const,
    guestEstimate: (
        orderOptionNo: string,
        searchParams: Omit<EstimatedRefundPriceData, 'claimedProductOptions'>,
    ) => [...claimsKeys.guestEstimates(), orderOptionNo, searchParams] as const,
};

export default claimsKeys;
