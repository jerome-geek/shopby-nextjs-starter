import { append, filter, map, pipe, some, toArray } from '@fxts/core';
import { create } from 'zustand';

import { toSelectedOption } from '@/helpers/product';

export type SelectedOption = ReturnType<typeof toSelectedOption>;

interface ProductOptionState {
    selectedOptionList: SelectedOption[];
    addOption: (option: SelectedOption) => void;
    removeOption: (optionNo: number) => void;
    updateOptionCnt: (optionNo: number, orderCnt: number) => void;
    clearOptions: () => void;
}

export const useProductOptionStore = create<ProductOptionState>((set) => ({
    selectedOptionList: [],

    addOption: (option) =>
        set((state) => ({
            selectedOptionList: pipe(
                state.selectedOptionList,
                (list) =>
                    some((item) => item.optionNo === option.optionNo, list)
                        ? map(
                              (item) =>
                                  item.optionNo === option.optionNo
                                      ? { ...item, orderCnt: item.orderCnt + 1 }
                                      : item,
                              list,
                          )
                        : append(option, list),
                toArray,
            ),
        })),

    removeOption: (optionNo) =>
        set((state) => ({
            selectedOptionList: pipe(
                state.selectedOptionList,
                filter((item) => item.optionNo !== optionNo),
                toArray,
            ),
        })),

    updateOptionCnt: (optionNo, orderCnt) =>
        set((state) => ({
            selectedOptionList: pipe(
                state.selectedOptionList,
                map((item) =>
                    item.optionNo === optionNo ? { ...item, orderCnt } : item,
                ),
                toArray,
            ),
        })),

    clearOptions: () => set({ selectedOptionList: [] }),
}));
