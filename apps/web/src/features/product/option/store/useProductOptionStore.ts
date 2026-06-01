import {
    append,
    filter,
    find,
    flatMap,
    isEmpty,
    map,
    pipe,
    some,
    toArray,
    uniqBy,
} from '@fxts/core';

import { toSelectedOption } from '@/entities/product/utils/selection';
import { TextOptionInput } from '@/models/product/productOption';
import { createStore } from '@/features/product/option/store/createStore';

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
                      set((state) => {
                          if (
                              some(
                                  (item) => item.optionNo === option.optionNo,
                                  state.selectedOptionList,
                              )
                          ) {
                              return {
                                  selectedOptionList: pipe(
                                      state.selectedOptionList,
                                      map((item) =>
                                          item.optionNo === option.optionNo
                                              ? {
                                                    ...item,
                                                    orderCnt:
                                                        item.orderCnt + 1,
                                                }
                                              : item,
                                      ),
                                      toArray,
                                  ),
                              };
                          }

                          const existingInputNos = new Set(
                              (option.optionInputs ?? []).map(
                                  (input) => input.inputNo,
                              ),
                          );

                          const productInputsToMerge = pipe(
                              state.selectedOptionList,
                              filter(
                                  (item) => item.productNo === option.productNo,
                              ),
                              flatMap((item) => item.optionInputs ?? []),
                              filter(
                                  (input) =>
                                      input.inputMatchingType === 'PRODUCT',
                              ),
                              uniqBy((input) => input.inputNo),
                              filter(
                                  (input) =>
                                      !existingInputNos.has(input.inputNo),
                              ),
                              toArray,
                          );

                          const optionToAdd =
                              productInputsToMerge.length === 0
                                  ? option
                                  : {
                                        ...option,
                                        optionInputs: [
                                            ...(option.optionInputs ?? []),
                                            ...productInputsToMerge,
                                        ],
                                    };

                          return {
                              selectedOptionList: pipe(
                                  state.selectedOptionList,
                                  append(optionToAdd),
                                  toArray,
                              ),
                          };
                      }),

                  removeOption: (optionNo) =>
                      set((state) => {
                          const nextList = pipe(
                              state.selectedOptionList,
                              filter((item) => item.optionNo !== optionNo),
                              toArray,
                          );

                          if (
                              nextList.length ===
                              state.selectedOptionList.length
                          ) {
                              return state;
                          }
                          return { selectedOptionList: nextList };
                      }),
                  updateOptionCnt: (optionNo, orderCnt) =>
                      set((state) => {
                          const target = find(
                              (item) => item.optionNo === optionNo,
                              state.selectedOptionList,
                          );

                          if (!target || target.orderCnt === orderCnt) {
                              return state;
                          }

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
                      params: TextOptionInput & {
                          productNo: number;
                          optionNo?: number;
                      },
                  ) =>
                      set((state) => {
                          const targetOptions =
                              params.inputMatchingType === 'PRODUCT'
                                  ? state.selectedOptionList.filter(
                                        (item) =>
                                            item.productNo === params.productNo,
                                    )
                                  : pipe(
                                        state.selectedOptionList,
                                        filter(
                                            (item) =>
                                                item.productNo ===
                                                    params.productNo &&
                                                (params.optionNo ===
                                                    undefined ||
                                                    item.optionNo ===
                                                        params.optionNo),
                                        ),
                                        toArray,
                                    );

                          if (isEmpty(targetOptions)) {
                              return state;
                          }

                          const hasChanges = pipe(
                              targetOptions,
                              some((option) => {
                                  const targetInput = find(
                                      (input) =>
                                          input.inputNo === params.inputNo,
                                      option.optionInputs ?? [],
                                  );

                                  return (
                                      !targetInput ||
                                      targetInput.inputValue !==
                                          params.inputValue
                                  );
                              }),
                          );

                          if (!hasChanges) {
                              return state;
                          }

                          const targetOptionNos = new Set(
                              targetOptions.map((option) => option.optionNo),
                          );

                          return {
                              selectedOptionList: pipe(
                                  state.selectedOptionList,
                                  map((item) => {
                                      if (
                                          !targetOptionNos.has(item.optionNo)
                                      ) {
                                          return item;
                                      }
                                      const optionInputs =
                                          item.optionInputs ?? [];
                                      const targetInput = find(
                                          (input) =>
                                              input.inputNo === params.inputNo,
                                          optionInputs,
                                      );
                                      return {
                                          ...item,
                                          optionInputs: targetInput
                                              ? pipe(
                                                    optionInputs,
                                                    map((input) =>
                                                        input.inputNo ===
                                                        params.inputNo
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
                                                        inputNo:
                                                            params.inputNo,
                                                        inputValue:
                                                            params.inputValue,
                                                        required:
                                                            params.required,
                                                        inputLabel:
                                                            params.inputLabel,
                                                        inputMatchingType:
                                                            params.inputMatchingType,
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
