import {
    filter,
    flatMap,
    includes,
    map,
    pipe,
    prop,
    toArray,
} from '@fxts/core';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/cart/summary/index.css';
import { Button } from '@/shared/ui';
import useCart from '@/hooks/cart/useCart';
import { useCartOrderAction } from '@/hooks/order/useCartOrderAction';
import { useCartPrice } from '@/hooks/query/order/cart';
import useGuestCartList from '@/hooks/query/order/guestOrder/useGuestCartList';
import { useAuth } from '@/hooks/useAuth';
import type { GetCartData } from '@/models/order/guestOrder';
import { CURRENCY } from '@/utils/currency';

interface CartSummaryProps {
    checkedCartNoList: number[];
}

const CartSummary = ({ checkedCartNoList }: CartSummaryProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { cartInfo } = useCart();
    const { onOrderButtonClick, isOrderSheetPending } = useCartOrderAction();

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
                filter((c) => includes(c.cartNo, checkedCartNoList)),
                map((c) => ({
                    productNo: c.productNo,
                    optionNo: c.optionNo,
                    orderCnt: c.orderCnt,
                    optionInputs: c.optionInputs?.map((input) => ({
                        inputLabel: input.inputLabel,
                        inputValue: input.inputValue,
                    })),
                    baseProductNo: c.baseProductNo,
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
            options: {
                enabled: !!isLogin && checkedCartNoList.length > 0,
            },
        });

    const guestCartData = useMemo(
        () =>
            products.map((item, idx) => ({
                ...item,
                cartNo: checkedCartNoList[idx] ?? idx + 1,
            })) as GetCartData,
        [products, checkedCartNoList],
    );

    const { data: guestCartListData, isFetching: isGuestCartListFetching } =
        useGuestCartList({
            data: guestCartData,
            searchParams: {
                divideInvalidProducts: true,
            },
            options: {
                enabled: !isLogin && guestCartData.length > 0,
            },
        });

    const calculate = isLogin ? calculateData : guestCartListData?.price;
    const isPriceFetching = isLogin
        ? isCartPriceFetching
        : isGuestCartListFetching;

    const standardAmt =
        checkedCartNoList.length > 0 ? calculate?.standardAmt || 0 : 0;
    const totalDeliveryAmt =
        checkedCartNoList.length > 0 ? calculate?.totalDeliveryAmt || 0 : 0;
    const discountAmt =
        checkedCartNoList.length > 0 ? calculate?.discountAmt || 0 : 0;
    const accumulationAmtWhenBuyConfirm =
        checkedCartNoList.length > 0
            ? calculate?.accumulationAmtWhenBuyConfirm || 0
            : 0;
    const totalAmt =
        checkedCartNoList.length > 0 ? calculate?.totalAmt || 0 : 0;

    const onPurchaseClick = () => {
        onOrderButtonClick({
            products,
            cartNos: checkedCartNoList,
        });
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

            <div className={styles.bottomSticky}>
                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    onClick={onPurchaseClick}
                    disabled={isPriceFetching || isOrderSheetPending}
                    className={styles.orderButton}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}
                >
                    {isPriceFetching ? (
                        <Loader2 className={styles.spinner} />
                    ) : (
                        <>
                            {CURRENCY(totalAmt).format()} (
                            {checkedCartNoList.length}
                            개) 주문하기
                        </>
                    )}
                </Button>
            </div>
        </aside>
    );
};

export default CartSummary;
