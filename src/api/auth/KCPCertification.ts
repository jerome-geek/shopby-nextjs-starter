import qs from 'qs';
import type { Options } from 'ky';

import request from '@/api/core/request';
import {
    AuthenticateAdultParams,
    AuthenticateAdultResponse,
    GetKCPCertificationResultParams,
    GetKCPCertificationResultResponse,
    GetKCPFormParams,
    GetKCPFormResponse,
} from '@/models/auth/KCPCertification';

const KCPCertification = {
    /**
     *  회원 성인인증하기
     *   - 회원 성인인증 여부를 갱신하기 위한 API 입니다.
     *   - KCP 본인인증 서비스를 이용해 회원의 성인인증 여부를 갱신합니다.
     *   - 한 번 성인인증을 완료한 회원은 인증을 완료한 시점부터 1년동안 인증 기록이 유지됩니다.
     *   - 기간 내에 다시 인증에 성공할 경우 성인인증 일시와 만료일은 갱신됩니다.
     */
    authenticateAdult: (params: AuthenticateAdultParams, options?: Options) => {
        return request.post<AuthenticateAdultResponse>('kcp/age-verification', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * KCP 본인인증 요청하기
     *  - KCP 본인인증을 위한 form을 생성하기 위한 API 입니다
     */
    getKCPForm: (params: GetKCPFormParams, options?: Options) => {
        return request.get<GetKCPFormResponse>('kcp/id-verification/form', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * KCP 본인인증 결과 조회하기
     *  - KCP 본인인증 결과를 확인하는 API 입니다
     */
    getKCPCertificationResult: (
        params: GetKCPCertificationResultParams,
        options?: Options
    ) => {
        return request.get<GetKCPCertificationResultResponse>(
            'kcp/id-verification/response',
            {
                searchParams: qs.stringify(params),
                ...options,
            }
        );
    },
};

export default KCPCertification;
