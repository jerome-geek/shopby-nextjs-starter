import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useOrderSummary } from '@/hooks/query/order/myOrder';
import * as styles from '@/components/mypage/main/order-summary/index.css';

const OrderSummary = () => {
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const { t } = useTranslation();

    const { data } = useOrderSummary({
        memberNo,
        searchParams: {},
        options: { enabled: memberNo > 0 },
    });

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{t('주문 요약')}</h2>

            <div className={styles.row}>
                <span className={styles.label}>{t('주문건수')}</span>
                <span className={styles.value}>{data?.orderCnt ?? 0}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>{t('결제금액')}</span>
                <span className={styles.value}>{data?.lastPayAmt ?? 0}</span>
            </div>

            <Link href={PATHS.MYPAGE.ORDERS.MAIN} className={styles.link}>
                {t('주문/배송 내역 보기')}
            </Link>
        </section>
    );
};

export default OrderSummary;
