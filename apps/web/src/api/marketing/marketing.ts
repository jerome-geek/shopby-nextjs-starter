import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    GetSnsShareConfigParams,
    GetSnsShareConfigResponse,
} from '@/models/marketing/marketing';

const marketing = {
    /**
     * SNS 공유 설정 조회하기
     *  - SNS 공유 설정 조회하는 API 입니다.
     */
    getSnsShareConfig: (
        params: GetSnsShareConfigParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetSnsShareConfigResponse>({
            method: 'GET',
            url: '/marketing/sns-share',
            params,
            ...options,
        });
    },
};

export default marketing;
