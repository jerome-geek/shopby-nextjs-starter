import qs from 'qs';
import type { Options } from 'ky';

import { request } from '@/api/core';
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
        options?: Options
    ) => {
        return request.get<GetExternalScriptsResponse>('page/scripts', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },
};

export default page;
