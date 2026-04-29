import { beforeEach, describe, expect, it } from 'vitest';

import type { SelectedOption } from '@/store/useProductOptionStore';
import { useProductOptionStore } from '@/store/useProductOptionStore';

describe('useProductOptionStore', () => {
    beforeEach(() => {
        // Reset the store before each test
        useProductOptionStore.getState().clearOptions();
    });

    const createMockOption = (optionNo: number): SelectedOption => ({
        productNo: 1000,
        baseProductNo: undefined,
        optionNo,
        stockCnt: 10,
        price: 1000,
        orderCnt: 1,
        label: `Option ${optionNo}`,
        value: `Value ${optionNo}`,
        buyPrice: 1000,
        addPrice: 0,
        isRequiredOption: true,
        optionInputs: [],
    });

    it('새로운 옵션이 정상적으로 추가되어야 한다', () => {
        const store = useProductOptionStore.getState();
        store.addOption(createMockOption(1));

        const state = useProductOptionStore.getState();
        expect(state.selectedOptionList).toHaveLength(1);
        expect(state.selectedOptionList[0].optionNo).toBe(1);
        expect(state.selectedOptionList[0].orderCnt).toBe(1);
    });

    it('이미 존재하는 옵션을 추가할 경우 수량(orderCnt)이 증가해야 한다', () => {
        const store = useProductOptionStore.getState();
        store.addOption(createMockOption(1));
        store.addOption(createMockOption(1));

        const state = useProductOptionStore.getState();
        expect(state.selectedOptionList).toHaveLength(1);
        expect(state.selectedOptionList[0].orderCnt).toBe(2);
    });

    it('지정된 옵션이 정상적으로 삭제되어야 한다', () => {
        const store = useProductOptionStore.getState();
        store.addOption(createMockOption(1));
        store.addOption(createMockOption(2));

        store.removeOption(1);

        const state = useProductOptionStore.getState();
        expect(state.selectedOptionList).toHaveLength(1);
        expect(state.selectedOptionList[0].optionNo).toBe(2);
    });

    it('존재하지 않는 옵션을 삭제하려 할 때 상태의 참조(reference)가 유지되어야 한다 (리렌더링 차단 성능 확인)', () => {
        const store = useProductOptionStore.getState();
        store.addOption(createMockOption(1));

        const prevState = useProductOptionStore.getState().selectedOptionList;
        store.removeOption(999);
        const nextState = useProductOptionStore.getState().selectedOptionList;

        expect(prevState).toBe(nextState); // Exact reference match
    });

    it('옵션의 수량(orderCnt)이 정상적으로 업데이트되어야 한다', () => {
        const store = useProductOptionStore.getState();
        store.addOption(createMockOption(1));

        store.updateOptionCnt(1, 5);

        const state = useProductOptionStore.getState();
        expect(state.selectedOptionList[0].orderCnt).toBe(5);
    });

    describe('updateTextOptionValue', () => {
        it('입력되지 않은 새로운 텍스트 옵션 값이 정상적으로 추가되어야 한다', () => {
            const store = useProductOptionStore.getState();
            store.addOption(createMockOption(1));

            store.updateTextOptionValue({
                productNo: 1000,
                optionNo: 1,
                inputNo: 101,
                inputValue: 'Hello',
                required: false,
                inputLabel: 'Message',
                inputMatchingType: 'OPTION',
            });

            const state = useProductOptionStore.getState();
            const inputs = state.selectedOptionList[0].optionInputs;
            expect(inputs).toHaveLength(1);
            expect(inputs![0].inputValue).toBe('Hello');
        });

        it('이미 입력된 텍스트 옵션 값이 정상적으로 업데이트되어야 한다', () => {
            const store = useProductOptionStore.getState();
            store.addOption(createMockOption(1));

            store.updateTextOptionValue({
                productNo: 1000,
                optionNo: 1,
                inputNo: 101,
                inputValue: 'Hello',
                required: false,
                inputLabel: 'Message',
                inputMatchingType: 'OPTION',
            });

            store.updateTextOptionValue({
                productNo: 1000,
                optionNo: 1,
                inputNo: 101,
                inputValue: 'World',
                required: false,
                inputLabel: 'Message',
                inputMatchingType: 'OPTION',
            });

            const state = useProductOptionStore.getState();
            const inputs = state.selectedOptionList[0].optionInputs;
            expect(inputs).toHaveLength(1);
            expect(inputs![0].inputValue).toBe('World');
        });

        it('텍스트 옵션 값이 변경되지 않았을 경우 상태의 참조(reference)가 유지되어야 한다 (리렌더링 차단 성능 확인)', () => {
            const store = useProductOptionStore.getState();
            store.addOption(createMockOption(1));

            store.updateTextOptionValue({
                productNo: 1000,
                optionNo: 1,
                inputNo: 101,
                inputValue: 'Hello',
                required: false,
                inputLabel: 'Message',
                inputMatchingType: 'OPTION',
            });

            const prevState =
                useProductOptionStore.getState().selectedOptionList;

            // Update with the exact same value
            store.updateTextOptionValue({
                productNo: 1000,
                optionNo: 1,
                inputNo: 101,
                inputValue: 'Hello',
                required: false,
                inputLabel: 'Message',
                inputMatchingType: 'OPTION',
            });

            const nextState =
                useProductOptionStore.getState().selectedOptionList;

            expect(prevState).toBe(nextState); // Exact reference match
        });

        it('상품 레벨(PRODUCT)의 텍스트 옵션(optionNo가 undefined인 경우)이 정상적으로 처리되어야 한다', () => {
            const store = useProductOptionStore.getState();
            store.addOption(createMockOption(1)); // Has optionNo = 1

            // PRODUCT text option
            store.updateTextOptionValue({
                productNo: 1000,
                optionNo: undefined,
                inputNo: 999,
                inputValue: 'Product Level Message',
                required: true,
                inputLabel: 'Gift Message',
                inputMatchingType: 'PRODUCT',
            });

            const state = useProductOptionStore.getState();
            const option = state.selectedOptionList[0];
            const input = option.optionInputs?.find((i) => i.inputNo === 999);
            expect(input).toBeDefined();
            expect(input?.inputValue).toBe('Product Level Message');
        });
    });
});
