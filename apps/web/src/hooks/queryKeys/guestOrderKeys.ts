import type { ClaimType } from '@/models';
import type { GetOrderDetailParams } from '@/models/order/myOrder';

const guestOrderKeys = {
    all: ['guestOrder'] as const,

    /** 주문 상세 조회 */
    details: () => [...guestOrderKeys.all, 'detail'] as const,
    detail: (orderNo: string, params?: GetOrderDetailParams) =>
        [...guestOrderKeys.details(), orderNo, params] as const,

    /** 클레임을 위한 상세 조회 */
    detailsByOrderNo: (
        orderNo: string,
        searchParams?: { claimType: ClaimType },
    ) =>
        [
            ...guestOrderKeys.all,
            'detail',
            'claims',
            orderNo,
            searchParams,
        ] as const,

    detailsByOrderOptionNo: (
        orderOptionNo: number,
        searchParams?: { claimType: ClaimType },
    ) => [...guestOrderKeys.details(), orderOptionNo, searchParams] as const,
};

export default guestOrderKeys;
