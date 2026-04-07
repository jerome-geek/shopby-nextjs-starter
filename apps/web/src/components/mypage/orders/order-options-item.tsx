import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import * as styles from '@/components/mypage/orders/order-options-item.css';
import { NextActionButton } from '@/components/mypage/orders/next-action-button';
import { PATHS } from '@/const/paths';
import { OrderOption } from '@/models/order';
import { useResponsive } from '@/hooks/utils';
import { CURRENCY } from '@/utils/currency';

type MypageOrderOptionListItemProps = Pick<
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
    | 'inputs'
    | 'isExtraProduct'
    | 'baseProductName'
    | 'nextActions'
>;

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
}: MypageOrderOptionListItemProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const isBuyConfirm = orderStatusType === 'BUY_CONFIRM';
    const finalPrice = price?.salePrice ?? 0;

    return (
        <li className={styles.itemContainer}>
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
                >
                    <img
                        src={imageUrl || ''}
                        alt={productName}
                        className={styles.thumbnail}
                    />
                </Link>

                <div className={styles.productContentContainer}>
                    {isMobile && (
                        <span
                            className={`${styles.statusText} ${
                                isBuyConfirm ? styles.statusTextPrimary : ''
                            }`}
                        >
                            {claimStatusTypeLabel || orderStatusTypeLabel}
                        </span>
                    )}

                    {isExtraProduct ? (
                        <>
                            <p className={styles.baseProductName}>
                                <span className={styles.productBadge}>
                                    [{t('본상품')}]
                                </span>
                                {baseProductName}
                            </p>
                            <p className={styles.productName}>
                                <span className={styles.productBadge}>
                                    [{t('추가상품')}]
                                </span>{' '}
                                {productName}
                            </p>
                        </>
                    ) : (
                        <p className={styles.productName}>
                            {isFreeGift && (
                                <span className={styles.productBadge}>
                                    [{t('사은품')}]
                                </span>
                            )}{' '}
                            {productName}
                        </p>
                    )}

                    {optionTitle && (
                        <p className={styles.optionText}>
                            {optionTitle} | {orderCnt}
                            {t('개')}
                        </p>
                    )}

                    {!isFreeGift && (
                        <p className={styles.priceText}>
                            {CURRENCY(finalPrice).format()}
                        </p>
                    )}
                </div>
            </div>

            {!isMobile && (
                <div className={styles.statusContainer}>
                    <span
                        className={`${styles.statusText} ${
                            isBuyConfirm ? styles.statusTextPrimary : ''
                        }`}
                    >
                        {claimStatusTypeLabel || orderStatusTypeLabel}
                    </span>
                </div>
            )}

            {!isMobile && (
                <div className={styles.actionsContainer}>
                    {nextActions && nextActions.length > 0 ? (
                        nextActions.map((action) => (
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
                        ))
                    ) : (
                        <>
                            <button
                                type='button'
                                className={styles.actionButton}
                            >
                                {t('내역조회')}
                            </button>
                            {isBuyConfirm && (
                                <button
                                    type='button'
                                    className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                                >
                                    {t('리뷰작성')}
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </li>
    );
};
