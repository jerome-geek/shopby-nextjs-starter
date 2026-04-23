import clsx from 'clsx';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

import * as styles from '@/components/cart/order-product-item/index.css';
import { InputCheckbox } from '@/components/ui/input';
import { PATHS } from '@/const/paths';
import type {
    InvalidProduct,
    OrderProduct,
    OrderProductOption,
} from '@/models/order';
import { CURRENCY } from '@/utils/currency';

type OrderInvalidProduct = Omit<
    InvalidProduct,
    'eanCode' | 'partnerName' | 'minorPurchasable' | 'combinable'
>;

interface OrderProductItemData {
    product: OrderProduct | OrderInvalidProduct;
    option: OrderProductOption;
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
    const { product, option } = item;
    const canAdjustQuantity = !isInvalidProduct && !!onQuantityChange;
    const handleCheckChange = onCheckChange ?? (() => {});

    const isErrorCode = !!option.validInfo.errorCode;

    const isSoldOut = option.validInfo.errorCode === 'OUT_OF_STOCK';

    const invalidMessage = isSoldOut ? 'SOLD OUT' : option.validInfo.message;

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
                        src={option.imageUrl || product.imageUrl}
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
                        {option.optionTitle && (
                            <span className={styles.itemOption}>
                                {option.optionTitle}
                            </span>
                        )}
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
                            수량: {option.orderCnt}
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
