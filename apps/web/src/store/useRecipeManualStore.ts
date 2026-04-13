import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/** registerManualTempImages 응답의 tempImages 아이템 */
export interface ManualTempImage {
    sno: number;
    uploadPath: string;
    imageUrl: string;
    sortOrder: number;
    status: string;
}

interface RecipeManualStore {
    /** 등록된 임시 이미지 목록 (sortOrder 순서 보장) */
    tempImages: ManualTempImage[];
    setTempImages: (images: ManualTempImage[]) => void;
    clearTempImages: () => void;
}

export const useRecipeManualStore = create<RecipeManualStore>()(
    devtools(
        persist(
            (set) => ({
                tempImages: [],
                setTempImages: (images) =>
                    set({ tempImages: images }, false, 'setTempImages'),
                clearTempImages: () =>
                    set({ tempImages: [] }, false, 'clearTempImages'),
            }),
            {
                name: 'RecipeManualStore',
            },
        ),
        { name: 'RecipeManualStore' },
    ),
);
