import { ExtraProduct } from '@/components/product/extra-product-list/extra-product';
import * as styles from '@/components/product/extra-product-list/index.css';
import { useExtraProductList } from '@/hooks/suspenseQuery/product/product';

interface ExtraProductListProps {
    productNo: number;
}

export const ExtraProductList = ({ productNo }: ExtraProductListProps) => {
    const { data: extraProductListData } = useExtraProductList({ productNo });

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
                        <ExtraProduct
                            key={`extra-product-${extraProduct.productNo}`}
                            baseProductNo={productNo}
                            extraProduct={extraProduct}
                        />
                    );
                })}
            </ul>
        </div>
    );
};
