import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { RecipeRecommendationBottomSheet } from '@/components/bottom-sheet/recipe-recommendation';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { CongratulationIcon } from '@/components/icons/login/Congratulation';
import { CSRLayout } from '@/components/layout';
import { RecipeRecommendationModal } from '@/components/modal/recipe-recommendation';
import { PATHS } from '@/const/paths';
import useGuestOrderDetail from '@/hooks/suspenseQuery/order/guestOrder/useGuestOrderDetail';
import useOrderDetail from '@/hooks/suspenseQuery/order/myOrder/useOrderDetail';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import type { OrderDetailResponse } from '@/models/order';
import * as styles from '@/pages/order/complete/index.css';

/**
 * [회원 주문 내역 렌더러]
 */
const MemberOrderContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderInfo } = useOrderDetail({ orderNo });
    return <OrderDetailsContent orderInfo={orderInfo} isLogin={true} />;
};

/**
 * [비회원 주문 내역 렌더러]
 */
const GuestOrderContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderInfo } = useGuestOrderDetail({ orderNo });
    return <OrderDetailsContent orderInfo={orderInfo} isLogin={false} />;
};

/**
 * [공통 주문 정보 UI 컴포넌트]
 */
const OrderDetailsContent = ({
    orderInfo,
    isLogin,
}: {
    orderInfo: OrderDetailResponse;
    isLogin: boolean;
}) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

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
                <p
                    style={{
                        marginTop: '12px',
                        color: '#666',
                        fontSize: '14px',
                    }}
                >
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
                                    className={styles.infoValue}
                                    style={{ color: '#ff4d4d' }}
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
                <div
                    className={styles.productList}
                    style={{ marginTop: '20px' }}
                >
                    {orderOptions.map((option, idx) => (
                        <div
                            key={`${option.orderOptionNo}-${idx}`}
                            className={styles.productItem}
                        >
                            <img
                                src={option.imageUrl}
                                alt={option.productName}
                                className={styles.productImage}
                            />
                            <div className={styles.productContent}>
                                <p className={styles.productBrand}>
                                    {option.brandName}
                                </p>
                                <h3 className={styles.productName}>
                                    {option.productName}
                                </h3>
                                {option.optionName && (
                                    <p
                                        style={{
                                            fontSize: '12px',
                                            color: '#888',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {option.optionName}:{' '}
                                        {option.optionValue}
                                    </p>
                                )}
                                <div className={styles.productFooter}>
                                    <p className={styles.orderCount}>
                                        {t('수량')} {option.orderCnt}
                                        {t('개')}
                                    </p>
                                    <p className={styles.productPrice}>
                                        {option.price.buyAmt.toLocaleString()}
                                        {t('원')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.summaryContainer}>
                <div className={styles.summaryRow}>
                    <span>{t('상품 금액')}</span>
                    <span>
                        {lastOrderAmount.standardAmt.toLocaleString()}
                        {t('원')}
                    </span>
                </div>
                <div className={styles.summaryRow}>
                    <span>{t('할인 금액')}</span>
                    <span>
                        -
                        {(
                            lastOrderAmount.immediateDiscountAmt +
                            lastOrderAmount.additionalDiscountAmt +
                            lastOrderAmount.productCouponDiscountAmt +
                            lastOrderAmount.cartCouponDiscountAmt
                        ).toLocaleString()}
                        {t('원')}
                    </span>
                </div>
                <div className={styles.summaryRow}>
                    <span>{t('배송비')}</span>
                    <span>
                        {lastOrderAmount.deliveryAmt > 0
                            ? `${lastOrderAmount.deliveryAmt.toLocaleString()}원`
                            : t('무료')}
                    </span>
                </div>
                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>
                        {t('총 결제 금액')}
                    </span>
                    <span className={styles.totalPrice}>
                        {lastOrderAmount.chargeAmt.toLocaleString()}
                        {t('원')}
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

/**
 * [주문 실패 컴포넌트]
 */
const OrderFail = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.failContainer}>
            <div className={styles.failIcon}>⚠️</div>
            <h1 className={styles.failTitle}>{t('주문에 실패하였습니다')}</h1>
            <p className={styles.failDescription}>
                {t(
                    '결제 도중 오류가 발생했거나 주문 정보가 유효하지 않습니다.',
                )}
                <br />
                {t('문제가 지속되면 고객센터로 문의해주세요.')}
            </p>
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center',
                }}
            >
                <Link
                    href='/'
                    className={styles.ghostButton}
                    style={{ padding: '12px 32px' }}
                >
                    {t('메인으로 가기')}
                </Link>
                <button
                    onClick={() => window.location.reload()}
                    className={styles.primaryButton}
                    style={{ padding: '12px 32px' }}
                >
                    {t('다시 시도하기')}
                </button>
            </div>
        </div>
    );
};

const OrderComplete = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const hasOpenedRef = useRef(false);

    const {
        orderNo,
        result = 'SUCCESS',
        guestToken = null,
    } = router.query as {
        orderNo: string;
        result: 'SUCCESS' | 'FAIL';
        guestToken?: string;
    };

    // useEffect(() => {
    //     if (guestToken) {
    //         authCookieManager.setGuestToken(guestToken);
    //     }
    // }, [guestToken]);

    useEffect(() => {
        if (!router.isReady || hasOpenedRef.current) {
            return;
        }

        if (!isMobile && window.opener) {
            window.opener.location.href = window.location.href;
            setTimeout(() => {
                window.close();
            }, 500);
        }

        if (result === 'SUCCESS' && orderNo) {
            hasOpenedRef.current = true;
            if (isMobile) {
                overlay.open(({ isOpen, close, unmount }) => (
                    <RecipeRecommendationBottomSheet
                        isOpen={isOpen}
                        close={close}
                        unmount={unmount}
                    />
                ));
            } else {
                overlay.open(({ isOpen, close, unmount }) => (
                    <RecipeRecommendationModal
                        isOpen={isOpen}
                        close={close}
                        unmount={unmount}
                    />
                ));
            }
        }
    }, [router.isReady, result, orderNo]);

    if (router.isReady && !orderNo && result === 'SUCCESS') {
        void router.replace('/');
        return null;
    }

    return (
        <CSRLayout>
            <div
                style={{
                    minHeight: '100vh',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {result === 'SUCCESS' && orderNo ? (
                    <ShopbyApiErrorBoundary
                        fallback={
                            <div
                                style={{
                                    padding: '100px',
                                    textAlign: 'center',
                                }}
                            >
                                {t('데이터를 불러오는 중 오류가 발생했습니다.')}
                            </div>
                        }
                    >
                        <Suspense
                            fallback={
                                <div
                                    style={{
                                        padding: '100px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {t('로딩 중...')}
                                </div>
                            }
                        >
                            {isLogin ? (
                                <MemberOrderContent orderNo={orderNo} />
                            ) : (
                                <GuestOrderContent orderNo={orderNo} />
                            )}
                        </Suspense>
                    </ShopbyApiErrorBoundary>
                ) : (
                    <OrderFail />
                )}
            </div>
        </CSRLayout>
    );
};

export default OrderComplete;
