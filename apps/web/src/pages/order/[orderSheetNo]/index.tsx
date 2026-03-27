import { Suspense } from 'react';
import { useRouter } from 'next/router';
import {
    FormProvider,
    useForm,
    useWatch,
    UseFormReturn,
    useFormContext,
} from 'react-hook-form';
import { paymentReserveSchema, PaymentReserveSchemaType } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { useAuth } from '@/hooks/useAuth';
import { useMyApp } from '@/hooks/myapp';
import { useOrderSheetInitialize } from '@/hooks/order';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { GetOrderSheetResponse } from '@/models/order/orderSheet';
import { GetServerSideProps } from 'next';
import OrderPaymentSummary from '@/components/order/payment-summary';
import PaymentMethod from '@/components/order/payment-method';
import * as styles from '@/pages/order/[orderSheetNo]/index.css';

const OrderSheetPage = () => {
    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const isLogin = useAuth();
    const { isMyApp } = useMyApp();

    const methods = useForm<PaymentReserveSchemaType>({
        resolver: zodResolver(paymentReserveSchema),
        defaultValues: {
            orderSheetNo,
            shippingAddress: {
                addressNo: 0,
                countryCd: 'KR',
                receiverZipCd: '',
            },
            selectAddress: !isLogin,
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

    const { setValue, reset } = methods;

    useOrderSheetInitialize({
        orderSheetNo,
        setValue,
        reset,
    });

    return (
        <ShopbyApiErrorBoundary fallback={<p>Loading...</p>}>
            <FormProvider {...methods}>
                <OrderSheetContent orderSheetNo={orderSheetNo} />
            </FormProvider>
        </ShopbyApiErrorBoundary>
    );
};

const OrderSheetContent = ({ orderSheetNo }: { orderSheetNo: string }) => {
    const methods = useFormContext<PaymentReserveSchemaType>();

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    return (
        <div id='order-sheet-container' className={styles.container}>
            <h1 className={styles.title}>주문하기</h1>

            <div className={styles.contentWrapper}>
                {/* 좌측: 컨텐츠 영역 (article 또는 section 권장) */}
                <article className={styles.articleContent}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                        }}
                    >
                        <div
                            style={{
                                height: '400px',
                                border: '1px dashed #ccc',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                            }}
                        >
                            주문 상품 영역
                        </div>

                        <hr className={styles.contentDivider} />

                        <div
                            style={{
                                height: '300px',
                                border: '1px dashed #ccc',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                            }}
                        >
                            주문자 정보 영역
                        </div>

                        <hr className={styles.contentDivider} />

                        <div
                            style={{
                                height: '500px',
                                border: '1px dashed #ccc',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                            }}
                        >
                            배송지 정보 영역
                        </div>

                        <hr className={styles.contentDivider} />

                        <div
                            style={{
                                height: '500px',
                                border: '1px dashed #ccc',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                            }}
                        >
                            쿠폰 영역
                        </div>

                        <hr className={styles.contentDivider} />

                        <div
                            style={{
                                height: '500px',
                                border: '1px dashed #ccc',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                            }}
                        >
                            적립금 영역
                        </div>

                        <hr className={styles.contentDivider} />

                        <PaymentMethod />
                    </div>
                    <details style={{ marginTop: '40px' }}>
                        <summary style={{ cursor: 'pointer', color: '#666' }}>
                            Raw Data 확인
                        </summary>
                        <pre
                            style={{
                                fontSize: '11px',
                                background: '#f5f5f5',
                                padding: '10px',
                            }}
                        >
                            {JSON.stringify(orderSheetData, null, 2)}
                        </pre>
                    </details>
                </article>

                {/* 우측: 사이드바 (aside 사용) */}
                <OrderPaymentSummary orderSheetNo={orderSheetNo} />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const orderSheetNo = params?.orderSheetNo as string;

    if (!orderSheetNo) {
        return { notFound: true };
    }

    return {
        props: { orderSheetNo },
    };
};

export default OrderSheetPage;
