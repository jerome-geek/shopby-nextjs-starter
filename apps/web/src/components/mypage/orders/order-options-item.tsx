import { filter, includes, pipe, toArray } from '@fxts/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { NextActionButton } from '@/components/mypage/orders/next-action-button';
import * as styles from '@/components/mypage/orders/order-options-item.css';
import { Button } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { shouldShowNextAction } from '@/entities/mypage/utils/orders';
import type { NextAction, OrderOption } from '@/models/order';
import { Only } from '@/shared/components/only';
import { CURRENCY } from '@/utils/currency';

type MypageOrderOptionListItemProps = Omit<
    Pick<
        OrderOption,
        | 'productNo'
        | 'imageUrl'
        | 'brandName'
        | 'brandNameEn'
        | 'productName'
        | 'optionTitle'
        | 'orderCnt'
        | 'price'
        | 'optionNo'
        | 'orderOptionNo'
        | 'orderNo'
        | 'orderStatusType'
        | 'orderStatusTypeLabel'
        | 'claimStatusTypeLabel'
        | 'claimNo'
        | 'isFreeGift'
        | 'isExtraProduct'
        | 'baseProductName'
    >,
    'nextActions' | 'inputs'
> & {
    nextActions: Array<Omit<NextAction, 'actionGroupType'>>;
    showInquiryButton?: boolean;
    inputs?: Nullable<
        Array<{
            inputNo?: number;
            inputValue?: Nullable<string>;
            inputLabel?: Nullable<string>;
        }>
    >;
};

const getOrderStatusLabel = ({
    orderStatusType,
    orderStatusTypeLabel,
    claimStatusTypeLabel,
}: Pick<
    MypageOrderOptionListItemProps,
    'orderStatusType' | 'orderStatusTypeLabel' | 'claimStatusTypeLabel'
>) => {
    if (claimStatusTypeLabel) {
        return claimStatusTypeLabel;
    }

    if (
        orderStatusType === 'PRODUCT_PREPARE' ||
        orderStatusType === 'DELIVERY_PREPARE'
    ) {
        return '배송준비중';
    }

    return orderStatusTypeLabel;
};

export const OrderOptionsItem = ({
    productNo,
    imageUrl,
    productName,
    optionTitle,
    orderCnt,
    price,
    orderStatusTypeLabel,
    claimStatusTypeLabel,
    orderStatusType,
    isFreeGift,
    isExtraProduct,
    baseProductName,
    nextActions,
    optionNo,
    orderOptionNo,
    claimNo,
    orderNo,
    inputs,
    showInquiryButton = true,
}: MypageOrderOptionListItemProps) => {
    const { t } = useTranslation();

    const router = useRouter();

    const isBuyConfirm = orderStatusType === 'BUY_CONFIRM';
    const isDepositWait = orderStatusType === 'DEPOSIT_WAIT';
    const isExchangeDisabled = includes(orderStatusType, [
        'PAY_DONE',
        'PRODUCT_PREPARE',
        'DELIVERY_PREPARE',
    ]);
    const orderStatusLabel = getOrderStatusLabel({
        orderStatusType,
        orderStatusTypeLabel,
        claimStatusTypeLabel,
    });
    const isInquiryButtonVisible =
        showInquiryButton && (isDepositWait || isExchangeDisabled);

    const filteredNextActions = useMemo(() => {
        return pipe(
            nextActions,
            filter(({ nextActionType }) =>
                shouldShowNextAction(nextActionType, {
                    orderStatusType,
                    isFreeGift,
                    isExchangeDisabled,
                }),
            ),
            toArray,
        );
    }, [nextActions, orderStatusType, isFreeGift, isExchangeDisabled]);

    return (
        <div className={styles.itemContainer}>
            <div className={styles.productInfoContainer}>
                <Link
                    href={
                        isExtraProduct
                            ? '#'
                            : `${PATHS.PRODUCTS.MAIN}/${productNo}`
                    }
                    className={styles.imageLink}
                    style={{
                        pointerEvents: isExtraProduct ? 'none' : 'auto',
                    }}
                    prefetch={false}
                >
                    <img
                        src={imageUrl || ''}
                        alt={productName}
                        className={styles.thumbnail}
                    />
                </Link>

                <div className={styles.productContentContainer}>
                    <Only.Mobile>
                        <span
                            className={`${styles.statusText} ${
                                isBuyConfirm ? styles.statusTextPrimary : ''
                            }`}
                        >
                            {orderStatusLabel}
                        </span>
                    </Only.Mobile>

                    {isExtraProduct ? (
                        <>
                            <p className={styles.baseProductName}>
                                <strong>[{t('본상품')}]</strong>{' '}
                                {baseProductName}
                            </p>
                            <p
                                className={styles.productName}
                                dangerouslySetInnerHTML={{
                                    __html: `<span class="${
                                        styles.productBadge
                                    }">${t('추가상품')}</span> ${productName}`,
                                }}
                            />
                        </>
                    ) : (
                        <p
                            className={styles.productName}
                            dangerouslySetInnerHTML={{
                                __html: `${
                                    isFreeGift
                                        ? `<span class="${
                                              styles.productBadge
                                          }">[${t('사은품')}]</span> `
                                        : ''
                                } ${productName}`,
                            }}
                        />
                    )}

                    <div className={styles.optionText}>
                        {optionTitle && (
                            <p>
                                {optionTitle} |{' '}
                                {t('{{count}}개', { count: orderCnt })}
                            </p>
                        )}
                        {inputs?.map((input) => (
                            <p key={input.inputNo}>
                                {`${input.inputLabel} ${input.inputValue}`}
                            </p>
                        ))}
                    </div>

                    {!isFreeGift && (
                        <p className={styles.priceText}>
                            {CURRENCY(price.buyAmt).format()}
                        </p>
                    )}
                </div>
            </div>

            <Only.Desktop>
                <div className={styles.statusContainer}>
                    <span
                        className={`${styles.statusText} ${
                            isBuyConfirm ? styles.statusTextPrimary : ''
                        }`}
                    >
                        {orderStatusLabel}
                    </span>
                </div>
            </Only.Desktop>

            <div className={styles.actionsContainer}>
                {filteredNextActions.map((action) => (
                    <NextActionButton
                        key={action.nextActionType}
                        nextActionType={action.nextActionType}
                        productNo={productNo}
                        optionNo={optionNo}
                        orderOptionNo={orderOptionNo}
                        orderNo={orderNo}
                        uri={action.uri}
                        isFreeGift={isFreeGift}
                        claimNo={claimNo || null}
                    />
                ))}

                {isInquiryButtonVisible && (
                    <Button
                        frame='outlined'
                        size='small'
                        onClick={() =>
                            router.push(
                                `${PATHS.MYPAGE.PRODUCT_INQUIRIES.REGISTER}?productNo=${productNo}`,
                            )
                        }
                        style={{ height: '32px', fontSize: '12px' }}
                    >
                        문의하기
                    </Button>
                )}
            </div>
        </div>
    );
};
