import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import {
    GetExternalScriptsParams,
    GetExternalScriptsResponse,
} from '@/models/manage/page';

const page = {
    /**
     * 외부스크립트 조회하기
     * - 외부 스크립트를 조회하는 API 입니다.
     */
    getExternalScripts: (
        params: GetExternalScriptsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetExternalScriptsResponse>({
            method: 'GET',
            url: '/page/scripts',
            params,
            ...options,
        });
    },
};

export default page;
