import type { GetProductSectionProductsParams } from '@/models/display/productSection';

const productSectionKeys = {
    all: ['productSection'] as const,

    /** 상품 진열 리스트 조회 */
    lists: () => [...productSectionKeys.all, 'list'] as const,

    /** 상품 진열 상세 조회 */
    details: () => [...productSectionKeys.all, 'detail'],
    detail: (sectionId: number | string) =>
        [...productSectionKeys.details(), sectionId] as const,

    /** 상품 진열 내 상품 목록 조회 */
    products: (
        sectionId: string,
        searchParams: GetProductSectionProductsParams,
    ) =>
        [
            ...productSectionKeys.all,
            'products',
            sectionId,
            searchParams,
        ] as const,

    /** 상품 진열 내 상품 목록 (무한 스크롤) */
    infiniteProducts: (
        sectionId: string,
        searchParams: Omit<GetProductSectionProductsParams, 'pageNumber'>,
    ) =>
        [
            ...productSectionKeys.all,
            'products',
            'infinite',
            sectionId,
            searchParams,
        ] as const,
};

export default productSectionKeys;
