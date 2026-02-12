import {
    GetCalculatedOrderSheetData,
    GetOrderSheetParams,
} from '@/models/order/orderSheet';

const orderSheetKeys = {
    all: ['orderSheet'] as const,

    details: () => [...orderSheetKeys.all, 'detail'] as const,
    detail: (orderSheetNo: string, searchParams: GetOrderSheetParams) =>
        [...orderSheetKeys.details(), orderSheetNo, searchParams] as const,

    couponApply: () => [...orderSheetKeys.all, 'couponApply'] as const,
    coupons: () => [...orderSheetKeys.all, 'coupons'] as const,
    coupon: (orderSheetNo: string, memberNo?: number) =>
        [
            ...orderSheetKeys.coupons(),
            'coupon',
            orderSheetNo,
            memberNo,
        ] as const,

    calculate: (
        orderSheetNo: string,
        searchParams: GetCalculatedOrderSheetData,
    ) =>
        [
            ...orderSheetKeys.all,
            'calculate',
            orderSheetNo,
            searchParams,
        ] as const,
};

export default orderSheetKeys;
