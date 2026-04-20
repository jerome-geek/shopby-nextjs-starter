import type { GetTimeSaleSectionProductsParams } from '@/models/shop/timeSale';

const timeSaleKeys = {
    all: ['timeSale'] as const,

    /** 타임세일 섹션 상품 */
    sectionProducts: (
        sectionNo: number,
        searchParams: Omit<GetTimeSaleSectionProductsParams, 'pageNumber'>,
    ) =>
        [
            ...timeSaleKeys.all,
            'section-products',
            sectionNo,
            searchParams,
        ] as const,
};

export default timeSaleKeys;
