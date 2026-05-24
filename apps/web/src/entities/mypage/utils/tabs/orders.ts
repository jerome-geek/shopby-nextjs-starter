import { DEFAULT_ORDER_TAB_TYPES } from '@/const/order';
import { parseAsEnum } from '@/entities/mypage/utils/parsers';

type OrdersStatusTab =
    | 'ALL'
    | 'DEPOSIT_WAIT'
    | 'PAY_DONE'
    | 'PRODUCT_PREPARE,DELIVERY_PREPARE'
    | 'DELIVERY_ING'
    | 'DELIVERY_DONE'
    | 'BUY_CONFIRM'
    | 'CANCEL'
    | 'RETURN'
    | 'EXCHANGE';

const ordersStatusTabParser = parseAsEnum<OrdersStatusTab>([
    'ALL',
    'DEPOSIT_WAIT',
    'PAY_DONE',
    'PRODUCT_PREPARE,DELIVERY_PREPARE',
    'DELIVERY_ING',
    'DELIVERY_DONE',
    'BUY_CONFIRM',
    'CANCEL',
    'RETURN',
    'EXCHANGE',
] as const).withDefault('ALL');

const resolveOrdersRequestTypes = (tab: OrdersStatusTab | null) => {
    if (tab === null || tab === 'ALL') {
        return null;
    }
    if (tab === 'CANCEL') {
        return ['CANCEL_PROCESSING', 'CANCEL_DONE'] as unknown as typeof DEFAULT_ORDER_TAB_TYPES;
    }
    if (tab === 'RETURN') {
        return ['RETURN_PROCESSING', 'RETURN_DONE'] as unknown as typeof DEFAULT_ORDER_TAB_TYPES;
    }
    if (tab === 'EXCHANGE') {
        return ['EXCHANGE_WAITING', 'EXCHANGE_PROCESSING', 'EXCHANGE_DONE'] as unknown as typeof DEFAULT_ORDER_TAB_TYPES;
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
    cancelProcessingCnt: number;
    cancelDoneCnt: number;
    returnProcessingCnt: number;
    returnDoneCnt: number;
    exchangeProcessingCnt: number;
    exchangeDoneCnt: number;
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
            (summary?.buyConfirmCnt ?? 0) +
            (summary?.cancelProcessingCnt ?? 0) +
            (summary?.cancelDoneCnt ?? 0) +
            (summary?.returnProcessingCnt ?? 0) +
            (summary?.returnDoneCnt ?? 0) +
            (summary?.exchangeProcessingCnt ?? 0) +
            (summary?.exchangeDoneCnt ?? 0),
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
    {
        value: 'CANCEL',
        label: '취소',
        count:
            (summary?.cancelProcessingCnt ?? 0) +
            (summary?.cancelDoneCnt ?? 0),
    },
    {
        value: 'RETURN',
        label: '반품',
        count:
            (summary?.returnProcessingCnt ?? 0) +
            (summary?.returnDoneCnt ?? 0),
    },
    {
        value: 'EXCHANGE',
        label: '교환',
        count:
            (summary?.exchangeProcessingCnt ?? 0) +
            (summary?.exchangeDoneCnt ?? 0),
    },
];

export const ordersStatusTabSpec = {
    parser: ordersStatusTabParser,
    options: ordersStatusTabOptions,
    resolveRequestTypes: resolveOrdersRequestTypes,
    defaultValue: 'ALL' as const,
} as const;
