import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useRecentOrders } from '@/hooks/query/order/myOrder';
import * as styles from '@/components/mypage/main/recent-order-products/index.css';

const RecentOrderProducts = () => {
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const { t } = useTranslation();

    const { data } = useRecentOrders({
        memberNo,
        searchParams: {
            pageNumber: 1,
            pageSize: 5,
        },
        options: { enabled: memberNo > 0 },
    });

    const items = data?.items ?? [];

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{t('최근 주문')}</h2>

            {items.length === 0 ? (
                <p className={styles.empty}>{t('최근 주문이 없습니다.')}</p>
            ) : (
                <ul className={styles.list}>
                    {items.map((order) => (
                        <li key={order.orderNo} className={styles.item}>
                            <Link
                                href={PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                    '[orderNo]',
                                    order.orderNo,
                                )}
                                className={styles.link}
                            >
                                {t('주문번호')} {order.orderNo}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default RecentOrderProducts;
