import { create } from 'zustand';

interface DropdownState {
    activeId: string;
    setActiveId: (id: string) => void;
    closeAll: () => void;
}

/**
 * 여러 개의 dropdown 중 하나만 열리도록 제어합니다.
 */
export const useDropdownStore = create<DropdownState>((set) => ({
    activeId: '',
    setActiveId: (id) => set({ activeId: id }),
    closeAll: () => set({ activeId: '' }),
}));
