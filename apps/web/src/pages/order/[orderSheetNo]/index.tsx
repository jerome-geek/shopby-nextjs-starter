import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { paymentReserveSchema, PaymentReserveSchemaType } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { useAuth } from '@/hooks/useAuth';
import { useMyApp } from '@/hooks/myapp';
import { useOrderSheetInitialize } from '@/hooks/order';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { GetServerSideProps } from 'next';
import OrderPaymentSummary from '@/components/order/payment-summary';
import PaymentMethod from '@/components/order/payment-method';
import Accumulation from '@/components/order/accumulation';
import Coupon from '@/components/order/coupon';
import OrderProducts from '@/components/order/order-products';
import OrdererInfo from '@/components/order/orderer-info';
import ShippingAddress from '@/components/order/shipping-address';
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
    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    return (
        <div id='order-sheet-container' className={styles.container}>
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

                    <hr className={styles.contentDivider} />

                    <Coupon />

                    <hr className={styles.contentDivider} />

                    <Accumulation />

                    <hr className={styles.contentDivider} />

                    <PaymentMethod />
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
