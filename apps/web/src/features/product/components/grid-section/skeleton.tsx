import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import * as productCardStyles from '@/features/product/components/card/index.css';
import * as styles from '@/features/product/components/grid-section/index.css';
import Skeleton from '@/shared/ui/skeleton';
import { useResponsive } from '@/hooks/utils';

export const ProductCardSkeleton = () => {
    return (
        <article className={productCardStyles.container} aria-hidden='true'>
            <div className={productCardStyles.thumbWrapper}>
                <Skeleton width='100%' height='100%' />
            </div>

            <div className={productCardStyles.productInfoContainer}>
                <div className={productCardStyles.brandInfoWrapper}>
                    <Skeleton
                        width={56}
                        height={12}
                        style={{ borderRadius: 6, marginBottom: 4 }}
                    />
                    <Skeleton
                        width='90%'
                        height={14}
                        style={{ borderRadius: 6 }}
                    />
                </div>

                <div className={productCardStyles.priceWrapper}>
                    <Skeleton
                        width={72}
                        height={14}
                        style={{ borderRadius: 6 }}
                    />
                </div>
            </div>
        </article>
    );
};

export const ProductGridSkeleton = () => {
    const { isMobile } = useResponsive();
    const skeletonItems = Array.from({ length: isMobile ? 4 : 5 });

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <Skeleton width={80} height={24} style={{ borderRadius: 8 }} />
            </div>

            {isMobile ? (
                <div className={styles.swiperContainer}>
                    <Swiper
                        slidesPerView='auto'
                        spaceBetween={16}
                        slidesOffsetAfter={20}
                        style={{ padding: '0 20px' }}
                    >
                        {skeletonItems.map((_, idx) => (
                            <SwiperSlide
                                key={idx}
                                className={styles.swiperSlide}
                            >
                                <ProductCardSkeleton />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {skeletonItems.map((_, idx) => (
                        <ProductCardSkeleton key={idx} />
                    ))}
                </div>
            )}
        </section>
    );
};
