import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

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
