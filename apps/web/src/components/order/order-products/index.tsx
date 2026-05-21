import { concat, map, pipe, sort, toArray, zip } from '@fxts/core';
import { useTranslation } from 'react-i18next';

import { OrderProductItem } from '@/components/order/order-product-item';
import * as styles from '@/components/order/order-products/index.css';
import type { DeliveryGroup } from '@/models/order/orderSheet';

interface OrderProductsProps {
    deliveryGroups: DeliveryGroup[];
}

const OrderProducts = ({ deliveryGroups }: OrderProductsProps) => {
    const { t } = useTranslation();

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
                                    label: c.inputLabel ?? '',
                                    value: c.inputValue ?? '',
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
                                >
                                    <OrderProductItem
                                        imageUrl={
                                            option.imageUrl || product.imageUrl
                                        }
                                        productName={product.productName}
                                        brandName={product.brandName ?? ''}
                                        isExtraProduct={option.isExtraProduct}
                                        optionLabels={optionLabels}
                                        orderCnt={option.orderCnt}
                                        buyAmt={option.price.buyAmt}
                                        baseProductName={option.baseProductName}
                                    />
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
