import { DEFAULT_ORDER_TAB_TYPES } from '@/entities/order/constants';
import { parseAsEnum } from '@/entities/mypage/utils/parsers';

type OrdersStatusTab =
    | 'ALL'
    | 'DEPOSIT_WAIT'
    | 'PAY_DONE'
    | 'PRODUCT_PREPARE,DELIVERY_PREPARE'
    | 'DELIVERY_ING'
    | 'DELIVERY_DONE'
    | 'BUY_CONFIRM';

const ordersStatusTabParser = parseAsEnum<OrdersStatusTab>([
    'ALL',
    'DEPOSIT_WAIT',
    'PAY_DONE',
    'PRODUCT_PREPARE,DELIVERY_PREPARE',
    'DELIVERY_ING',
    'DELIVERY_DONE',
    'BUY_CONFIRM',
] as const);

const resolveOrdersRequestTypes = (tab: OrdersStatusTab | null) => {
    if (tab === null || tab === 'ALL') {
        return null;
    }
    return tab.split(',') as unknown as typeof DEFAULT_ORDER_TAB_TYPES;
};

type OrdersStatusSummaryCounts = Partial<{
    depositWaitCnt: number;
    payDoneCnt: number;
    productPrepareCnt: number;
    deliveryPrepareCnt: number;
    deliveryIngCnt: number;
    deliveryDoneCnt: number;
    buyConfirmCnt: number;
}>;

export type OrderStatusOption = {
    value: OrdersStatusTab;
    label: string;
    count?: number;
};

const ordersStatusTabOptions = (
    summary?: OrdersStatusSummaryCounts | null,
): ReadonlyArray<OrderStatusOption> => [
    {
        value: 'ALL',
        label: '전체',
        count:
            (summary?.depositWaitCnt ?? 0) +
            (summary?.payDoneCnt ?? 0) +
            (summary?.productPrepareCnt ?? 0) +
            (summary?.deliveryPrepareCnt ?? 0) +
            (summary?.deliveryIngCnt ?? 0) +
            (summary?.deliveryDoneCnt ?? 0) +
            (summary?.buyConfirmCnt ?? 0),
    },
    {
        value: 'DEPOSIT_WAIT',
        label: '입금대기',
        count: summary?.depositWaitCnt ?? 0,
    },
    {
        value: 'PAY_DONE',
        label: '결제완료',
        count: summary?.payDoneCnt ?? 0,
    },
    {
        value: 'PRODUCT_PREPARE,DELIVERY_PREPARE',
        label: '배송준비중',
        count:
            (summary?.productPrepareCnt ?? 0) +
            (summary?.deliveryPrepareCnt ?? 0),
    },
    {
        value: 'DELIVERY_ING',
        label: '배송중',
        count: summary?.deliveryIngCnt ?? 0,
    },
    {
        value: 'DELIVERY_DONE',
        label: '배송완료',
        count: summary?.deliveryDoneCnt ?? 0,
    },
    {
        value: 'BUY_CONFIRM',
        label: '구매확정',
        count: summary?.buyConfirmCnt ?? 0,
    },
];

export const ordersStatusTabSpec = {
    parser: ordersStatusTabParser,
    options: ordersStatusTabOptions,
    resolveRequestTypes: resolveOrdersRequestTypes,
    defaultValue: null,
} as const;
