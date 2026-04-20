import type { GetTimeSaleSectionProductsParams } from '@/models/shop/timeSale';

export type TimeSaleType = 'life' | 'kids';
export type TimeSaleStatus = 'today-open' | 'best' | 'closing-soon';

/* 페이징 사이즈 최대값이 30으로 호출 */
export const TIME_SALE_PAGE_SIZE = 30;
/* 노출될 상품 리스트에 해당하는 페이징 사이즈 */
export const TIME_SALE_DISPLAY_PAGE_SIZE = 12;
export const INITIAL_STATUS_PAGE = 1;

export const TAB_OPTIONS = [
    { label: '라이프 타임특가', value: 'life' },
    { label: '키즈 타임특가', value: 'kids' },
] as const;

export const TIME_SALE_TYPES = TAB_OPTIONS.map(({ value }) => value);

export const STATUS_OPTIONS = [
    {
        label: '오늘 오픈',
        value: 'today-open',
        description: '매일 오전 10시 업데이트',
        showTimer: true,
    },
    {
        label: '베스트',
        value: 'best',
        description: '타임세일 베스트',
        showTimer: false,
    },
    {
        label: '마감 임박',
        value: 'closing-soon',
        description: '타임세일 베스트',
        showTimer: false,
    },
];

export const SORTING_TYPE_BY_STATUS: Record<
    TimeSaleStatus,
    GetTimeSaleSectionProductsParams['sortingType']
> = {
    'today-open': 'TODAY',
    best: 'BEST',
    'closing-soon': 'CLOSING',
};
