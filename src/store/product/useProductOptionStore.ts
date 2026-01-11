import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { FlatOption } from '@/models/product/productOption';

/**
 * 선택된 옵션 아이템 타입
 */
export interface SelectedOption extends FlatOption {
    count: number;
}

interface ProductOptionState {
    /** 현재 선택된 옵션 목록 */
    selectedOptions: SelectedOption[];
    /** 총 주문 수량 */
    totalCount: number;
    /** 총 주문 금액 */
    totalPrice: number;
}

interface ProductOptionActions {
    actions: {
        /** 옵션 추가 */
        addOption: (option: FlatOption) => void;
        /** 옵션 제거 */
        removeOption: (optionNo: number) => void;
        /** 수량 변경 */
        updateCount: (optionNo: number, count: number) => void;
        /** 초기화 */
        reset: () => void;
    };
}

/**
 * 상품 옵션 선택 상태 관리 스토어
 */
export const useProductOptionStore = create<
    ProductOptionState & ProductOptionActions
>()(
    devtools(
        (set) => ({
            selectedOptions: [],
            totalCount: 0,
            totalPrice: 0,
            actions: {
                addOption: (option) =>
                    set(
                        (state) => {
                            const isExist = state.selectedOptions.some(
                                (item) => item.optionNo === option.optionNo,
                            );

                            let nextOptions;
                            if (isExist) {
                                nextOptions = state.selectedOptions.map(
                                    (item) =>
                                        item.optionNo === option.optionNo
                                            ? { ...item, count: item.count + 1 }
                                            : item,
                                );
                            } else {
                                nextOptions = [
                                    ...state.selectedOptions,
                                    { ...option, count: 1 },
                                ];
                            }

                            return {
                                selectedOptions: nextOptions,
                                totalCount: nextOptions.reduce(
                                    (acc, cur) => acc + cur.count,
                                    0,
                                ),
                                totalPrice: nextOptions.reduce(
                                    (acc, cur) =>
                                        acc + (cur.buyPrice || 0) * cur.count,
                                    0,
                                ),
                            };
                        },
                        false,
                        'productOption/addOption',
                    ),

                removeOption: (optionNo) =>
                    set(
                        (state) => {
                            const nextOptions = state.selectedOptions.filter(
                                (item) => item.optionNo !== optionNo,
                            );
                            return {
                                selectedOptions: nextOptions,
                                totalCount: nextOptions.reduce(
                                    (acc, cur) => acc + cur.count,
                                    0,
                                ),
                                totalPrice: nextOptions.reduce(
                                    (acc, cur) =>
                                        acc + (cur.buyPrice || 0) * cur.count,
                                    0,
                                ),
                            };
                        },
                        false,
                        'productOption/removeOption',
                    ),

                updateCount: (optionNo, count) =>
                    set(
                        (state) => {
                            const nextOptions = state.selectedOptions.map(
                                (item) =>
                                    item.optionNo === optionNo
                                        ? { ...item, count: Math.max(1, count) }
                                        : item,
                            );

                            return {
                                selectedOptions: nextOptions,
                                totalCount: nextOptions.reduce(
                                    (acc, cur) => acc + cur.count,
                                    0,
                                ),
                                totalPrice: nextOptions.reduce(
                                    (acc, cur) =>
                                        acc + (cur.buyPrice || 0) * cur.count,
                                    0,
                                ),
                            };
                        },
                        false,
                        'productOption/updateCount',
                    ),

                reset: () =>
                    set(
                        { selectedOptions: [], totalCount: 0, totalPrice: 0 },
                        false,
                        'productOption/reset',
                    ),
            },
        }),
        { name: 'ProductOptionStore' },
    ),
);

/**
 * 컴포넌트에서 구조분해 할당 시 불필요한 리렌더링을 방지하기 위한 개별 Selector Hooks
 */
export const useSelectedOptions = () =>
    useProductOptionStore((state) => state.selectedOptions);
export const useProductOptionTotalCount = () =>
    useProductOptionStore((state) => state.totalCount);
export const useProductOptionTotalPrice = () =>
    useProductOptionStore((state) => state.totalPrice);
export const useProductOptionActions = () =>
    useProductOptionStore((state) => state.actions);
