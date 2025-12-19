import type { Options } from 'ky';
import qs from 'qs';

import request from '@/api/core/request';
import {
    CheckCertificatedNumberParams,
    CheckCertificatedNumberViaEmailParams,
    CheckCertificatedNumberViaEmailResponse,
    CheckCertificatedNumberViaSMSParams,
    DisconnectSMSParams,
    GenerateAppCardQrParams,
    GenerateAppCardQrResponse,
    GetOpenIdAccessTokenResponse,
    GetOpenIdLoginUrlParams,
    IssueAccessTokenData,
    IssueAppCardTransNoResponse,
    IssueOpenIdAccessTokenData,
    IssueOpenIdAccessTokenParams,
    LinkSNSParams,
    LinkSNSResponse,
    SendCertificatedNumberData,
    SendCertificatedNumberViaEmailData,
    SendCertificatedNumberViaSMSData,
} from '@/models/auth/authentication';
import { generateCSRFToken } from '@/utils/auth.client';

const authentication = {
    /**
     * 인증번호 확인하기
     *  - 연락처로 전달받은 인증번호를 확인하는 API 입니다
     */
    checkCertificatedNumber: (
        params: CheckCertificatedNumberParams,
        options?: Options
    ) => {
        return request.get('authentications', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 인증번호 발송하기
     *  - 회원의 연락처 또는 입력한 연락처로 인증번호를 발송하는 API 입니다
     *   - 1. 회원번호로 보내는 겅우, 해당 회원번호를 가진 회원의 연락처로 인증번호를 발송합니다.
     *   - 2. 연락처(notiAccount)와 회원이름을 보내는 경우, 해당 정보와 일치하는 회원이 있는 경우, 입력한 연락처로 인증번호를 발송합니다
     *  - 주의사항: 만약, 회원번호 + 연락처 & 이름을 보내는 경우, 회원번호를 우선하여 인증번호를 발송합니다. 따라서, 회원번호 / 연락처 & 이름 2가지 경우 중 하나만 사용해야합니다
     */
    sendCertificatedNumber: (
        data: SendCertificatedNumberData,
        options?: Options
    ) => {
        return request.post('authentications', {
            json: data,
            ...options,
        });
    },

    /**
     * 이메일로 전달받은 인증코드 확인하기
     *  - 이메일로 전달받은 인증번호를 확인하는 API 입니다
     */
    checkCertificatedNumberViaEmail: (
        params: CheckCertificatedNumberViaEmailParams,
        options?: Options
    ) => {
        return request.get<CheckCertificatedNumberViaEmailResponse>(
            'authentications/email',
            {
                searchParams: qs.stringify(params),
                ...options,
            }
        );
    },

    /**
     * 이메일로 인증번호 발송하기
     *  - 이메일로 인증번호를 발송하는 API 입니다
     */
    sendCertificatedNumberViaEmail: (
        data: SendCertificatedNumberViaEmailData,
        options?: Options
    ) => {
        return request.post('authentications/email', {
            json: data,
            ...options,
        });
    },

    /**
     * SMS로 전달받은 인증코드 확인하기
     *  - 휴대전화번호로 전달받은 인증번호를 확인하는 API 입니다
     */
    checkCertificatedNumberViaSMS: (
        params: CheckCertificatedNumberViaSMSParams,
        options?: Options
    ) => {
        return request.get('authentications/sms', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 휴대폰 점유 인증을 위해 인증코드(6자리) SMS 발송하기
     *  - 휴대전화번호로 인증번호를 발송하는 API 입니다
     */
    sendCertificatedNumberViaSMS: (
        data: SendCertificatedNumberViaSMSData,
        options?: Options
    ) => {
        return request.post('authentications/sms', {
            json: data,
            ...options,
        });
    },

    /**
     * OpenId 로그인 url 조회하기
     *  - OpenId 로그인 url 조회하기 위한 API 입니다
     */
    getOpenIdLoginUrl: (params: GetOpenIdLoginUrlParams, options?: Options) => {
        return request.get('oauth/login-url', {
            searchParams: qs.stringify(
                params.provider === 'ncp_line'
                    ? {
                          ...params,
                          state: generateCSRFToken(),
                      }
                    : params
            ),
            ...options,
        });
    },

    /**
     *  OpenId AccessToken 발급하기 - POST방식
     *  - OpenId 회원의 AccessToken 발급하기 위한 post 방식의 API 입니다.
     *   - 자동 로그인을 위해 keepLogin을 true로 요청하면 유효 기간이 90일인 토큰이 생성됩니다.
     *   - 유효 기간이 길기 때문에 토큰 탈취시 보안에 취약할 수 있습니다.
     *  - 외부 IdP(Identity Provider, 아이디 제공자)를 이용하는 회원이 로그인할 때 사용합니다.
     *   - 지원하는 IdP 크게 (1) 간편 로그인을 지원하는 IdP, (2) 자체 연동형 IdP(자체적으로 회원 서비스를 지원하는 경우 사용)로 나뉩니다.
     *  App Card 로그인의 경우, code 에 trnasNo, state 에 token 을 전달해야합니다.
     */
    issueOpenIdAccessToken: (
        data: IssueOpenIdAccessTokenData,
        params?: IssueOpenIdAccessTokenParams,
        options?: Options
    ) => {
        return request.post('oauth/openid', {
            json: data,
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * SNS 연동 해제하기
     *  - SNS연동을 해제하는 API 입니다.
     */
    disconnectSNS: (params: DisconnectSMSParams, options?: Options) => {
        return request.delete('oauth/openId', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * AccessToken 발급하기
     *  - 샵바이 회원의 AccessToken 발급하기 위한 API 입니다
     *  - 회원 엑세스 토큰의 기본 유효 기간은 12시간이며,
     *  - 자동 로그인을 위해 keepLogin을 true로 요청하면 유효 기간이 90일인 토큰이 생성됩니다
     *  - 유효 기간이 길기 때문에 토큰 탈취시 보안에 취약할 수 있습니다
     */
    issueAccessToken: (
        data: IssueAccessTokenData,
        params?: Pick<IssueOpenIdAccessTokenParams, 'trackingKey'>,
        options?: Options
    ) => {
        return request.post('oauth/token', {
            json: data,
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * AccessToken 반환하기
     *  - AccessToken 만료 처리(ncp, payco 회원 동일)를 하기 위한 API 입니다
     *  - 회원의 엑세스 토큰을 삭제하여 로그아웃합니다
     */
    deleteAccessToken: (options?: Options) => {
        return request.delete('oauth/token', {
            ...options,
        });
    },

    /**
     * SNS 연동하기
     *  - 일반 회원에 SNS 연동을 하는 API 입니다.
     *  - 외부 IdP(Identity Provider, 아이디 제공자)를 이용하는 회원이 로그인할 때 사용합니다.
     */
    linkSNS: (params: LinkSNSParams, options?: Options) => {
        return request.get<LinkSNSResponse>('oauth/openid/link', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 앱카드 QR Code 생성하기
     *  - 인증 거래번호(transNo)를 통해 QR Code를 생성하기 위한 API 입니다.
     */
    generateAppCardQr: (params: GenerateAppCardQrParams, options?: Options) => {
        return request.get<GenerateAppCardQrResponse>(
            'oauth/openid/app-card/qr',
            {
                searchParams: qs.stringify(params),
                ...options,
            }
        );
    },

    /**
     * 앱카드 거래번호 및 토큰 발급하기
     *  - 앱 카드 로그인시 필요한 인증 거래번호(transNo)와 인증거래 확인 토큰(token) 발급하기 위한 API 입니다.
     */
    issueAppCardTransNo: (options?: Options) => {
        return request.get<IssueAppCardTransNoResponse>(
            'oauth/openid/app-card/trans-no',
            {
                ...options,
            }
        );
    },

    /**
     * AccessToken 조회하기
     *  - OpenId 서비스 제공자의 AccessToken 조회하기 위한 API 입니다.
     *  - 응답의 프로바이더 토큰 정보는 현재 로그인한 회원이 간편로그인을 통한 인증을 할 때 사용한 토큰 정보입니다.
     *  - 따라서 아이디와 비밀번호를 사용해 로그인한 사용자는 응답이 모두 null 입니다.
     *  - 또한 서버는 프로바이더 토큰을 로그인 외에는 사용하지 않기 때문에 프로바이더 토큰 갱신 등은 사용자가 직접 해야 합니다.
     */
    getOpenIdAccessToken: (options?: Options) => {
        return request.get<GetOpenIdAccessTokenResponse>('openid/token', {
            ...options,
        });
    },
};

export default authentication;
