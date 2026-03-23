export interface GenerateCaptchaImageParams {
    /** 캡챠 구분키 */
    key: string;
}

export interface GenerateCaptchaImageResponse {
    /** 캡챠 이미지 URL */
    url: string;
}

export interface VerifyCaptchaImageData {
    /** 캡챠 인증코드 */
    code: string;
    /** 캡챠 구분키 */
    key: string;
}
