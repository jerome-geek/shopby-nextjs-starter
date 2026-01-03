import { NcpOpenIdProviderType } from '@/models';

export type UpdateAccessTokenResponse = Pick<
    IssueAccessTokenResponse,
    | 'expiresIn'
    | 'accessToken'
    | 'tokenType'
    | 'refreshToken'
    | 'refreshTokenExpiresIn'
>;

export interface IssueAccessTokenData {
    /** 비밀번호 */
    password: string;
    /** 자동로그인 여부(true로 요청하면 유효 기간이 90일인 토큰이 생성)(nullable) */
    keepLogin?: Nullable<boolean>;
    /** 회원 아이디 */
    memberId: string;
}

export interface IssueAccessTokenResponse {
    /** 액세스 토큰 만료까지 남은 시간(초) */
    expiresIn: number;
    /** 리프레시 토큰 만료까지 남은 시간(초) */
    refreshTokenExpiresIn: number;
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
    /** 은 정보를 가진 기존 회원이 존재할 경우 추가적으로 포함되는 정보. (없을 경우 null) (nullable) */
    ordinaryMemberResponse: Nullable<{
        /** 기존 회원 마스킹된 이메일 주소나 휴대폰 번호 (nullable) */
        duplicateKey: Nullable<string>;
        /** 기존 회원 가입일 (nullable) */
        signUpDateTime: Nullable<string>;
    }>;
    /** 비밀번호 변경일로부터 경과된 일 수 */
    daysFromLastPasswordChange: number;
    /** 엑세스 토큰 */
    accessToken: string;
    /** 토큰 타입 Bearer 로 고정 */
    tokenType: 'Bearer';
    /** 리프레시 토큰 */
    refreshToken: string;
}

export interface RefreshOpenIdAccessTokenResponse {
    /** 액세스 토큰 만료까지 남은 시간(초) */
    expiresIn: number;
    /** 엑세스 토큰 */
    accessToken: string;
    /** 토큰 타입 Bearer 로 고정 */
    tokenType: string;
}

export interface IssueOpenIdAccessTokenData {
    /** 개발자센터에 등록된 redirect URI (nullable) */
    redirectUri?: Nullable<string>;
    /** IdP(Identity Provider, 아이디 제공자)로부터 받은 인증코드(authorization code) - 간편 로그인 사용시 필수 (nullable) */
    code?: Nullable<string>;
    /** 간편 로그인 제공사 */
    provider: NcpOpenIdProviderType;
    /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰 (nullable) */
    state?: Nullable<string>;
    /** 자동로그인 여부(true로 요청하면 유효 기간이 90일인 토큰이 생성) */
    keepLogin: boolean;
    /** IdP(Identity Provider, 아이디 제공자) 엑세스 토큰 - 연동형 IdP(Identity Provider, 아이디 제공자) 사용시 필수 (nullable) */
    openAccessToken?: Nullable<string>;
}
