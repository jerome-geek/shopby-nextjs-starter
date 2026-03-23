export interface GetMemberGroupParams {
    /** 회원 그룹 번호 리스트 (미 입력 시 쇼핑몰에 등록된 모든 그룹 정보를 조회합니다.) (Example : 1,2,3) */
    groupNos: number[];
}

export interface MemberGroupInfo {
    /** 그룹번호 */
    no: number;
    /** 그룹명 */
    name: string;
    /** 그룹 설명 */
    description: string;
    /** 적립금 혜택 */
    reserveBenefit: {
        /** 적립금 혜택 적립률 */
        reserveRate: number;
        /** 적립금 혜택 사용여부 */
        used: boolean;
    };
}

export interface GetMemberGroupResponse extends Array<MemberGroupInfo> {}
