import { create } from 'zustand';

interface DropdownState {
    activeId: string;
    setActiveId: (id: string) => void;
    closeAll: () => void;
}

/**
 * 전역 드롭다운 상태 관리 스토어
 * 여러 개의 드롭다운 중 하나만 열리도록 제어할 때 사용합니다.
 */
export const useDropdownStore = create<DropdownState>((set) => ({
    activeId: '',
    setActiveId: (id) => set({ activeId: id }),
    closeAll: () => set({ activeId: '' }),
}));
