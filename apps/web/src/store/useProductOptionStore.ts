import { append, filter, map, pipe, some, toArray } from '@fxts/core';
import { createStore } from './utils';

import { toSelectedOption } from '@/helpers/product';

export type SelectedOption = ReturnType<typeof toSelectedOption>;

interface ProductOptionState {
    selectedOptionList: SelectedOption[];
    addOption: (option: SelectedOption) => void;
    removeOption: (optionNo: number) => void;
    updateOptionCnt: (optionNo: number, orderCnt: number) => void;
    updateTextOptionValue: (params: {
        productNo: number;
        inputNo: number;
        inputValue: string;
        optionNo?: number;
    }) => void;
    clearOptions: () => void;
}

export const useProductOptionStore = createStore<ProductOptionState>(
    (set) => ({
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

    updateTextOptionValue: (params: {
        productNo: number;
        inputNo: number;
        inputValue: string;
        optionNo?: number;
    }) =>
        set((state) => ({
            selectedOptionList: pipe(
                state.selectedOptionList,
                map((item) => {
                    if (item.productNo !== params.productNo) return item;
                    if (
                        params.optionNo !== undefined &&
                        item.optionNo !== params.optionNo
                    )
                        return item;

                    return {
                        ...item,
                        optionInputs: pipe(
                            item.optionInputs ?? [],
                            map((input) =>
                                input.inputNo === params.inputNo
                                    ? { ...input, inputValue: params.inputValue }
                                    : input,
                            ),
                            toArray,
                        ),
                    };
                }),
                toArray,
            ),
        })),

    clearOptions: () => set({ selectedOptionList: [] }),
}), 'ProductOptionStore');
