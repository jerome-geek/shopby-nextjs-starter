import { concat, map, pipe, sort, toArray, zip } from '@fxts/core';
import clsx from 'clsx';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/cart/order-product-item/index.css';
import { PATHS } from '@/const/paths';
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
import { QuantityController } from '@/shared/ui';
import { InputCheckbox } from '@/shared/ui/input';
import { getShopbyResizeImageUrl } from '@/shared/utils/shopby';
import { CURRENCY } from '@/utils/currency';

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

    const imageSize = isMobile ? 144 : 256;

    const { product, option } = item;

    const optionLabels = pipe(
        option.optionInputs ?? [],
        sort((a, b) => (a.inputNo ?? 0) - (b.inputNo ?? 0)),
        map((c) =>
            t('{{label}}: {{value}}', {
                label: c.inputLabel,
                value: c.inputValue,
            }),
        ),
        concat(
            option.optionType === 'PRODUCT_ONLY'
                ? []
                : pipe(
                      option.optionValue.split('|'),
                      zip(option.optionName.split('|')),
                      map(([value, name]) =>
                          t('{{name}}: {{value}}', { name, value }),
                      ),
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
                        src={getShopbyResizeImageUrl(
                            option.imageUrl || product.imageUrl,
                            imageSize,
                        )}
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
                            <span
                                className={styles.itemBrand}
                                dangerouslySetInnerHTML={{
                                    __html: product.brandName,
                                }}
                            />
                        )}
                        {option.baseProductName && (
                            <span
                                className={styles.baseProductName}
                                dangerouslySetInnerHTML={{
                                    __html: `<strong>[본상품]</strong> ${option.baseProductName}`,
                                }}
                            />
                        )}
                        <span
                            className={styles.itemName}
                            dangerouslySetInnerHTML={{
                                __html: `${
                                    option.isExtraProduct
                                        ? `<strong class="${styles.itemExtraProductBadge}">${t(
                                              '추가상품',
                                          )}</strong>`
                                        : ''
                                }${product.productName}`,
                            }}
                        />
                        <div className={styles.itemOptionList}>
                            {optionLabels.map((label, index) => (
                                <span
                                    key={index}
                                    className={styles.itemOption}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            ))}
                        </div>
                    </div>

                    {canAdjustQuantity ? (
                        <QuantityController
                            value={option.orderCnt}
                            onChange={onQuantityChange}
                            min={product.minBuyCount || 1}
                            max={option.stockCnt}
                            disabled={isSoldOut}
                        />
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
