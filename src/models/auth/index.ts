import { AuthType, CertificatedUsage } from '@/models';

export interface CertificatedNumber {
    type: AuthType;
    usage: CertificatedUsage;
    certificatedNumber: string;
    memberNo?: number;
    notiAccount?: string;
    memberName?: string;
}

export interface CertificatedNumberViaEmail<T> {
    usage: T;
    email: string;
    certificatedNumber: string;
    memberName: string;
    uri: string;
}

export interface CertificatedNumberViaSMS<T> {
    usage: T;
    mobileNo: string;
    key: string;
    memberName: string;
}

export interface AccessTokenBody {
    memberId: string;
    password: string;
    keepLogin: boolean;
    captcha?: string;
    provider?: string;
}
