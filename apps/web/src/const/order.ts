import { OrderRequestStatusType } from '@/models';
import dayjs from 'dayjs';

export const orderMap = {
    DEPOSIT_WAIT: '입금대기',
    PAY_DONE: '결제완료',
    PRODUCT_PREPARE: '상품준비중',
    DELIVERY_PREPARE: '배송준비중',
    DELIVERY_ING: '배송중',
    DELIVERY_DONE: '배송완료',
    BUY_CONFIRM: '구매확정',
    CANCEL_DONE: '취소완료',
    RETURN_DONE: '반품완료',
    EXCHANGE_DONE: '교환완료',
    PAY_WAIT: '결제대기',
    PAY_CANCEL: '결제포기',
    PAY_FAIL: '결제실패',
    DELETE: '삭제',
    EXCHANGE_WAIT: '교환대기',
    REFUND_DONE: '환불완료',
};

export const DEFAULT_ORDER_TAB_TYPES = [
    'DEPOSIT_WAIT',
    'PAY_DONE',
    'PRODUCT_PREPARE',
    'DELIVERY_PREPARE',
    'DELIVERY_ING',
    'DELIVERY_DONE',
    'BUY_CONFIRM',
] as unknown as OrderRequestStatusType[];

export const PERIOD_LIST = [
    {
        id: 'PERIOD',
        title: '기간',
        label: '',
        isSelected: true,
    },
    {
        id: 'TODAY',
        title: '오늘',
        label: dayjs().format('YYYY-MM-DD'),
        isSelected: false,
    },
    {
        id: '7DAYS',
        title: '7일',
        label: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        isSelected: false,
    },
    {
        id: '15DAYS',
        title: '15일',
        label: dayjs().subtract(15, 'days').format('YYYY-MM-DD'),
        isSelected: false,
    },
    {
        id: '1MONTHS',
        title: '1개월',
        label: dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
        isSelected: false,
    },
    {
        id: '3MONTHS',
        title: '3개월',
        label: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
        isSelected: false,
    },
    {
        id: '1YEARS',
        title: '1년',
        label: dayjs().subtract(1, 'years').format('YYYY-MM-DD'),
        isSelected: false,
    },
];

export const RECEIPT_RADIO_LIST = [
    {
        label: '발행',
        value: 'true',
    },
    {
        label: '미발행',
        value: 'false',
    },
];

export const RECEIPT_KEY_TYPE_RADIO_LIST = [
    {
        label: '휴대폰번호',
        value: 'MOBILE_NO' as const,
    },
    {
        label: '카드번호',
        value: 'CARD_NO' as const,
    },
    {
        label: '사업자번호',
        value: 'BUSINESS_NO' as const,
    },
];

export const RECEIPT_PURPOSE_TYPE_RADIO_LIST = [
    {
        label: '소득공제용',
        value: 'INCOME_TAX_DEDUCTION' as const,
    },
    {
        label: '지출증빙용',
        value: 'PROOF_EXPENDITURE' as const,
    },
];
