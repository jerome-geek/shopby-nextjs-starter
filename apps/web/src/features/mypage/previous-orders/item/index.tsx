import { useTranslation } from 'react-i18next';

import * as styles from '@/features/mypage/previous-orders/item/index.css';
import { orderMap } from '@/entities/order/constants';
import { useResponsive } from '@/hooks/utils';
import { CURRENCY } from '@/utils/currency';

interface PreviousOrderItemProps {
    productName?: Nullable<string>;
    optionName?: Nullable<string>;
    optionValue?: Nullable<string>;
    orderCnt: number;
    salePrice?: Nullable<number>;
    orderStatusType: keyof typeof orderMap | string;
}

export const PreviousOrderItem = ({
    productName,
    optionName,
    optionValue,
    orderCnt,
    salePrice,
    orderStatusType,
}: PreviousOrderItemProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const statusLabel = t(
        orderMap[orderStatusType as keyof typeof orderMap] ?? orderStatusType,
    );
    const isPrimaryStatus = orderStatusType === 'BUY_CONFIRM';
    const optionTitle = [
        optionName,
        optionValue ? `: ${optionValue}` : '',
    ].join('');

    return (
        <li className={styles.itemContainer}>
            <div className={styles.productInfoContainer}>
                <div className={styles.imageLink}>
                    <div
                        className={styles.thumbnail}
                        role='img'
                        aria-label={productName || ''}
                    />
                </div>

                <div className={styles.productContentContainer}>
                    {isMobile && (
                        <span
                            className={`${styles.statusText} ${
                                isPrimaryStatus ? styles.statusTextPrimary : ''
                            }`}
                        >
                            {statusLabel}
                        </span>
                    )}

                    <p className={styles.productName}>{productName || '-'}</p>

                    <div className={styles.optionText}>
                        <p>
                            {optionTitle} | {orderCnt}
                            {t('개')}
                        </p>
                    </div>

                    <p className={styles.priceText}>
                        {CURRENCY(salePrice ?? 0).format()}
                    </p>
                </div>
            </div>

            {!isMobile && (
                <div className={styles.statusContainer}>
                    <span
                        className={`${styles.statusText} ${
                            isPrimaryStatus ? styles.statusTextPrimary : ''
                        }`}
                    >
                        {statusLabel}
                    </span>
                </div>
            )}
        </li>
    );
};
