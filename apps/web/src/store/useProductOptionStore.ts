import { create } from 'zustand';

export interface SelectedOption {
    productNo: number;
    optionNo: number;
    label: string;
    orderCnt: number;
    price: number;
    stockCnt: number;
    optionInputs?: {
        inputNo: number;
        inputValue: string;
    }[];
}

interface ProductOptionState {
    selectedOptions: SelectedOption[];
    addOption: (option: SelectedOption) => void;
    removeOption: (optionNo: number) => void;
    updateOptionCnt: (optionNo: number, orderCnt: number) => void;
    clearOptions: () => void;
}

export const useProductOptionStore = create<ProductOptionState>((set) => ({
    selectedOptions: [],

    addOption: (option) =>
        set((state) => {
            const isExist = state.selectedOptions.some(
                (item) => item.optionNo === option.optionNo,
            );

            if (isExist) {
                return {
                    selectedOptions: state.selectedOptions.map((item) =>
                        item.optionNo === option.optionNo
                            ? { ...item, orderCnt: item.orderCnt + 1 }
                            : item,
                    ),
                };
            }

            return {
                selectedOptions: [...state.selectedOptions, option],
            };
        }),

    removeOption: (optionNo) =>
        set((state) => ({
            selectedOptions: state.selectedOptions.filter(
                (item) => item.optionNo !== optionNo,
            ),
        })),

    updateOptionCnt: (optionNo, orderCnt) =>
        set((state) => ({
            selectedOptions: state.selectedOptions.map((item) =>
                item.optionNo === optionNo ? { ...item, orderCnt } : item,
            ),
        })),

    clearOptions: () => set({ selectedOptions: [] }),
}));
