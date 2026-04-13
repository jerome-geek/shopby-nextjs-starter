import type { GetFreeGiftConditionByOrderAmountParams } from '@/models/product/freeGift';

const freeGiftKeys = {
    all: ['freeGift'] as const,

    /** 사은품 지급 조건 조회 */
    condition: (productNo: number) =>
        [...freeGiftKeys.all, 'condition', productNo] as const,
    conditionByOrderAmount: (
        searchParams: GetFreeGiftConditionByOrderAmountParams,
    ) => [...freeGiftKeys.all, 'condition', searchParams] as const,
};

export default freeGiftKeys;
