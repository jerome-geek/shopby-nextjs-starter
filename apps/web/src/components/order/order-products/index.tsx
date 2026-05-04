import { concat, map, pipe, sort, toArray, zip } from '@fxts/core';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/order/order-products/index.css';
import { useResponsive } from '@/hooks/utils';
import type { DeliveryGroup } from '@/models/order/orderSheet';
import { CURRENCY } from '@/utils/currency';

interface OrderProductsProps {
    deliveryGroups: DeliveryGroup[];
}

const OrderProducts = ({ deliveryGroups }: OrderProductsProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const imageSize = isMobile ? '144x144' : '256x256';

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>{t('주문 상품')}</h3>

            <ul className={styles.productList}>
                {deliveryGroups.map((group) =>
                    group.orderProducts.map((product) =>
                        product.orderProductOptions.map((option) => {
                            const optionLabels = pipe(
                                option.optionInputs ?? [],
                                sort(
                                    (a, b) =>
                                        (a.inputNo ?? 0) - (b.inputNo ?? 0),
                                ),
                                map((c) => ({
                                    label: c.inputLabel,
                                    value: c.inputValue,
                                })),
                                concat(
                                    option.optionType === 'PRODUCT_ONLY'
                                        ? []
                                        : pipe(
                                              option.optionValue.split('|'),
                                              zip(option.optionName.split('|')),
                                              map(([value, name]) => ({
                                                  label: name,
                                                  value,
                                              })),
                                          ),
                                ),
                                toArray,
                            );

                            return (
                                <li
                                    key={`${product.productNo}-${option.optionNo}`}
                                    className={styles.productItem}
                                >
                                    <img
                                        src={`${option.imageUrl || product.imageUrl}?${imageSize}`}
                                        alt={`${product.productName}${option.optionValue ? ` - ${option.optionValue}` : ''}`}
                                        className={styles.thumbnail}
                                    />
                                    <article className={styles.productInfo}>
                                        <div
                                            className={
                                                styles.productTextContainer
                                            }
                                        >
                                            {product.brandName && (
                                                <p className={styles.brandName}>
                                                    {product.brandName}
                                                </p>
                                            )}
                                            <h4 className={styles.productName}>
                                                {product.productName}
                                            </h4>
                                            <dl className={styles.optionList}>
                                                {optionLabels.map(
                                                    (
                                                        { label, value },
                                                        index,
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className={
                                                                styles.optionItem
                                                            }
                                                        >
                                                            <dt
                                                                className={
                                                                    styles.optionLabel
                                                                }
                                                            >
                                                                {label}
                                                            </dt>
                                                            <dd
                                                                className={
                                                                    styles.optionValue
                                                                }
                                                            >
                                                                {value}
                                                            </dd>
                                                        </div>
                                                    ),
                                                )}
                                            </dl>
                                        </div>

                                        <div className={styles.priceContainer}>
                                            <p className={styles.orderCnt}>
                                                {`수량 ${option.orderCnt}개`}
                                            </p>

                                            <data
                                                className={styles.buyAmt}
                                                value={option.price.buyAmt}
                                            >
                                                {CURRENCY(
                                                    option.price.buyAmt,
                                                ).format()}
                                            </data>
                                        </div>
                                    </article>
                                </li>
                            );
                        }),
                    ),
                )}
            </ul>
        </section>
    );
};

export default OrderProducts;
