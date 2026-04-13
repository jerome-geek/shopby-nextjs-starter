import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import {
    GetOpenIdListResponse,
    IssueOpenIdAccessTokenParams,
    OpenLoginPageParams,
} from '@/models/auth/OAuthCallback';

const OAuthCallback = {
    /**
     * OAuth 로그인 페이지 열기
     *  - 간편 로그인을 위한 로그인 URL을 조회한 후 해당 주소로 리다이렉트하는 API입니다.
     *   - /oauth/begin -> 간편 로그인 페이지 -> /oauth/callback -> nextUrl 순으로 리다이렉트됩니다.
     *   - nextUrl을 이용하여 로그인 성공 후 돌아갈 callback URL을 설정할 수 있습니다.
     *   - 쇼핑몰 운영자가 기본 도메인을 등록한 경우 /로 시작하는 상대 주소를 사용할 수 있고, 그 외의 경우에는 올바른 HTTP URL을 전달해야 합니다.
     */
    openLoginPage: (
        params: OpenLoginPageParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'GET',
            url: '/oauth/begin',
            params,
            ...options,
        });
    },

    /**
     * OAuth callback 처리하기 (AccessToken 발급하기)
     *  - OpenId 회원의 AccessToken 발급하기 위한 API 입니다.
     *      - /oauth/begin -> 간편 로그인 페이지 -> /oauth/callback -> nextUrl 순으로 리다이렉트됩니다.
     *      - 간편 로그인 성공후 받은 인증 코드를 통해 회원 토큰을 발급하고, 리다이렉트될 nexUrl의 쿼리에 토큰 정보를 담아 전달합니다.
     *      - ex) https://test.shopby.co.kr?accessToken=test-access-token&expireIn=3599&daysFromLastPasswordChange=17
     *      - 쿼리 파라미터는 /oauth/begin에서 정의한 값이 간편 로그인 페이지를 통해 넘어와야하며, 임의로 변경해서는 안됩니다.
     */
    issueOpenIdAccessToken: (
        params: IssueOpenIdAccessTokenParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'GET',
            url: '/oauth/callback',
            params,
            ...options,
        });
    },

    /**
     * SNS 연동 내역 조회
     *  - 연동된 SNS를 조회하는 API 입니다.
     */
    getOpenIdList: () => {
        return shopbyRequest<GetOpenIdListResponse>({
            method: 'GET',
            url: '/oauth/openid/list',
        });
    },
};

export default OAuthCallback;
