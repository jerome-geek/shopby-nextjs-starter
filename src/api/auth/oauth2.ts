import request from '@/api/core/request';
import { cookieTokenManager } from '@/api/core/utils';
import { IssueAccessTokenResponse } from '@/models/auth/oauth2';

// 기본 헤더 함수
const defaultHeaders = () => ({
    'Content-Type': 'application/json',
});

// 타입 정의 (임시)
type UpdateAccessTokenResponse = Record<string, unknown>;

type IssueAccessTokenData = Record<string, unknown>;
type IssueOpenIdAccessTokenData = Record<string, unknown>;
type RefreshOpenIdAccessTokenResponse = Record<string, unknown>;
type Nullable<T> = T | null;

class OAuth2Service {
    private static instance: OAuth2Service;

    private constructor() {}

    public static getInstance(): OAuth2Service {
        if (!OAuth2Service.instance) {
            OAuth2Service.instance = new OAuth2Service();
        }
        return OAuth2Service.instance;
    }

    /**
     * 토큰 갱신하기
     *  - 샵바이 회원의 AccessToken 을 갱신시키기 위한 API 입니다.
     *  - Shop-By-Authorization 로 액세스 토큰을 전달하면 됩니다.
     *  - Refresh-Token 로 리프레시 토큰을 전달하면 됩니다.
     *  - ex) Shop-By-Authorization : Bearer test-access-token
     */
    updateAccessToken() {
        return request.put('oauth2').json<UpdateAccessTokenResponse>();
    }

    /**
     * 토큰 발급하기
     *  - 샵바이 회원의 AccessToken 및 RefreshToken 발급하기 위한 API 입니다.
     *  - 회원 엑세스 토큰의 기본 유효 기간은 30 분이며,
     *  - 회원 리프레시 토큰의 기본 유효 기간은 1 일 입니다.
     *  - keepLogin을 true로 요청하면 리프레시 토큰 유효 기간을 90 일인 토큰이 생성됩니다.
     */
    issueAccessToken(data: IssueAccessTokenData) {
        return request
            .post('oauth2', { json: data })
            .json<IssueAccessTokenResponse>();
    }

    /**
     * 토큰 만료하기
     *  - 샵바이 회원의 AccessToken 및 RefreshToken 을 만료시키기 위한 API 입니다.
     *  - Shop-By-Authorization 로 액세스 토큰을 전달하면 됩니다.
     *  - ex) Shop-By-Authorization : Bearer test-access-token
     */
    deleteAccessToken() {
        const accessToken = cookieTokenManager.getToken();

        return request.delete('oauth2', {
            headers: {
                ...defaultHeaders(),
                'Shop-By-Authorization': `Bearer ${accessToken}`,
            },
        });
    }

    /**
     * 오픈아이디 토큰 재인증 처리하기
     *  - 오픈아이디 회원의 개인정보 접속 권한을 부여하기 위한 API 입니다.
     *  - 해당 액세스 토큰의 만료시간까지 개인정보 접속 권한을 부여합니다.
     *  - Shop-By-Authorization 로 액세스 토큰을 전달하면 됩니다.
     *  - Refresh-Token 로 리프레시 토큰을 전달하면 됩니다.
     *  - ex) Shop-By-Authorization : Bearer test-access-token
     */
    refreshOpenIdAccessToken({
        data,
        accessToken,
        refreshToken,
    }: {
        data: IssueOpenIdAccessTokenData;
        accessToken?: Nullable<string>;
        refreshToken?: Nullable<string>;
    }) {
        const localAccessToken = cookieTokenManager.getToken();
        const localRefreshToken = cookieTokenManager.getRefreshToken();

        return request
            .put('oauth2/openid', {
                json: data,
                headers: {
                    'Shop-By-Authorization': `Bearer ${
                        accessToken || localAccessToken || ''
                    }`,
                    'Refresh-Token': refreshToken || localRefreshToken || '',
                },
            })
            .json();
    }

    /**
     * 오픈아이디 토큰 발급하기
     */
    issueOpenIdAccessToken(data: IssueOpenIdAccessTokenData) {
        return request.post('oauth2/openid', { json: data }).json();
    }
}

// 싱글톤 인스턴스를 생성하여 바로 export
export default OAuth2Service.getInstance();
