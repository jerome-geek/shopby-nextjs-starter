import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * React 18/19 권장 방식의 클라이언트 마운트 여부 확인 훅
 */
export const useIsClient = () => {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );
};
