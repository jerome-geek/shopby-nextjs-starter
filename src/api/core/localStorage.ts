/**
 * 스토리지 키에 prefix를 추가하는 헬퍼 함수
 */
function getStorageKey(key: string): string {
    const prefix =
        process.env.NEXT_PUBLIC_STORAGE_PREFIX ||
        process.env.NEXT_PUBLIC_CLIENT_ID ||
        'shopby';
    return `${prefix}_${key}`;
}

/**
 * localStorage를 prefix와 함께 관리하는 유틸리티 클래스
 */
export class LocalStorageManager {
    /**
     * localStorage에 값 저장
     */
    static setItem(key: string, value: string): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(getStorageKey(key), value);
        } catch (error) {
            console.warn('Failed to set localStorage item:', error);
        }
    }

    /**
     * localStorage에서 값 가져오기
     */
    static getItem(key: string): string | null {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(getStorageKey(key));
        } catch (error) {
            console.warn('Failed to get localStorage item:', error);
            return null;
        }
    }

    /**
     * localStorage에서 값 제거
     */
    static removeItem(key: string): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(getStorageKey(key));
        } catch (error) {
            console.warn('Failed to remove localStorage item:', error);
        }
    }

    /**
     * localStorage 전체 초기화 (prefix가 붙은 키만)
     */
    static clear(): void {
        if (typeof window === 'undefined') return;
        try {
            const prefix =
                process.env.NEXT_PUBLIC_STORAGE_PREFIX ||
                process.env.NEXT_PUBLIC_CLIENT_ID ||
                'shopby';
            const keys = Object.keys(localStorage);
            keys.forEach((key) => {
                if (key.startsWith(`${prefix}_`)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.warn('Failed to clear localStorage:', error);
        }
    }
}

