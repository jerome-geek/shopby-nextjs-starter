import { filter, pipe, toArray } from '@fxts/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CongratulationIcon } from '@/components/icons/login/Congratulation';
import { OrderProductItem } from '@/components/order/order-product-item';
import { PATHS } from '@/const/paths';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import type { OrderDetailResponse } from '@/models/order';
import { CURRENCY } from '@/utils/currency';

import * as styles from '@/features/order/components/order-details-content/index.css';

interface OrderDetailsContentProps {
    orderInfo: OrderDetailResponse;
}

/**
 * [공통 주문 정보 UI 컴포넌트]
 */
const OrderDetailsContent = ({ orderInfo }: OrderDetailsContentProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const isLogin = useAuth();

    const {
        orderNo,
        orderYmdt,
        orderer,
        shippingAddress,
        lastOrderAmount,
        payTypeLabel,
        payType,
        payInfo,
        orderOptionsGroupByPartner,
    } = orderInfo;

    const orderOptions = useMemo(() => {
        if (!orderOptionsGroupByPartner) return [];
        return orderOptionsGroupByPartner.flatMap((partner) =>
            partner.orderOptionsGroupByDelivery.flatMap(
                (delivery) => delivery.orderOptions,
            ),
        );
    }, [orderOptionsGroupByPartner]);

    const bankInfo = useMemo(() => {
        if (
            (payType === 'VIRTUAL_ACCOUNT' || payType === 'ACCOUNT') &&
            payInfo?.bankInfo
        ) {
            return payInfo.bankInfo;
        }
        return null;
    }, [payType, payInfo]);

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.bannerIcon}>
                    <CongratulationIcon
                        width={isMobile ? 50 : 67}
                        height={isMobile ? 50 : 67}
                    />
                </div>
                <h1 className={styles.bannerTitle}>
                    {t('주문이 완료되었습니다!')}
                </h1>
                <p className={styles.bannerDate}>
                    {dayjs(orderYmdt).format('YYYY.MM.DD HH:mm')} 주문
                </p>
            </div>

            <div className={styles.infoGrid}>
                <div className={styles.infoColumn}>
                    <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>
                            {t('주문번호')}
                        </span>
                        <span className={styles.infoValue}>{orderNo}</span>
                    </p>
                    <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>
                            {t('결제 수단')}
                        </span>
                        <span className={styles.infoValue}>{payTypeLabel}</span>
                    </p>
                    {bankInfo && (
                        <>
                            <p className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                    {t('입금계좌')}
                                </span>
                                <span className={styles.infoValue}>
                                    {bankInfo.bankName} {bankInfo.account}{' '}
                                    (예금주: {bankInfo.depositorName})
                                </span>
                            </p>
                            <p className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                    {t('입금기한')}
                                </span>
                                <span
                                    className={`${styles.infoValue} ${styles.bankLimitDate}`}
                                >
                                    {dayjs(
                                        bankInfo.paymentExpirationYmdt,
                                    ).format('YYYY.MM.DD HH:mm')}{' '}
                                    {t('까지')}
                                </span>
                            </p>
                        </>
                    )}
                </div>
                <div className={styles.infoColumn}>
                    <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>{t('주문자')}</span>
                        <span className={styles.infoValue}>
                            {orderer.ordererName}
                        </span>
                    </p>
                    <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>{t('연락처')}</span>
                        <span className={styles.infoValue}>
                            {orderer.ordererContact1}
                        </span>
                    </p>
                    <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>{t('배송지')}</span>
                        <span className={styles.infoValue}>
                            [{shippingAddress.receiverZipCd}]{' '}
                            {shippingAddress.receiverAddress}{' '}
                            {shippingAddress.receiverDetailAddress}
                        </span>
                    </p>
                </div>
            </div>

            <hr className={styles.divider} />

            <div>
                <h2 className={styles.sectionTitle}>{t('결제 정보')}</h2>
                <div className={styles.productList}>
                    {orderOptions.map((option, idx) => {
                        const optionLabels = pipe(
                            [
                                option.optionName
                                    ? {
                                          label: option.optionName,
                                          value: option.optionValue,
                                      }
                                    : null,
                                ...(option.inputs?.map((input) => ({
                                    label: input.inputLabel ?? '',
                                    value: input.inputValue ?? '',
                                })) ?? []),
                            ],
                            filter(
                                (
                                    item,
                                ): item is { label: string; value: string } =>
                                    !!item?.label && !!item?.value,
                            ),
                            toArray,
                        );

                        return (
                            <OrderProductItem
                                key={`${option.orderOptionNo}-${idx}`}
                                imageUrl={option.imageUrl}
                                productName={option.productName}
                                brandName={option.brandName ?? ''}
                                optionLabels={optionLabels}
                                orderCnt={option.orderCnt}
                                buyAmt={option.price.buyAmt}
                            />
                        );
                    })}
                </div>
            </div>

            <div className={styles.summaryContainer}>
                <div className={styles.summaryRow}>
                    <span>{t('상품 금액')}</span>
                    <span>
                        {CURRENCY(lastOrderAmount.standardAmt).format()}
                    </span>
                </div>
                <div className={styles.summaryRow}>
                    <span>{t('할인 금액')}</span>
                    <span>
                        {CURRENCY(lastOrderAmount.immediateDiscountAmt)
                            .add(lastOrderAmount.additionalDiscountAmt)
                            .add(lastOrderAmount.productCouponDiscountAmt)
                            .add(lastOrderAmount.cartCouponDiscountAmt)
                            .multiply(-1)
                            .format()}
                    </span>
                </div>
                <div className={styles.summaryRow}>
                    <span>{t('배송비')}</span>
                    <span>
                        {lastOrderAmount.deliveryAmt > 0
                            ? CURRENCY(lastOrderAmount.deliveryAmt).format()
                            : t('무료')}
                    </span>
                </div>
                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>
                        {t('총 결제 금액')}
                    </span>
                    <span className={styles.totalPriceText}>
                        {CURRENCY(lastOrderAmount.chargeAmt).format()}
                    </span>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <Link
                    href={
                        isLogin
                            ? `${PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                  '[orderNo]',
                                  orderNo,
                              )}`
                            : `${PATHS.GUEST.ORDER.DETAIL.replace(
                                  '[orderNo]',
                                  orderNo,
                              )}`
                    }
                    className={styles.ghostButton}
                >
                    {t('주문 상세보기')}
                </Link>
                <Link href='/' className={styles.primaryButton}>
                    {t('계속 쇼핑하기')}
                </Link>
            </div>
        </div>
    );
};

export default OrderDetailsContent;
