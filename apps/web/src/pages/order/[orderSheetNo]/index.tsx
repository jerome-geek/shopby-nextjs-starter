import {
    getPaymentSchema,
    PaymentReserveSchemaType,
} from '@/schema/payment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { CSRLayout } from '@/components/layout';
import Accumulation from '@/components/order/accumulation';
import Coupon from '@/components/order/coupon';
import OrderProducts from '@/components/order/order-products';
import OrdererInfo from '@/components/order/orderer-info';
import PaymentMethod from '@/components/order/payment-method';
import OrderPaymentSummary from '@/components/order/payment-summary';
import ShippingAddress from '@/components/order/shipping-address';
import { PATHS } from '@/const/paths';
import { useOrderSheetInitialize } from '@/entities/order/hooks';
import { useSb } from '@/hooks/libs/shopby';
import { useMyApp } from '@/hooks/myapp';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/order/[orderSheetNo]/index.css';
import payment from '@/utils/order/payment';

const OrderSheetPage = ({ orderSheetNo }: { orderSheetNo: string }) => {
    const isLogin = useAuth();
    const { isMyApp } = useMyApp();

    const isKorean = process.env.NEXT_PUBLIC_LOCALE === 'ko';
    const paymentSchema = useMemo(
        () =>
            getPaymentSchema({
                isLogin: !!isLogin,
                isGlobalMall: !isKorean,
            }),
        [isLogin, isKorean],
    );

    const methods = useForm<PaymentReserveSchemaType>({
        resolver: zodResolver(paymentSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            orderSheetNo,
            orderer: {
                ordererName: '',
                // ordererLastName: '',
                // ordererFirstName: '',
                ordererContact1: { prefix: '010', middle: '', suffix: '' },
                ordererEmail: '',
            },
            // shippingAddress: {
            //     addressNo: 0,
            //     countryCd: 'KR',
            //     receiverZipCd: '',
            // },
            inAppYn: isMyApp ? 'Y' : 'N',
            member: !!isLogin,
            orderMemo: '',
            updateMember: false,
            useDefaultAddress: false,
            subPayAmt: 0,
            savesLastPayType: true,
            customTermsAgrees: [],
            saveAddressBook: false,
            applyCashReceipt: true,
            cashReceipt: {
                cashReceiptIssuePurposeType: 'INCOME_TAX_DEDUCTION',
                cashReceiptKeyType: 'MOBILE_NO',
            },
        },
    });

    return (
        <ShopbyApiErrorBoundary fallback={<p>Loading...</p>}>
            <FormProvider {...methods}>
                <CSRLayout>
                    <OrderSheetContent orderSheetNo={orderSheetNo} />
                </CSRLayout>
            </FormProvider>
        </ShopbyApiErrorBoundary>
    );
};

const OrderSheetContent = ({ orderSheetNo }: { orderSheetNo: string }) => {
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();

    useOrderSheetInitialize({
        orderSheetNo,
    });

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    useSb({ orderSheet: orderSheetData });

    const { handleSubmit } = useFormContext<PaymentReserveSchemaType>();

    const onSubmit = handleSubmit(
        async (data) => {
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
                console.log('🚀 ~ OrderSheetContent ~ submitData:', submitData);

                const originalAlert = window.alert;

                // eslint-disable-next-line
                window.alert = () => {
                    return;
                };

                const successCallback = () => {
                    window.alert = originalAlert;
                };

                const errorCallback = async (error: ShopByErrorResponse) => {
                    console.log('에러 발생', error);

                    if (error.status === HttpStatusCode.Unauthorized) {
                        // NOTE : 401에러 떨어지면 주문 정보를 다시 조회하여 토큰 재발급 로직 실행 or 로그인 만료 처리
                        // orderSheetRefetch();
                        return;
                    }

                    await openAsyncDialog({
                        message: error.message,
                        onConfirmReturnValue: false,
                        onCloseReturnValue: false,
                    });

                    window.alert = originalAlert;
                };

                payment.setConfiguration();

                payment.reservation(submitData, successCallback, errorCallback);
            } catch (error) {}
        },
        (error) => {
            console.log('🚀 ~ OrderSheetContent ~ error:', error);
        },
    );

    return (
        <form
            id='order-sheet-container'
            className={styles.container}
            onSubmit={onSubmit}
        >
            <h1 className={styles.title}>주문하기</h1>

            <div className={styles.contentWrapper}>
                <article className={styles.articleContent}>
                    <OrderProducts
                        deliveryGroups={orderSheetData.deliveryGroups}
                    />

                    <hr className={styles.contentDivider} />

                    <OrdererInfo />

                    <hr className={styles.contentDivider} />

                    <ShippingAddress />

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
