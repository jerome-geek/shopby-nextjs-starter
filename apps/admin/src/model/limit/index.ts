export interface CreationLimitResponse {
    dailyLimit: number;
    monthlyLimit: number;
}

export interface UpdateCreationLimitBody {
    dailyLimit: number;
    monthlyLimit: number;
}

export interface Exception {
    memberNo: number;
    memberId?: string;
    memberName?: string;
    memo: string;
}

export type ExceptionsResponse = Exception[];

export interface CreateExceptionBody {
    memberNo: number;
    memberId?: string;
    memberName?: string;
    memo?: string;
}
