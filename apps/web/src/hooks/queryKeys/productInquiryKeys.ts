import type {
    GetMyProductInquiriesParams,
    GetProductInquiriesParams,
} from '@/models/display/productInquiry';

const productInquiryKeys = {
    all: ['inquiries'] as const,
    /** 상품 문의 설정 */
    config: () => [...productInquiryKeys.all, 'config'] as const,

    /** 상품 문의 리스트 */
    lists: () => [...productInquiryKeys.all, 'list'] as const,
    list: (productNo: number, searchParams?: GetProductInquiriesParams) =>
        [...productInquiryKeys.lists(), productNo, searchParams] as const,
    infiniteList: (
        productNo: number,
        searchParams: GetProductInquiriesParams,
    ) =>
        [
            ...productInquiryKeys.lists(),
            productNo,
            searchParams,
            'infinite',
        ] as const,

    /** 내 상품 문의 리스트 */
    myLists: () => [...productInquiryKeys.all, 'myList'] as const,
    myList: (searchParams: GetMyProductInquiriesParams, memberNo: number) =>
        [...productInquiryKeys.myLists(), searchParams, memberNo] as const,
    myInfiniteList: (
        searchParams: GetMyProductInquiriesParams,
        memberNo: number,
    ) =>
        [
            ...productInquiryKeys.myLists(),
            searchParams,
            memberNo,
            'infinite',
        ] as const,

    /** 상품 문의 상세 */
    details: () => [...productInquiryKeys.all, 'detail'] as const,
    detail: (productNo: number, inquiryNo: number) =>
        [...productInquiryKeys.details(), productNo, inquiryNo] as const,
};

export default productInquiryKeys;
