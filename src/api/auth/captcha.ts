import qs from 'qs';
import type { Options } from 'ky';

import request from '@/api/core/request';
import {
    GenerateCaptchaImageParams,
    GenerateCaptchaImageResponse,
    VerifyCaptchaImageData,
} from '@/models/auth/captcha';

const captcha = {
    /**
     * 캡챠 이미지 생성하기
     *  - 이미지 캡챠 생성을 위한 API 입니다.
     *  - 캡챠 인증 대상은 캡챠 조회 시점부터 KEY + ID 기준으로 10분 동안 유지 됩니다.
     */
    generateCaptchaImage: (
        params: GenerateCaptchaImageParams,
        options?: Options
    ) => {
        return request.get<GenerateCaptchaImageResponse>('captcha/image', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 캡챠 인증코드 확인하기
     * 캡챠 인증코드 확인하기 위한 API 입니다.
     */
    verifyCaptchaImage: (data: VerifyCaptchaImageData, options?: Options) => {
        return request.post('captcha/verify', {
            json: data,
            ...options,
        });
    },
};

export default captcha;
