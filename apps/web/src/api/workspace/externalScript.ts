import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import { GetExternalScriptsResponse } from '@/models/manage/page';

const externalScript = {
    /**
     * 외부스크립트 조회하기
     *
     * - 몰에서 사용중인 외부 스크립트 리스트를 불러옵니다.
     */
    getExternalScripts: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetExternalScriptsResponse>({
            method: 'GET',
            url: '/external-scripts',
            ...options,
        });
    },
};

export default externalScript;
