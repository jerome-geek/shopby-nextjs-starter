import { FlatProductOption } from '@/components/product-option';
import * as styles from '@/components/product/extra-product-list/index.css';
import { useProductOptionChange } from '@/hooks/product';
import { useExtraProductList } from '@/hooks/suspenseQuery/product/product';
import { CURRENCY } from '@/utils/currency';

interface ExtraProductListProps {
    productNo: number;
}

export const ExtraProductList = ({ productNo }: ExtraProductListProps) => {
    const { data: extraProductListData } = useExtraProductList({ productNo });

    const { onFlatOptionChange } = useProductOptionChange({
        baseProductNo: productNo,
    });

    if (
        !extraProductListData ||
        !extraProductListData.extraProducts ||
        extraProductListData.extraProducts.length === 0
    ) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>
                {extraProductListData.extraProductTitle || '추가상품'}
            </h4>

            <ul className={styles.list}>
                {extraProductListData.extraProducts.map((extraProduct) => {
                    return (
                        <li
                            key={`extra-product-${extraProduct.productNo}`}
                            className={styles.item}
                        >
                            <div className={styles.thumbWrapper}>
                                <img
                                    className={styles.thumb}
                                    src={extraProduct.imageUrl}
                                    alt={extraProduct.productName}
                                />
                            </div>
                            <div className={styles.content}>
                                <p className={styles.name}>
                                    {extraProduct.productName}
                                </p>
                                <p className={styles.price}>
                                    {/* TODO: discount적용하기 */}
                                    {CURRENCY(extraProduct.price.salePrice)
                                        .subtract(
                                            extraProduct.price
                                                .immediateDiscountInfo
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
                                                productNo,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
