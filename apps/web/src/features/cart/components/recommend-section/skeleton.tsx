import React from 'react';
import { ProductCardSkeleton } from '@/components/product/card/skeleton';
import Skeleton from '@/shared/ui/skeleton';
import * as styles from './index.css';

export const CartRecommendSectionSkeleton = () => {
    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <Skeleton width="180px" height="24px" />
            </div>
            <div 
                className={styles.swiperContainer} 
                style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    padding: '0 20px', 
                    overflow: 'hidden' 
                }}
            >
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={styles.swiperSlide} style={{ flexShrink: 0 }}>
                        <ProductCardSkeleton />
                    </div>
                ))}
            </div>
            <div className={styles.paginationWrapper}>
                <Skeleton width="80px" height="20px" />
            </div>
        </section>
    );
};
