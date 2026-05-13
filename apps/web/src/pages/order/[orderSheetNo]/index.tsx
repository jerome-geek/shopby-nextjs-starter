import { HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import { overlay } from 'overlay-kit';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import Seo from '@/components/common/seo';
import { CSRLayout } from '@/components/layout';
import Accumulation from '@/components/order/accumulation';
import Coupon from '@/components/order/coupon';
import OrderProducts from '@/components/order/order-products';
import OrdererInfo from '@/components/order/orderer-info';
import PaymentMethod from '@/components/order/payment-method';
import OrderPaymentSummary from '@/components/order/payment-summary';
import ShippingAddress from '@/components/order/shipping-address';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { useOrderSheetInitialize } from '@/entities/order/hooks';
import { useSb } from '@/hooks/libs/shopby';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/order/[orderSheetNo]/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { guestTokenCookie } from '@/utils/cookie';
import payment from '@/utils/order/payment';

const OrderSheetPage = ({ orderSheetNo }: { orderSheetNo: string }) => {
    return (
        <ShopbyAsyncBoundary
            fallback={
                <LoadingWrapper
                    isLoading
                    containerStyle={{
                        height: '80vh',
                    }}
                >
                    <span />
                </LoadingWrapper>
            }
        >
            <CSRLayout>
                <OrderSheetContent orderSheetNo={orderSheetNo} />
            </CSRLayout>
        </ShopbyAsyncBoundary>
    );
};

const OrderSheetContent = ({ orderSheetNo }: { orderSheetNo: string }) => {
    const { t } = useTranslation();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();

    const { methods, orderSheetData } = useOrderSheetInitialize({
        orderSheetNo,
    });

    useSb({ orderSheet: orderSheetData });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const originalAlert: typeof window.alert = window.alert.bind(window);

        const restoreAlert = () => {
            Object.defineProperty(window, 'alert', {
                value: originalAlert,
                writable: true,
                configurable: true,
            });
        };

        try {
            const { orderer, shippingAddress } = data;
            const submitData = {
                ...data,
                orderer: {
                    ...orderer,
                    ordererContact1: `${orderer.ordererContact1.prefix}${orderer.ordererContact1.middle}${orderer.ordererContact1.suffix}`,
                },
                shippingAddress: {
                    ...shippingAddress,
                    receiverContact1: `${shippingAddress.receiverContact1.prefix}${shippingAddress.receiverContact1.middle}${shippingAddress.receiverContact1.suffix}`,
                },
            };

            Object.defineProperty(window, 'alert', {
                value: () => {
                    return;
                },
                writable: true,
                configurable: true,
            });

            const successCallback = () => {
                restoreAlert();
                guestTokenCookie.clear();
            };

            const errorCallback = async (error: ShopByErrorResponse) => {
                restoreAlert();
                overlay.close(OVERLAY_ID.LOADING);

                if (error.status === HttpStatusCode.Unauthorized) {
                    return;
                }

                await openAsyncDialog({
                    message: error.message,
                    onConfirmReturnValue: false,
                    onCloseReturnValue: false,
                });
            };

            overlay.open(() => null, {
                overlayId: OVERLAY_ID.LOADING,
            });

            payment.setConfiguration();

            payment.reservation(submitData, successCallback, errorCallback);
        } catch (error) {
            restoreAlert();
            console.error(error);
            await openAsyncDialog({
                message: '주문 데이터 처리 중 오류가 발생했습니다.',
            });
            overlay.close(OVERLAY_ID.LOADING);
        }
    });

    return (
        <FormProvider {...methods}>
            <Seo title={t('주문서')} />

            <form
                id='order-sheet-container'
                className={styles.container}
                onSubmit={onSubmit}
            >
                <h1 className={styles.title}>{t('주문하기')}</h1>

                <div className={styles.contentWrapper}>
                    <article className={styles.articleContent}>
                        <OrderProducts
                            deliveryGroups={orderSheetData.deliveryGroups}
                        />

                        <hr className={styles.contentDivider} />

                        <OrdererInfo />

                        <hr className={styles.contentDivider} />

                        <ShippingAddress orderSheetNo={orderSheetNo} />

                        {isLogin && (
                            <>
                                <hr className={styles.contentDivider} />

                                <Coupon />

                                <hr className={styles.contentDivider} />

                                <Accumulation />
                            </>
                        )}

                        <hr className={styles.contentDivider} />

                        <PaymentMethod />
                    </article>

                    {/* 우측: 사이드바 (aside 사용) */}
                    <OrderPaymentSummary orderSheetNo={orderSheetNo} />
                </div>
            </form>
        </FormProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const orderSheetNo = params?.orderSheetNo as string;

    if (!orderSheetNo) {
        return {
            redirect: {
                destination: PATHS.MAIN,
                permanent: false,
            },
        };
    }

    return {
        props: {
            orderSheetNo,
        },
    };
};

export default OrderSheetPage;
