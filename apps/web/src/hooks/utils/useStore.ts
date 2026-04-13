import { useState, useEffect } from 'react';

/**
 * Zustand Persist Store를 Next.js에서 안전하게 사용하기 위한 Generic Hook
 * - Hydration Mismatch 방지 및 보일러플레이트 제거
 */
export const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F,
) => {
    const result = store(callback) as F;
    const [data, setData] = useState<F>();

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
};
