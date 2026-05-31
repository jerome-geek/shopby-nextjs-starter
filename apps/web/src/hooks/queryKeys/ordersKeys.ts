import type { ClaimType } from '@/models';
import type {
    GetOrderDetailParams,
    GetOrderListParams,
    GetOrderStatusSummaryParams,
} from '@/entities/order/model/myOrder';
import type { GetPreviousOrdersParams } from '@/entities/order/model/previousOrder';

const ordersKeys = {
    all: ['orders'] as const,
    write: () => [...ordersKeys.all, 'write'] as const,

    summary: (memberNo?: number, searchParams?: GetOrderStatusSummaryParams) =>
        [...ordersKeys.all, 'summary', memberNo, searchParams] as const,

    config: () => [...ordersKeys.all, 'config'] as const,

    /** 주문 리스트 조회 */
    lists: () => [...ordersKeys.all, 'list'] as const,
    list: (searchParams: GetOrderListParams) =>
        [...ordersKeys.lists(), searchParams] as const,

    /** 주문 리스트 조회 (무한스크롤)) */
    infiniteList: (searchParams: GetOrderListParams) =>
        [...ordersKeys.lists(), 'infinite', searchParams] as const,

    /** 주문 상세 조회 */
    details: () => [...ordersKeys.all, 'detail'] as const,
    detail: (
        orderNo: string,
        memberNo?: number,
        params?: GetOrderDetailParams,
    ) => [...ordersKeys.details(), orderNo, memberNo, params] as const,

    /** 이전 주문내역 조회 */
    previous: () => [...ordersKeys.all, 'previous'] as const,
    previousList: (searchParams: GetPreviousOrdersParams) =>
        [...ordersKeys.previous(), searchParams] as const,
    infinitePreviousList: (searchParams: GetPreviousOrdersParams) =>
        [...ordersKeys.previous(), 'infinite', searchParams] as const,
    previousDetail: (orderNo: string) =>
        [...ordersKeys.previous(), orderNo] as const,

    /** 클레임을 위한 상세 조회 */
    detailsByOrderNo: (
        orderNo: string,
        memberNo?: number,
        searchParams?: { claimType: ClaimType },
    ) =>
        [
            ...ordersKeys.all,
            'detail',
            'claims',
            orderNo,
            memberNo,
            searchParams,
        ] as const,

    detailsByOrderOptionNo: (
        orderOptionNo: number,
        searchParams?: { claimType: ClaimType },
    ) => [...ordersKeys.details(), orderOptionNo, searchParams] as const,
};

export default ordersKeys;
