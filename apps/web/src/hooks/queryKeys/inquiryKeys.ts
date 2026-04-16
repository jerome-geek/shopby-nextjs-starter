import type {
    GetInquiriesParams,
    GetInquiryTypesParams,
} from '@/models/manage/inquiry';

const inquiryKeys = {
    all: ['inquiries'] as const,
    /** 1:1 문의 설정 */
    config: () => [...inquiryKeys.all, 'config'] as const,

    /** 1:1 문의 리스트 */
    lists: () => [...inquiryKeys.all, 'list'] as const,
    list: (searchParams: GetInquiriesParams) =>
        [...inquiryKeys.lists(), searchParams] as const,
    infiniteList: (searchParams: GetInquiriesParams) =>
        [...inquiryKeys.lists(), searchParams, 'infinite'] as const,

    /** 1:1 문의 상세 */
    details: () => [...inquiryKeys.all, 'detail'] as const,
    detail: (inquiryNo: number) =>
        [...inquiryKeys.details(), inquiryNo] as const,

    types: (searchParams?: GetInquiryTypesParams) =>
        [...inquiryKeys.all, 'type', searchParams] as const,
};

export default inquiryKeys;
