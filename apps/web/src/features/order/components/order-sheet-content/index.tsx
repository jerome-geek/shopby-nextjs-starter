import { HttpStatusCode } from 'axios';
import { overlay } from 'overlay-kit';
import { FieldErrors, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Accumulation from '@/components/order/accumulation';
import Coupon from '@/components/order/coupon';
import OrderProducts from '@/components/order/order-products';
import OrdererInfo from '@/components/order/orderer-info';
import PaymentMethod from '@/components/order/payment-method';
import OrderPaymentSummary from '@/components/order/payment-summary';
import ShippingAddress from '@/components/order/shipping-address';
import { OVERLAY_ID } from '@/const/overlay';
import { useOrderSheetInitialize } from '@/entities/order/hooks';
import { GiftReceiverInfo } from '@/features/order/components/gift-receiver-info';
import * as styles from '@/features/order/components/order-sheet-content/index.css';
import { useOrderPostMessage } from '@/features/order/hooks';
import { useSb } from '@/hooks/libs/shopby';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import type { PaymentReserveSchemaType } from '@/schema/payment.schema';
import Seo from '@/shared/components/common/seo';
import { guestTokenCookie } from '@/utils/cookie';
import payment from '@/utils/order/payment';

interface OrderSheetContentProps {
    orderSheetNo: string;
    isGift?: boolean;
}

const buildSubmitData = (data: PaymentReserveSchemaType) => {
    const { orderer, shippingAddress } = data;

    return {
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
};

const buildGiftSubmitData = (data: PaymentReserveSchemaType) => {
    const { orderer, shippingAddress } = data;

    return {
        ...data,
        orderer: {
            ...orderer,
            ordererContact1: `${orderer.ordererContact1.prefix}${orderer.ordererContact1.middle}${orderer.ordererContact1.suffix}`,
        },
        shippingAddress: {
            ...shippingAddress,
            receiverName: shippingAddress.receiverName,
            receiverZipCd: '',
            receiverAddress: '',
            receiverDetailAddress: '',
            receiverJibunAddress: '',
            receiverContact1: '',
            usesShippingInfoLaterInput: true,
            shippingInfoLaterInputContact:
                shippingAddress.shippingInfoLaterInputContact,
        },
    };
};

export const OrderSheetContent = ({
    orderSheetNo,
    isGift = false,
}: OrderSheetContentProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();

    const { methods, orderSheetData } = useOrderSheetInitialize({
        orderSheetNo,
        isGift,
    });
    useOrderPostMessage();

    useSb({ orderSheet: orderSheetData });

    const { handleSubmit } = methods;

    const onInvalidSubmit = (errors: FieldErrors<PaymentReserveSchemaType>) => {
        console.error('[order-sheet] form validation failed', {
            isGift,
            errors,
        });
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            const submitData = isGift
                ? buildGiftSubmitData(data)
                : buildSubmitData(data);

            const successCallback = () => {
                guestTokenCookie.clear();
            };

            const errorCallback = async (error: ShopByErrorResponse) => {
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
            console.error(error);
            await openAsyncDialog({
                message: '주문 데이터 처리 중 오류가 발생했습니다.',
            });
            overlay.close(OVERLAY_ID.LOADING);
        }
    }, onInvalidSubmit);

    return (
        <FormProvider {...methods}>
            <Seo title={isGift ? t('선물하기') : t('주문서')} />

            <form
                id='order-sheet-container'
                className={styles.container}
                onSubmit={onSubmit}
            >
                <h1 className={styles.title}>
                    {isGift ? t('선물하기') : t('주문하기')}
                </h1>

                <div className={styles.contentWrapper}>
                    <article className={styles.articleContent}>
                        <OrderProducts
                            deliveryGroups={orderSheetData.deliveryGroups}
                        />

                        <hr className={styles.contentDivider} />

                        <OrdererInfo />

                        <hr className={styles.contentDivider} />

                        {isGift ? (
                            <GiftReceiverInfo />
                        ) : (
                            <ShippingAddress orderSheetNo={orderSheetNo} />
                        )}

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

                    <OrderPaymentSummary orderSheetNo={orderSheetNo} />
                </div>
            </form>
        </FormProvider>
    );
};
