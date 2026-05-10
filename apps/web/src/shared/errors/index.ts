/**
 * 리다이렉트 정보를 담는 커스텀 에러 클래스
 */
export class RedirectError extends Error {
    constructor(public path: string) {
        super(`Redirecting to ${path}`);
        this.name = 'RedirectError';

        // Error.captureStackTrace가 있는 환경(V8 등)에서 스택 트레이스 보정
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RedirectError);
        }
    }
}

/**
 * 잘못된 파라미터로 인한 리다이렉트 에러 클래스
 */
export class InvalidParameterError extends RedirectError {
    constructor(path: string) {
        super(path);
        this.name = 'InvalidParameterError';
    }
}
