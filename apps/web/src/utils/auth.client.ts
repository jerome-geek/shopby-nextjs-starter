/**
 * CSRF 토큰 생성 (클라이언트 사이드)
 */
export function generateCSRFToken(): string {
    if (typeof window === 'undefined') {
        throw new Error('generateCSRFToken must be called on client side');
    }

    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
        '',
    );
}
