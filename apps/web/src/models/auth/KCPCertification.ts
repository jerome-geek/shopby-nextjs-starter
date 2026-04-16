import type { LocalCode, SexCode } from '@/models';

export interface AuthenticateAdultParams {
    /** 본인인증 키 */
    key: string;
}

export interface AuthenticateAdultResponse {
    /** 생년월일 */
    birthday: string;
    /** 성인인증 완료 여부 */
    verified: boolean;
    /** 성인인증 일시 (nullable) */
    verifiedDateTime: Nullable<string>;
}

export interface GetKCPFormParams {
    /** 본인인증 완료 후 호출할 클라이언트 페이지 */
    returnUrl: string;
    /** 내국인 여부 (true : 내국인, false : 외국인 , null : 내국인 전용 QR 신청 본인인증) */
    domestic?: boolean;
}

export type GetKCPFormResponse = string;

export interface GetKCPCertificationResultParams {
    /** 본인인증 키 */
    key: string;
}

export interface GetKCPCertificationResultResponse {
    /** 생년월일 */
    birthday: string;
    /** 성별 코드  */
    sexCode: SexCode;
    /** DI (사용하지 않음)) */
    di: string;
    /** 휴대폰번호 */
    phone: string;
    /** CI */
    ci: string;
    /** 이름 */
    name: string;
    /** 통신사 코드 */
    commId: string;
    /** 내/외국인 코드 */
    localCode: LocalCode;
}
