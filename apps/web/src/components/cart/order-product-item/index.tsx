import { concat, map, pipe, sort, toArray, zip } from '@fxts/core';
import clsx from 'clsx';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

import * as styles from '@/components/cart/order-product-item/index.css';
import { InputCheckbox } from '@/components/ui/input';
import { PATHS } from '@/const/paths';
import { PRODUCT_IMAGE_RESIZE } from '@/const/product';
import { useResponsive } from '@/hooks/utils';
import type {
    InvalidProduct,
    OrderProduct,
    OrderProductOption,
} from '@/models/order';
import type {
    GuestOrderProduct,
    GuestOrderProductOption,
} from '@/models/order/guestOrder';
import { CURRENCY } from '@/utils/currency';
import { useTranslation } from 'react-i18next';

type OrderInvalidProduct = Omit<
    InvalidProduct,
    'eanCode' | 'partnerName' | 'minorPurchasable' | 'combinable'
>;

interface OrderProductItemData {
    product: OrderProduct | OrderInvalidProduct | GuestOrderProduct;
    option: OrderProductOption | GuestOrderProductOption;
}

interface OrderProductItemProps {
    item: OrderProductItemData;
    isChecked?: boolean;
    isInvalidProduct?: boolean;
    onCheckChange?: (checked: boolean) => void;
    onQuantityChange?: (nextOrderCnt: number) => void;
    onDelete: () => void;
}

export const OrderProductItem = ({
    item,
    isChecked = false,
    isInvalidProduct = false,
    onCheckChange,
    onQuantityChange,
    onDelete,
}: OrderProductItemProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const imageSize = isMobile
        ? PRODUCT_IMAGE_RESIZE.MOBILE
        : PRODUCT_IMAGE_RESIZE.DESKTOP;

    const { product, option } = item;

    const optionLabels = pipe(
        option.optionInputs ?? [],
        sort((a, b) => (a.inputNo ?? 0) - (b.inputNo ?? 0)),
        map((c) => t('{{label}}: {{value}}', { label: c.inputLabel, value: c.inputValue })),
        concat(
            option.optionType === 'PRODUCT_ONLY'
                ? []
                : pipe(
                      option.optionValue.split('|'),
                      zip(option.optionName.split('|')),
                      map(([value, name]) => t('{{name}}: {{value}}', { name, value })),
                  ),
        ),
        toArray,
    );

    const canAdjustQuantity = !isInvalidProduct && !!onQuantityChange;
    const handleCheckChange = onCheckChange ?? (() => {});

    const isErrorCode = !!option.validInfo.errorCode;

    const isSoldOut = option.validInfo.errorCode === 'OUT_OF_STOCK';

    const invalidMessage = isSoldOut ? t('품절') : option.validInfo.message;

    return (
        <li
            className={clsx(
                styles.cartItem,
                isInvalidProduct && styles.cartItemInvalid,
            )}
        >
            {!isInvalidProduct && (
                <div className={styles.itemCheckbox}>
                    <InputCheckbox
                        checked={isChecked}
                        onCheckedChange={handleCheckChange}
                    />
                </div>
            )}

            <div className={styles.itemContent}>
                <Link
                    className={styles.itemImageLink}
                    href={`${PATHS.PRODUCTS.MAIN}/${product.productNo}`}
                >
                    <img
                        src={`${option.imageUrl || product.imageUrl}?${imageSize}`}
                        alt={product.productName}
                        className={styles.itemImage}
                    />

                    {isErrorCode && (
                        <div className={styles.invalidMessage}>
                            <span>{invalidMessage}</span>
                        </div>
                    )}
                </Link>

                <div className={styles.itemDetails}>
                    <div className={styles.itemTextInfo}>
                        {product.brandName && (
                            <span className={styles.itemBrand}>
                                {product.brandName}
                            </span>
                        )}
                        <span className={styles.itemName}>
                            {product.productName}
                        </span>
                        <div className={styles.itemOptionList}>
                            {optionLabels.map((label, index) => (
                                <span key={index} className={styles.itemOption}>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {canAdjustQuantity ? (
                        <div className={styles.quantityController}>
                            <button
                                type='button'
                                className={styles.quantityButton}
                                disabled={option.orderCnt <= 1}
                                onClick={() =>
                                    onQuantityChange(option.orderCnt - 1)
                                }
                            >
                                <Minus size={16} />
                            </button>
                            <span className={styles.quantityValue}>
                                {option.orderCnt}
                            </span>
                            <button
                                type='button'
                                className={styles.quantityButton}
                                disabled={option.orderCnt >= option.stockCnt}
                                onClick={() =>
                                    onQuantityChange(option.orderCnt + 1)
                                }
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        <span className={styles.itemOption}>
                            {t('수량 : {{orderCnt}}', {
                                orderCnt: option.orderCnt,
                            })}
                        </span>
                    )}

                    <div className={styles.itemPriceArea}>
                        {option.price.immediateDiscountAmt > 0 && (
                            <span className={styles.itemDiscount}>
                                {Math.floor(
                                    (option.price.immediateDiscountAmt /
                                        option.price.standardAmt) *
                                        100,
                                )}
                                %
                            </span>
                        )}
                        <span className={styles.itemPrice}>
                            {CURRENCY(option.price.buyAmt).format()}
                        </span>
                    </div>
                </div>
            </div>

            <button
                type='button'
                className={styles.itemXButton}
                onClick={onDelete}
            >
                <X size={16} />
            </button>
        </li>
    );
};
