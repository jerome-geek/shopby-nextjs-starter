import { DeliveryGroup } from '@/models/order/orderSheet';
import { CURRENCY } from '@/utils/currency';
import * as styles from '@/components/order/order-products/index.css';

interface OrderProductsProps {
    deliveryGroups: DeliveryGroup[];
}

const OrderProducts = ({ deliveryGroups }: OrderProductsProps) => {
    return (
        <section className={styles.container}>
            <h3 className={styles.title}>주문 상품</h3>

            <ul className={styles.productList}>
                {deliveryGroups.map((group) =>
                    group.orderProducts.map((product) =>
                        product.orderProductOptions.map((option) => (
                            <li
                                key={`${product.productNo}-${option.optionNo}`}
                                className={styles.productItem}
                            >
                                <img
                                    src={option.imageUrl || product.imageUrl}
                                    alt={product.productName}
                                    className={styles.thumbnail}
                                />
                                <div className={styles.productInfo}>
                                    <div
                                        className={styles.productTextContainer}
                                    >
                                        {product.brandName && (
                                            <p className={styles.brandName}>
                                                {product.brandName}
                                            </p>
                                        )}
                                        <p className={styles.productName}>
                                            {product.productName}
                                        </p>
                                        {option.optionTitle && (
                                            <p className={styles.optionText}>
                                                {option.optionTitle}
                                            </p>
                                        )}
                                    </div>

                                    <div className={styles.priceContainer}>
                                        <p className={styles.orderCnt}>
                                            {`수량 ${option.orderCnt}개`}
                                        </p>

                                        <p className={styles.buyAmt}>
                                            {CURRENCY(
                                                option.price.buyAmt,
                                            ).format()}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )),
                    ),
                )}
            </ul>
        </section>
    );
};

export default OrderProducts;
