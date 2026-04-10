export interface LoginRequestBody {
    id: string;
    pwd: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    managerName: string;
    managerId: string;
    managerType: string;
    partnerSno: number;
    managerEmail: string;
    managerTel: string;
    authority: string | null;
}
