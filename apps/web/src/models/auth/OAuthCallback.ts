import type { ClientPlatformType, NcpOpenIdProviderType } from '@/models';

export interface OpenLoginPageParams {
    /** 클라이언트 아이디 */
    clientId: string;
    /** OAuth2 프로바이더 */
    provider: NcpOpenIdProviderType;
    /** 로그인 성공 이후 로드할 페이지 주소 (callback URL) */
    nextUrl?: string;
    /** 클라이언트 플랫폼(PC, MOBILE_WEB, AOS, IOS) */
    platform: ClientPlatformType;
    /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰 */
    state?: string;
}

export interface IssueOpenIdAccessTokenParams {
    /** 클라이언트 아이디 */
    clientId: string;
    /** OAuth2 프로바이더 */
    provider: NcpOpenIdProviderType;
    /** 인증 코드 */
    code: string;
    /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰 */
    state?: string;
    /** 로그인 성공 이후 로드할 페이지 주소 (callback URL) */
    nextUrl: string;
}

export interface GetOpenIdListResponse {
    providers: {
        /** SNS 연동 구분 값 */
        memberProviderNo: number;
        /** 연동 수정 날짜 */
        updatedYmdt: string;
        /** SNS 연동 해제 여부 */
        deleteYn: boolean;
        /** 연동 SNS 유형 */
        providerType: string;
        /** 최초 연동 날짜 */
        registerYmdt: string;
    }[];
}
