import { useTranslation } from 'react-i18next';

import * as styles from '@/features/order/components/order-product-item/index.css';
import { useResponsive } from '@/hooks/utils';
import { getShopbyResizeImageUrl } from '@/shared/utils/shopby';
import { CURRENCY } from '@/utils/currency';

interface OrderProductItemProps {
    imageUrl: string;
    productName: string;
    brandName?: string;
    isExtraProduct?: boolean;
    optionLabels: { label: string; value: string }[];
    orderCnt: number;
    buyAmt: number;
    className?: string;
    baseProductName?: string;
}

/**
 * [주문 상품 아이템 공통 컴포넌트]
 * 주문서(OrderSheet), 주문완료(OrderComplete) 등에서 공통으로 사용됩니다.
 */
export const OrderProductItem = ({
    imageUrl,
    productName,
    brandName,
    isExtraProduct = false,
    optionLabels,
    orderCnt,
    buyAmt,
    className,
    baseProductName,
}: OrderProductItemProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const imageSize = isMobile ? 144 : 256;

    return (
        <article className={`${styles.productItem} ${className ?? ''}`}>
            <img
                src={getShopbyResizeImageUrl(imageUrl, imageSize)}
                alt={productName}
                className={styles.thumbnail}
            />
            <div className={styles.productInfo}>
                <div className={styles.productTextContainer}>
                    {brandName && (
                        <p className={styles.brandName}>{brandName}</p>
                    )}
                    {baseProductName && (
                        <span className={styles.baseProductName}>
                            <strong>[본상품]</strong> {baseProductName}
                        </span>
                    )}
                    <h4 className={styles.productName}>
                        {isExtraProduct && (
                            <span className={styles.itemExtraProductBadge}>
                                {t('추가상품')}
                            </span>
                        )}
                        {productName}
                    </h4>
                    <dl className={styles.optionList}>
                        {optionLabels.map(({ label, value }, index) => (
                            <div key={index} className={styles.optionItem}>
                                <dt className={styles.optionLabel}>{label}</dt>
                                <dd className={styles.optionValue}>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className={styles.priceContainer}>
                    <p className={styles.orderCnt}>
                        {t('수량 {{orderCnt}}개', { orderCnt })}
                    </p>

                    <data className={styles.buyAmt} value={buyAmt}>
                        {CURRENCY(buyAmt).format()}
                    </data>
                </div>
            </div>
        </article>
    );
};
