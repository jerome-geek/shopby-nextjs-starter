import { env } from '@/configs/env';

/**
 * 스토리지 키에 prefix를 추가하는 헬퍼 함수
 */
function getStorageKey(key: string): string {
    const prefix = env.NEXT_PUBLIC_APP_NAME || 'shopby';

    return `${prefix}_${key}`;
}

/**
 * sessionStorage를 prefix와 함께 관리하는 유틸리티 클래스
 */
export class SessionStorageManager {
    /**
     * sessionStorage에 값 저장
     */
    static setItem(key: string, value: string): void {
        if (typeof window === 'undefined') return;
        try {
            sessionStorage.setItem(getStorageKey(key), value);
        } catch (error) {
            console.warn('Failed to set sessionStorage item:', error);
        }
    }

    /**
     * sessionStorage에서 값 가져오기
     */
    static getItem(key: string): string | null {
        if (typeof window === 'undefined') return null;
        try {
            return sessionStorage.getItem(getStorageKey(key));
        } catch (error) {
            console.warn('Failed to get sessionStorage item:', error);
            return null;
        }
    }

    /**
     * sessionStorage에서 값 제거
     */
    static removeItem(key: string): void {
        if (typeof window === 'undefined') return;
        try {
            sessionStorage.removeItem(getStorageKey(key));
        } catch (error) {
            console.warn('Failed to remove sessionStorage item:', error);
        }
    }

    /**
     * sessionStorage 전체 초기화 (prefix가 붙은 키만)
     */
    static clear(): void {
        if (typeof window === 'undefined') return;
        try {
            const prefix =
                process.env.NEXT_PUBLIC_STORAGE_PREFIX ||
                process.env.NEXT_PUBLIC_CLIENT_ID ||
                'shopby';
            const keys = Object.keys(sessionStorage);
            keys.forEach((key) => {
                if (key.startsWith(`${prefix}_`)) {
                    sessionStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.warn('Failed to clear sessionStorage:', error);
        }
    }
}
