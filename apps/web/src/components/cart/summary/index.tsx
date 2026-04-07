import { filter, flatMap, map, pipe, prop, toArray } from '@fxts/core';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/cart/summary/index.css';
import { Button } from '@/components/ui';
import useCart from '@/hooks/cart/useCart';
import { useOrderSheetMutation } from '@/hooks/mutations';
import { useCartPrice } from '@/hooks/query/order/cart';
import { useDialog } from '@/hooks/utils';
import { CURRENCY } from '@/utils/currency';

interface CartSummaryProps {
    checkedCartNoList: number[];
}

const CartSummary = ({ checkedCartNoList }: CartSummaryProps) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const { cartInfo } = useCart();
    const products = useMemo(() => {
        if (!cartInfo) {
            return [];
        }

        try {
            return pipe(
                cartInfo,
                prop('deliveryGroups'),
                flatMap((a) => a.orderProducts),
                flatMap((b) => b.orderProductOptions),
                filter((c) => checkedCartNoList.includes(c.cartNo)),
                map((c) => ({
                    productNo: c.productNo,
                    optionNo: c.optionNo,
                    // optionInputs: c.optionInput,
                    orderCnt: c.orderCnt,
                })),
                toArray,
            );
        } catch (error) {
            console.error(error);
            return [];
        }
    }, [cartInfo, checkedCartNoList]);

    const { data: calculateData, isFetching: isCartPriceFetching } =
        useCartPrice({
            searchParams: {
                cartNo: checkedCartNoList,
                divideInvalidProducts: true,
            },
        });
    console.log('🚀 ~ CartSummary ~ calculateData:', calculateData);

    const standardAmt =
        checkedCartNoList.length > 0 ? calculateData?.standardAmt || 0 : 0;
    const totalDeliveryAmt =
        checkedCartNoList.length > 0 ? calculateData?.totalDeliveryAmt || 0 : 0;
    const discountAmt =
        checkedCartNoList.length > 0 ? calculateData?.discountAmt || 0 : 0;
    const accumulationAmtWhenBuyConfirm =
        checkedCartNoList.length > 0
            ? calculateData?.accumulationAmtWhenBuyConfirm || 0
            : 0;
    const totalAmt =
        checkedCartNoList.length > 0 ? calculateData?.totalAmt || 0 : 0;

    const {
        write: {
            mutate: writeOrderSheetMutate,
            isPending: writeOrderSheetMutatePending,
        },
    } = useOrderSheetMutation();

    const onPurchaseClick = () => {
        if (checkedCartNoList.length === 0) {
            openDialog({ message: t('상품을 선택해주세요.') });
            return;
        }

        const orderData = {
            products,
            cartNos: checkedCartNoList,
        };

        writeOrderSheetMutate({ data: orderData });
    };

    return (
        <aside className={styles.summaryArea}>
            <div className={styles.summaryBox}>
                <h2 className={styles.summaryHeader}>{t('예상 결제 금액')}</h2>

                <div className={styles.summaryListContainer}>
                    <dl className={styles.summaryList}>
                        <div className={styles.summaryRow}>
                            <dt className={styles.summaryLabel}>
                                {t('총 상품 금액')}
                            </dt>
                            <dd className={styles.summaryValue}>
                                {CURRENCY(standardAmt).format()}
                            </dd>
                        </div>

                        <div className={styles.summaryRow}>
                            <dt className={styles.summaryLabel}>
                                {t('총 배송비')}
                            </dt>
                            <dd className={styles.summaryValue}>
                                {totalDeliveryAmt === 0
                                    ? '무료'
                                    : CURRENCY(totalDeliveryAmt).format()}
                            </dd>
                        </div>

                        <div className={styles.summaryRow}>
                            <dt className={styles.summaryLabel}>
                                {t('총 할인 금액')}
                            </dt>
                            <dd className={styles.summaryValue}>
                                {CURRENCY(discountAmt).multiply(-1).format()}
                            </dd>
                        </div>

                        <div className={styles.summaryRow}>
                            <dt className={styles.summaryLabel}>
                                {t('적립 예정 금액')}
                            </dt>
                            <dd className={styles.summaryValue}>
                                {CURRENCY(
                                    accumulationAmtWhenBuyConfirm,
                                ).format()}
                            </dd>
                        </div>
                    </dl>

                    <hr className={styles.summaryDivider} />

                    <dl>
                        <div className={styles.priceRow}>
                            <dt className={styles.totalPriceTitle}>
                                {t('총 결제 금액')}
                            </dt>
                            <dd className={styles.totalPrice}>
                                {CURRENCY(totalAmt).format()}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <Button
                type='submit'
                frame='solid'
                variant='primary'
                onClick={onPurchaseClick}
                disabled={isCartPriceFetching || writeOrderSheetMutatePending}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            >
                {isCartPriceFetching ? (
                    <Loader2 className={styles.spinner} />
                ) : (
                    <>
                        {CURRENCY(totalAmt).format()} (
                        {checkedCartNoList.length}
                        개) 주문하기
                    </>
                )}
            </Button>
        </aside>
    );
};

export default CartSummary;
