import { describe, it, expect } from 'vitest';
import { toSelectedOption } from '../product';
import type { FlatOption } from '@/models/product/productOption';

describe('product helpers', () => {
    describe('toSelectedOption', () => {
        it('inputMatchingType을 포함하여 textOptionInputs 데이터를 정확하게 매핑해야 한다', () => {
            const mockOption: FlatOption = {
                optionNo: 1,
                stockCnt: 10,
                buyPrice: 1000,
                label: 'Option A',
                value: 'A',
                addPrice: 0,
                isRequiredOption: true,
                images: [],
                saleType: 'AVAILABLE',
                extraManagementCd: '',
                main: true,
                rentalInfo: [],
                saleCnt: 0,
                reservationStockCnt: 0,
                optionManagementCd: '',
                forcedSoldOut: false,
            };

            const mockTextOptionInputs = [
                {
                    inputNo: 101,
                    inputValue: 'Custom text',
                    required: true,
                    inputLabel: 'Engraving',
                    inputMatchingType: 'PRODUCT' as const,
                },
            ];

            const result = toSelectedOption(
                mockOption,
                1001,
                undefined,
                mockTextOptionInputs,
                2,
            );

            expect(result.productNo).toBe(1001);
            expect(result.optionNo).toBe(1);
            expect(result.orderCnt).toBe(2);
            expect(result.optionInputs).toHaveLength(1);
            expect(result.optionInputs[0]).toEqual({
                inputNo: 101,
                inputValue: 'Custom text',
                required: true,
                inputLabel: 'Engraving',
                inputMatchingType: 'PRODUCT',
            });
        });
    });
});
