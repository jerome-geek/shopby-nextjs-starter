import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useOrderStatusSummary } from '@/hooks/query/order/myOrder';
import * as styles from '@/components/mypage/main/order-status-summary/index.css';

type OrderStatusSummaryItem = {
    id: string;
    title: string;
    content: number;
    url: string;
    isPrimary?: boolean;
};

const OrderStatusSummary = () => {
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const { t } = useTranslation();

    const { data } = useOrderStatusSummary({
        memberNo,
        searchParams: {},
        options: { enabled: memberNo > 0 },
    });

    const list: OrderStatusSummaryItem[] = [
        {
            id: 'depositWait',
            title: '입금대기',
            content: data?.depositWaitCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=DEPOSIT_WAIT`,
        },
        {
            id: 'deliveryPrepare',
            title: '출고대기',
            content:
                (data?.payDoneCnt ?? 0) +
                (data?.productPrepareCnt ?? 0) +
                (data?.deliveryPrepareCnt ?? 0),
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=PAY_DONE,PRODUCT_PREPARE,DELIVERY_PREPARE`,
        },
        {
            id: 'deliveryIng',
            title: '배송중',
            content: data?.deliveryIngCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=DELIVERY_ING`,
        },
        {
            id: 'deliveryDone',
            title: '배송완료',
            content: data?.deliveryDoneCnt ?? 0,
            url: `${PATHS.MYPAGE.ORDERS.MAIN}?orderStatus=DELIVERY_DONE`,
        },
        {
            id: 'buyConfirm',
            title: '구매확정',
            content: data?.buyConfirmCnt ?? 0,
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

            <div className={styles.list}>
                {list.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <Link href={item.url}>
                            <div
                                className={`${styles.count}${
                                    item?.isPrimary
                                        ? ` ${styles.countPrimary}`
                                        : ''
                                }`}
                            >
                                {item.content}
                            </div>
                            <span className={styles.label}>
                                {t(item.title)}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderStatusSummary;
