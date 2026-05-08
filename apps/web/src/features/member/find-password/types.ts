export type FindPasswordStep = 'IDLE' | 'SENT' | 'VERIFIED';

export type FindPasswordMethod = 'EMAIL' | 'SMS';

export interface IssuedInfo {
    memberId: string;
    memberNo: number;
}

export interface VerifiedInfo {
    memberId: string;
    memberNo: number;
    findMethod: FindPasswordMethod;
    certificatedNumber: string;
    key: string;
}
