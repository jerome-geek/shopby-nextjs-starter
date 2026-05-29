import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Skeleton from '@/shared/ui/skeleton';
import { PATHS } from '@/const/paths';
import * as styles from '@/features/mypage/order-status-summary/index.css';
import { useOrderStatusSummary } from '@/hooks/suspenseQuery/order/myOrder';

type OrderStatusSummaryItem = {
    id: string;
    title: string;
    content: number;
    url: string;
    isPrimary?: boolean;
};

export const OrderStatusSummary = () => {
    const { t } = useTranslation();

    const { data: orderStatusSummaryData } = useOrderStatusSummary();

    const list: OrderStatusSummaryItem[] = [
        {
            id: 'depositWait',
            title: '입금대기',
            content: orderStatusSummaryData.depositWaitCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=DEPOSIT_WAIT`,
        },
        {
            id: 'payDone',
            title: '결제완료',
            content: orderStatusSummaryData.payDoneCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=PAY_DONE`,
        },
        {
            id: 'deliveryPrepare',
            title: '배송준비중',
            content:
                (orderStatusSummaryData.productPrepareCnt ?? 0) +
                (orderStatusSummaryData.deliveryPrepareCnt ?? 0),
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=PRODUCT_PREPARE,DELIVERY_PREPARE`,
        },
        {
            id: 'deliveryIng',
            title: '배송중',
            content: orderStatusSummaryData.deliveryIngCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=DELIVERY_ING`,
        },
        {
            id: 'deliveryDone',
            title: '배송완료',
            content: orderStatusSummaryData.deliveryDoneCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=DELIVERY_DONE`,
        },
        {
            id: 'buyConfirm',
            title: '구매확정',
            content: orderStatusSummaryData.buyConfirmCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=BUY_CONFIRM`,
            isPrimary: true,
        },
    ] as const;

    return (
        <section className={styles.section}>
            <div className={styles.titleRow}>
                <h2 className={styles.title}>{t('나의 주문처리 현황')}</h2>
                <span className={styles.subtitle}>
                    ({t('최근 3개월 기준')})
                </span>
            </div>

            <ul className={styles.list}>
                {list.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <Link href={item.url}>
                            <strong
                                className={`${styles.count}${
                                    item?.isPrimary
                                        ? ` ${styles.countPrimary}`
                                        : ''
                                }`}
                            >
                                {item.content}
                            </strong>
                            <span className={styles.label}>
                                {t(item.title)}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export const OrderStatusSummarySkeleton = () => {
    return (
        <section className={styles.section} aria-busy='true'>
            <div className={styles.titleRow}>
                <Skeleton className={styles.skeletonTitle} />
                <Skeleton className={styles.skeletonSubtitle} />
            </div>

            <div className={styles.list}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className={styles.item}>
                        <Skeleton className={styles.skeletonCount} circle />
                        <Skeleton className={styles.skeletonLabel} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderStatusSummary;
