export interface CreationLimitResponse {
    dailyLimit: number;
    monthlyLimit: number;
}

export interface UpdateCreationLimitBody {
    dailyLimit: number;
    monthlyLimit: number;
}
