import { append, filter, find, map, pipe, some, toArray } from '@fxts/core';
import { createStore } from './utils';

import { toSelectedOption } from '@/helpers/product';
import { TextOptionInput } from '@/models/product/productOption';

export type SelectedOption = ReturnType<typeof toSelectedOption>;

interface ProductOptionState {
    selectedOptionList: SelectedOption[];
    addOption: (option: SelectedOption) => void;
    removeOption: (optionNo: number) => void;
    updateOptionCnt: (optionNo: number, orderCnt: number) => void;
    updateTextOptionValue: (
        params: TextOptionInput & { productNo: number; optionNo?: number },
    ) => void;
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
                                          ? {
                                                ...item,
                                                orderCnt: item.orderCnt + 1,
                                            }
                                          : item,
                                  list,
                              )
                            : append(option, list),
                    toArray,
                ),
            })),

        removeOption: (optionNo) =>
            set((state) => {
                const nextList = pipe(
                    state.selectedOptionList,
                    filter((item) => item.optionNo !== optionNo),
                    toArray,
                );
                
                // 변경 사항이 없으면 기존 상태 반환
                if (nextList.length === state.selectedOptionList.length) {
                    return state;
                }
                return { selectedOptionList: nextList };
            }),

        updateOptionCnt: (optionNo, orderCnt) =>
            set((state) => {
                // 대상 옵션을 먼저 찾아 실제 변경이 필요한지 확인
                const target = find(
                    (item) => item.optionNo === optionNo,
                    state.selectedOptionList,
                );

                if (!target || target.orderCnt === orderCnt) return state;

                return {
                    selectedOptionList: pipe(
                        state.selectedOptionList,
                        map((item) =>
                            item.optionNo === optionNo
                                ? { ...item, orderCnt }
                                : item,
                        ),
                        toArray,
                    ),
                };
            }),

        updateTextOptionValue: (
            params: TextOptionInput & { productNo: number; optionNo?: number },
        ) =>
            set((state) => {
                // 변경할 대상 옵션을 찾음
                const targetOption = find(
                    (item) =>
                        item.productNo === params.productNo &&
                        (params.optionNo === undefined ||
                            item.optionNo === params.optionNo),
                    state.selectedOptionList,
                );

                if (!targetOption) return state;

                // 해당 옵션 안에서 변경할 텍스트 입력항목을 찾음
                const targetInput = find(
                    (input) => input.inputNo === params.inputNo,
                    targetOption.optionInputs ?? [],
                );

                // 기존 값과 동일하다면 업데이트를 건너뜀 (리렌더링 방지)
                if (
                    targetInput &&
                    targetInput.inputValue === params.inputValue
                ) {
                    return state;
                }

                // 변경이 확인되면 fxts 파이프라인으로 배열 재구성
                return {
                    selectedOptionList: pipe(
                        state.selectedOptionList,
                        map((item) => {
                            if (item !== targetOption) return item;

                            const optionInputs = item.optionInputs ?? [];

                            return {
                                ...item,
                                optionInputs: targetInput
                                    ? pipe(
                                          optionInputs,
                                          map((input) =>
                                              input.inputNo === params.inputNo
                                                  ? {
                                                        ...input,
                                                        inputValue:
                                                            params.inputValue,
                                                    }
                                                  : input,
                                          ),
                                          toArray,
                                      )
                                    : pipe(
                                          optionInputs,
                                          append({
                                              inputNo: params.inputNo,
                                              inputValue: params.inputValue,
                                              required: params.required,
                                              inputLabel: params.inputLabel,
                                              inputMatchingType: params.inputMatchingType,
                                          }),
                                          toArray,
                                      ),
                            };
                        }),
                        toArray,
                    ),
                };
            }),

        clearOptions: () => set({ selectedOptionList: [] }),
    }),
    'ProductOptionStore',
);
