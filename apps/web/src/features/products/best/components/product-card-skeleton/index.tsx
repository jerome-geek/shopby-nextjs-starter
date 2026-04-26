import * as styles from '@/features/products/best/components/product-card-skeleton/index.css';

export const ProductCardSkeleton = () => {
    return (
        <div className={styles.card}>
            <div className={styles.thumb} />
            <div className={styles.info}>
                <div className={styles.brandLine} />
                <div className={styles.nameLine1} />
                <div className={styles.nameLine2} />
                <div className={styles.priceLine} />
            </div>
        </div>
    );
};
