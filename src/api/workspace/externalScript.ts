import type { Options } from 'ky';

import { request } from '@/api/core';
import { GetExternalScriptsResponse } from '@/models/manage/page';

const externalScript = {
    /**
     * 외부스크립트 조회하기
     *
     * - 몰에서 사용중인 외부 스크립트 리스트를 불러옵니다.
     */
    getExternalScripts: (options?: Options) => {
        return request.get<GetExternalScriptsResponse>('external-scripts', {
            ...options,
        });
    },
};

export default externalScript;
