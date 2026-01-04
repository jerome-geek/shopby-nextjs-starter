import type { Options } from 'ky';

import { authRequest } from '@/api/core/request';
import {
    IssueOpenIdAccessTokenData,
    IssueOpenIdAccessTokenResponse,
} from '@/models/auth/authentication';
import {
    IssueAccessTokenData,
    IssueAccessTokenResponse,
    RefreshOpenIdAccessTokenResponse,
    UpdateAccessTokenResponse,
} from '@/models/auth/oauth2';

const oauth2 = {
    /**
     * 토큰 갱신하기
     *  - 샵바이 회원의 AccessToken 을 갱신시키기 위한 API 입니다.
     *  - Shop-By-Authorization 로 액세스 토큰을 전달하면 됩니다.
     *  - Refresh-Token 로 리프레시 토큰을 전달하면 됩니다.
     *  - ex) Shop-By-Authorization : Bearer test-access-token
     */
    updateAccessToken: (options?: Options) => {
        return authRequest.put<UpdateAccessTokenResponse>('oauth2', options);
    },

    /**
     * 토큰 발급하기
     *  - 샵바이 회원의 AccessToken 및 RefreshToken 발급하기 위한 API 입니다.
     *  - 회원 엑세스 토큰의 기본 유효 기간은 30 분이며,
     *  - 회원 리프레시 토큰의 기본 유효 기간은 1 일 입니다.
     *  - keepLogin을 true로 요청하면 리프레시 토큰 유효 기간을 90 일인 토큰이 생성됩니다.
     */
    issueAccessToken: (data: IssueAccessTokenData, options?: Options) => {
        return authRequest.post<IssueAccessTokenResponse>('oauth2', {
            json: data,
            ...options,
        });
    },

    /**
     * 토큰 만료하기
     *  - 샵바이 회원의 AccessToken 및 RefreshToken 을 만료시키기 위한 API 입니다.
     *  - Shop-By-Authorization 로 액세스 토큰을 전달하면 됩니다.
     *  - ex) Shop-By-Authorization : Bearer test-access-token
     */
    deleteAccessToken: (options?: Options) => {
        return authRequest.delete('oauth2', options);
    },

    /**
     * 오픈아이디 토큰 재인증 처리하기
     *  - 오픈아이디 회원의 개인정보 접속 권한을 부여하기 위한 API 입니다.
     *  - 해당 액세스 토큰의 만료시간까지 개인정보 접속 권한을 부여합니다.
     *  - Shop-By-Authorization 로 액세스 토큰을 전달하면 됩니다.
     *  - Refresh-Token 로 리프레시 토큰을 전달하면 됩니다.
     *  - ex) Shop-By-Authorization : Bearer test-access-token
     */
    refreshOpenIdAccessToken: (
        data: IssueOpenIdAccessTokenData,
        options?: Options
    ) => {
        return authRequest.put<RefreshOpenIdAccessTokenResponse>(
            'oauth2/openid',
            {
                json: data,
                ...options,
            }
        );
    },

    /**
     * 오픈아이디 토큰 발급하기
     *  - OpenId 회원의 AccessToken 발급하기 위한 post 방식의 API 입니다.
     *  - 회원 엑세스 토큰의 기본 유효 기간은 30 분이며, 회원 리프레시 토큰의 기본 유효 기간은 1 일 입니다.
     *  - keepLogin을 true로 요청하면 리프레시 토큰 유효 기간을 90 일인 토큰이 생성됩니다.
     */
    issueOpenIdAccessToken: (
        data: IssueOpenIdAccessTokenData,
        options?: Options
    ) => {
        return authRequest.post<IssueOpenIdAccessTokenResponse>(
            'oauth2/openid',
            {
                json: data,
                ...options,
            }
        );
    },
};

export default oauth2;
