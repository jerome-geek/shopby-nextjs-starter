import {
    CertificationUsage,
    ClientPlatformType,
    NcpOpenIdProviderType,
    ReplyType,
} from '@/models';

export interface CheckCertificatedNumberParams {
    /** 인증 타입 (SMS: SMS 인증, EMAIL: 이메일 인증) */
    type: ReplyType;
    /** 사용 용도 */
    usage: Exclude<CertificationUsage, 'JOIN_URI'>;
    /** 인증번호 */
    certificatedNumber: string;
    /** 회원 번호 */
    memberNo?: number;
    /** 이메일 주소 | 휴대폰 번호 */
    notiAccount?: string;
}

export interface SendCertificatedNumberData {
    /** 이메일주소 혹은 휴대전화 번호 (nullable) */
    notiAccount?: string;
    /** 회원번호 - 회원 번호로 인증번호를 보낼 경우 필수 (nullable) */
    memberNo?: number;
    /** 사용 용도 */
    usage: Exclude<
        CertificationUsage,
        'CHANGE_ID' | 'CHANGE_EMAIL' | 'JOIN_URI'
    >;
    /** 회원 이름 (nullable) */
    memberName?: string;
    /** 인증 타입 (SMS: SMS 인증, EMAIL: 이메일 인증) */
    type: 'SMS' | 'EMAIL';
}

export interface SendCertificatedNumberResponse {
    /** 인증번호 만료까지 남은 시간 (초) */
    remainTime: number;
}

export interface CheckBizmallData {
    /** 회사 번호 */
    companyNo: number;
    /** 임직원 이름 */
    name: string;
    /** 임직원 사번 */
    idNo: string;
}

export interface CheckBizmallResponse {
    /** 가입 가능 여부 */
    success: boolean;
}

export interface CheckCertificatedNumberViaEmailParams {
    /** 사용 용도 */
    usage: Exclude<
        CertificationUsage,
        'JOIN' | 'CHANGE_ID' | 'CHANGE_EMAIL' | 'CHANGE_MOBILE_NO'
    >;
    /** 이메일 주소 */
    email: string;
    /** 인증 번호 */
    certificatedNumber: string;
}

export interface CheckCertificatedNumberViaEmailResponse {
    /** 성공 여부 */
    result: boolean;
}

export interface SendCertificatedNumberViaEmailData {
    /** 사용 용도 */
    usage: Exclude<
        CertificationUsage,
        'CHANGE_ID' | 'CHANGE_EMAIL' | 'JOIN_URI'
    >;
    /** 회원 이름(JOIN_URI: 가입인증이 아닌 경우 필수)(nullable) */
    memberName: string;
    /** 인증번호를 전달할 쇼핑몰 URI(nullable) */
    uri?: string;
    /** 이메일 주소 */
    email: string;
}

export interface SendCertificatedNumberViaEmailResponse {
    /** 인증번호 만료까지 남은 시간 (초) */
    remainTime: number;
}

export interface CheckCertificatedNumberViaSMSParams {
    /** 사용 용도 */
    usage: Exclude<
        CertificationUsage,
        'CHANGE_ID' | 'CHANGE_EMAIL' | 'JOIN_URI'
    >;
    /** 휴대전화 번호 */
    mobileNo: string;
    /** 인증 번호 */
    key: string;
}

export interface CheckCertificatedNumberViaSMSResponse {
    /** 성공 여부 */
    result: boolean;
}

export interface SendCertificatedNumberViaSMSData {
    /** 사용 용도 */
    usage: Exclude<
        CertificationUsage,
        'CHANGE_ID' | 'CHANGE_EMAIL' | 'JOIN_URI'
    >;
    /** 회원 이름 */
    memberName: string;
    /** 휴대전화 번호 */
    mobileNo: string;
}

export interface SendCertificatedNumberViaSMSResponse {
    /** 인증번호 만료까지 남은 시간 (초) */
    remainTime: number;
}

export interface GetOpenIdLoginUrlParams {
    /** 간편 로그인 제공사 */
    provider: NcpOpenIdProviderType;
    /** redirect URL */
    redirectUri: string;
    /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰 */
    state?: string;
    /** 간편 로그인 */
    reauthenticate?: boolean;
}

export interface GetOpenIdLoginUrlResponse {
    /** 간편 로그인 URL */
    loginUrl: string;
}

export interface IssueOpenIdAccessTokenData {
    /** 개발자센터에 등록된 redirect URI (nullable) */
    redirectUri?: Nullable<string>;
    /** IdP(Identity Provider, 아이디 제공자)로부터 받은 인증코드(authorization code) - 간편 로그인 사용시 필수 (nullable) */
    code?: Nullable<string>;
    /** 간편 로그인 제공사 */
    provider?: NcpOpenIdProviderType | 'my-app';
    /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰 (nullable) */
    state?: Nullable<string>;
    /** 자동로그인 여부(true로 요청하면 유효 기간이 90일인 토큰이 생성) */
    keepLogin?: boolean;
    /** IdP(Identity Provider, 아이디 제공자) 엑세스 토큰 - 연동형 IdP(Identity Provider, 아이디 제공자) 사용시 필수 (nullable) */
    openAccessToken?: string;
}

export interface IssueOpenIdAccessTokenParams {
    /** 쇼핑채널링-추적키 */
    trackingKey?: string;
    /** 재인증 여부 */
    reauthenticate?: string;
}

export interface IssueOpenIdAccessTokenResponse {
    /** 외부 IDP 코드. 리퀘스트와 동일 */
    provider: NcpOpenIdProviderType;
    /** 휴면 회원일 경우 포함되는 정보로, 주로 휴면 확인 용도로 사용됨. */
    dormantMemberResponse: Nullable<{
        memberName: Nullable<string>;
        mobileNo: Nullable<string>;
        email: Nullable<string>;
    }>;
    /** 같은 정보를 가진 기존 회원이 존재할 경우 추가적으로 포함되는 정보. (없을 경우 null) */
    ordinaryMemberResponse: Nullable<{
        /** 기존 회원 가입일 */
        signUpDateTime: Nullable<string>;
        /** 기존 회원 마스킹된 이메일 주소나 휴대폰 번호 (nullable) */
        duplicateKey: Nullable<string>;
    }>;
    /** 엑세스 토큰의 유효 기간(초) */
    expiresIn: number;
    /** 회원 엑세스 토큰 */
    accessToken: string;
    /** 최초 연동 여부 - 해당 오픈 아이디가 샵바이에 최초로 연동되었는지 확인하는 용도로 사용됨. */
    isInitialSync: boolean;
    /** 리프레시 토큰 */
    refreshToken: string;
    /** 리프레시 토큰의 유효 기간(초) */
    refreshTokenExpiresIn: number;
}

export interface DisconnectSMSParams {
    /** 간편 로그인 제공사 */
    provider: NcpOpenIdProviderType;
}

export interface IssueAccessTokenData {
    /** 비밀번호 */
    password: string;
    /** 외부 IDP 코드(nullable) */
    provider?: NcpOpenIdProviderType;
    /** 자동로그인 여부(true로 요청하면 유효 기간이 90일인 토큰이 생성)(nullable) */
    keepLogin?: boolean;
    /** 회원 아이디 */
    memberId: string;
}

export interface IssueAccessTokenResponse {
    /** 비밀번호 변경 필수 여부 */
    passwordChangeRequired: boolean;
    /** 휴면 회원일 경우 추가적으로 포함되는 정보. (휴면회원 아닐경우 null) (nullable) */
    dormantMemberResponse: Nullable<{
        /** 회원 이름 (nullable) */
        memberName: Nullable<string>;
        /** 회원 휴대전화번호 (nullable) */
        mobileNo: Nullable<string>;
        /** 회원 이메일 주소 (nullable) */
        email: Nullable<string>;
    }>;
    /** 엑세스 토큰의 유효 기간(초) */
    expireIn: number;
    /** 비밀번호 변경일로부터 경과된 일 수 */
    daysFromLastPasswordChange: number;
    /** 회원 엑세스 토큰 */
    accessToken: string;
}

export interface LinkSNSParams {
    /** 간편 로그인 제공사 */
    provider: NcpOpenIdProviderType;
    /** IdP(Identity Provider, 아이디 제공자)로부터 받은 인증코드(authorization code) - 간편 로그인 사용시 필수 */
    code?: string;
    /** IdP(Identity Provider, 아이디 제공자) 엑세스 토큰 - 연동형 IdP(Identity Provider, 아이디 제공자) 사용시 필수 */
    openAccessToken?: string;
    /** 개발자센터에 등록된 redirect URI */
    redirectUri?: string;
    /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰 */
    state?: string;
    /** 자동로그인 여부(true로 요청하면 유효 기간이 90일인 토큰이 생성) */
    keepLogin?: boolean;
    /** 클라이언트 플랫폼 */
    platformType?: ClientPlatformType;
}

export interface GenerateAppCardQrParams {
    /** 거래번호 */
    transNo: string;
}

export interface GenerateAppCardQrResponse {
    /** 앱카드 QR 코드 (base64) */
    qr: string;
}

export interface IssueAppCardTransNoResponse {
    /** 앱카드 인증 거래번호 */
    transNo: string;
    /** 앱카드 인증거래 확인 토큰 */
    token: string;
}

export interface GetOpenIdAccessTokenResponse {
    /** 프로바이더(간편로그인 제공사) 토큰 만료 시각 */
    expireYmdt: Nullable<string>;
    /** 프로바이더(간편로그인 제공사) 액세스 토큰 */
    accessToken: Nullable<string>;
    /** 프로바이더(간편로그인 제공사) 리프레시 토큰 */
    refreshToken: Nullable<string>;
}
