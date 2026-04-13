import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Zustand Store 생성을 위한 헬퍼 함수
 * 개발 환경(Dev)에서만 자동으로 devtools를 적용합니다.
 * 
 * @param storeCreator - 스토어 상세 정의
 * @param name - DevTools에서 식별자로 사용될 이름
 */
export const createStore = <T>(
    storeCreator: StateCreator<T, [['zustand/devtools', never]]>,
    name: string,
) => {
    return create<T>()(
        process.env.NODE_ENV === 'development'
            ? devtools(storeCreator, { name })
            : (storeCreator as any),
    );
};
