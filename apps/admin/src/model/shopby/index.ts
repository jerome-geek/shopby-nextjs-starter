export interface ServerApiByPassParams {
    url: string;
    param: object;
    version: string;
}

export interface MemberListResponse {
    totalCount: number | null;
    lastId: string;
    contents: {
        memberId: string;
        memberName: string;
        memberNo: number;
    }[];
}
