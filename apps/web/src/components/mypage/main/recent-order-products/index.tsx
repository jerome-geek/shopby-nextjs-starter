import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '@fxts/core';

import { NoResult } from '@/components/common/no-result';
import * as styles from '@/components/mypage/main/recent-order-products/index.css';
import { PATHS } from '@/const/paths';
import { useMyOrderList } from '@/hooks/query/order/myOrder';
import ImageWrapper from '@/components/ui/image';

const RecentOrderProducts = () => {
    const { t } = useTranslation();

    const { data: myOrderListData } = useMyOrderList({
        searchParams: {
            pageNumber: 1,
            pageSize: 5,
        },
    });

    const orderList = myOrderListData?.items ?? [];

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{t('최근 주문')}</h2>

            {isEmpty(orderList) ? (
                <NoResult
                    text={
                        <p className={styles.noResultText}>
                            {t('최근 주문이 없습니다.')}
                        </p>
                    }
                    style={{
                        height: '40px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                    icon={null}
                />
            ) : (
                <ul className={styles.list}>
                    {orderList.map((order) => {
                        const firstOrderOption = order.orderOptions?.[0];

                        const thumbnailSrc = firstOrderOption?.imageUrl ?? '';
                        const thumbnailAlt =
                            firstOrderOption?.productName ?? t('상품 이미지');
                        const productName =
                            firstOrderOption?.productName ?? t('상품 이미지');
                        const orderNo = order.orderNo;
                        const orderOptionsLength =
                            order.orderOptions?.length ?? 1;

                        return (
                            <li key={orderNo} className={styles.item}>
                                <Link
                                    href={PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                        '[orderNo]',
                                        orderNo,
                                    )}
                                    prefetch={false}
                                    className={styles.link}
                                >
                                    <div className={styles.content}>
                                        <div
                                            className={
                                                styles.thumbnailContainer
                                            }
                                        >
                                            <ImageWrapper
                                                src={thumbnailSrc}
                                                alt={thumbnailAlt}
                                                loading='lazy'
                                            />
                                        </div>

                                        <div className={styles.text}>
                                            <div className={styles.productName}>
                                                {productName
                                                    ? `${productName}${
                                                          orderOptionsLength > 1
                                                              ? ` ${t(
                                                                    '외 {{count}}건',
                                                                    {
                                                                        count:
                                                                            orderOptionsLength -
                                                                            1,
                                                                    },
                                                                )}`
                                                              : ''
                                                      }`
                                                    : t(
                                                          '주문번호 {{orderNo}}',
                                                          {
                                                              orderNo: orderNo,
                                                          },
                                                      )}
                                            </div>
                                            <div className={styles.orderMeta}>
                                                {t('주문번호')} {orderNo}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default RecentOrderProducts;
