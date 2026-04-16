import type { ExtraInfoType, MemberJoinConfigType } from '@/models';

export interface GetMemberExtraInfoResponse {
    /** 회원정보 추가항목 목록 */
    extraInfoContents: {
        /** 항목 번호 */
        extraInfoNo: number;
        /** 항목 명 */
        extraInfoName: string;
        /** 항목 타입 */
        extraInfoType: ExtraInfoType;
        /** 옵션 목록 */
        extraInfoOptions: {
            /** 옵션 명 */
            extraInfoOptionName: string;
            /** 옵션 번호 */
            extraInfoOptionNo: number;
        }[];
        /** 사용 상태 */
        status: MemberJoinConfigType;
    }[];
}
