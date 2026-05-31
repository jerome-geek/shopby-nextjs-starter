import { FlatProductOption } from '@/features/product/option';
import { SelectedProductOption } from '@/features/product/option/selected';
import * as styles from '@/features/product/components/extra-product-list/index.css';
import { useProductOption, useProductOptionChange } from '@/hooks/product';
import type { ExtraProduct as ExtraProductType } from '@/entities/product/model/product';
import { CURRENCY } from '@/utils/currency';

interface ExtraProductProps {
    baseProductNo: number;
    extraProduct: ExtraProductType;
}

export const ExtraProduct = ({
    baseProductNo,
    extraProduct,
}: ExtraProductProps) => {
    const { onFlatOptionChange } = useProductOptionChange({
        baseProductNo,
    });

    const { isDefaultOptionUsed } = useProductOption({
        productNo: extraProduct.productNo,
    });

    return (
        <li
            key={`extra-product-${extraProduct.productNo}`}
            className={styles.item}
        >
            <div className={styles.productContainer}>
                <div className={styles.thumbWrapper}>
                    <img
                        className={styles.thumb}
                        src={extraProduct.imageUrl}
                        alt={extraProduct.productName}
                    />
                </div>
                <div className={styles.content}>
                    <p className={styles.name}>{extraProduct.productName}</p>
                    <p className={styles.price}>
                        {/* TODO: discount적용하기 */}
                        {CURRENCY(extraProduct.price.salePrice)
                            .subtract(
                                extraProduct.price.immediateDiscountInfo
                                    .discountAmt,
                            )
                            .format()}
                    </p>
                    <div className={styles.selectWrapper}>
                        <FlatProductOption
                            isExtraProduct
                            productNo={extraProduct.productNo}
                            onChange={(option) =>
                                onFlatOptionChange(
                                    option,
                                    extraProduct.productNo,
                                    baseProductNo,
                                )
                            }
                            menuPortalTarget={null}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.optionWrapper}>
                <SelectedProductOption
                    productNo={extraProduct.productNo}
                    isRemovable={!isDefaultOptionUsed}
                />
            </div>
        </li>
    );
};
