import { DEFAULT_ORDER_TAB_TYPES } from '@/const/order';
import { parseAsEnum } from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';

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
] as const).withDefault('ALL');

const resolveOrdersRequestTypes = (tab: OrdersStatusTab) => {
    if (tab === 'ALL') {
        return DEFAULT_ORDER_TAB_TYPES;
    }
    return tab.split(',') as unknown as typeof DEFAULT_ORDER_TAB_TYPES;
};

type OrdersStatusSummaryCounts = Partial<{
    depositWaitCnt: number;
    payDoneCnt: number;
    productPrepareCnt: number;
    deliveryIngCnt: number;
    deliveryDoneCnt: number;
    buyConfirmCnt: number;
}>;

const ordersStatusTabOptions = (
    t: Translate,
    summary?: OrdersStatusSummaryCounts | null,
): ReadonlyArray<ToggleOption<OrdersStatusTab>> => [
    { value: 'ALL', label: t('전체') },
    {
        value: 'DEPOSIT_WAIT',
        label: `${t('입금대기')} ${summary?.depositWaitCnt ?? 0}`,
    },
    {
        value: 'PAY_DONE',
        label: `${t('결제완료')} ${summary?.payDoneCnt ?? 0}`,
    },
    {
        value: 'PRODUCT_PREPARE,DELIVERY_PREPARE',
        label: `${t('출고대기')} ${summary?.productPrepareCnt ?? 0}`,
    },
    {
        value: 'DELIVERY_ING',
        label: `${t('배송중')} ${summary?.deliveryIngCnt ?? 0}`,
    },
    {
        value: 'DELIVERY_DONE',
        label: `${t('배송완료')} ${summary?.deliveryDoneCnt ?? 0}`,
    },
    {
        value: 'BUY_CONFIRM',
        label: `${t('구매확정')} ${summary?.buyConfirmCnt ?? 0}`,
    },
];

export const ordersStatusTabSpec = {
    parser: ordersStatusTabParser,
    options: ordersStatusTabOptions,
    resolveRequestTypes: resolveOrdersRequestTypes,
    defaultValue: 'ALL' as const,
} as const;
