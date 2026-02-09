import type { Options } from 'ky';
import qs from 'qs';

import { publicRequest } from '@/api/core/request';
import {
    GetSnsShareConfigParams,
    GetSnsShareConfigResponse,
} from '@/models/marketing/marketing';

const marketing = {
    /**
     * SNS 공유 설정 조회하기
     *  - SNS 공유 설정 조회하는 API 입니다.
     */
    getSnsShareConfig: (params: GetSnsShareConfigParams, options?: Options) => {
        return publicRequest.get<GetSnsShareConfigResponse>(
            'marketing/sns-share',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },
};

export default marketing;
