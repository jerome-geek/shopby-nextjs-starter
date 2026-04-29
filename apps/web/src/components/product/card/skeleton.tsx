import React from 'react';
import Skeleton from '@/components/ui/skeleton';
import * as styles from './index.css';

export const ProductCardSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.thumbWrapper}>
                <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.productInfoContainer}>
                <div className={styles.brandInfoWrapper}>
                    <Skeleton width="40%" height="14px" />
                    <div style={{ height: '4px' }} />
                    <Skeleton width="90%" height="18px" count={2} />
                </div>
                <div className={styles.priceWrapper}>
                    <Skeleton width="60%" height="22px" />
                </div>
            </div>
        </div>
    );
};
