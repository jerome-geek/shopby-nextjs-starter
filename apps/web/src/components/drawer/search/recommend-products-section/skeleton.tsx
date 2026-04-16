import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/drawer/search/index.css';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import { useResponsive } from '@/hooks/utils';

import 'swiper/css';

const ProductCardSkeleton = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton
            width='100%'
            style={{ aspectRatio: '1/1', borderRadius: '4px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width='40%' height={12} style={{ borderRadius: '4px' }} />
            <Skeleton width='90%' height={14} style={{ borderRadius: '4px' }} />
            <Skeleton width='70%' height={14} style={{ borderRadius: '4px' }} />
            <Skeleton width='50%' height={20} style={{ borderRadius: '4px' }} />
        </div>
    </div>
);

export const RecommendProductsSkeleton = () => {
    const { isMobile } = useResponsive();

    return (
        <div
            className={styles.productSectionContainer}
            aria-busy='true'
            aria-label='추천 상품 로딩 중'
        >
            <Skeleton
                width={80}
                height={22}
                style={{ borderRadius: '4px' }}
                className={styles.sectionTitle}
            />

            {isMobile ? (
                <Swiper
                    className={styles.recommendSwiper}
                    style={{
                        // marginLeft: 0, marginRight: '-20px'
                        overflow: 'visible',
                    }}
                    slidesPerView={2.3}
                    spaceBetween={12}
                >
                    {Array.from({ length: 3 }).map((_, i) => (
                        <SwiperSlide key={i} className={styles.recommendSlide}>
                            <div className={styles.recommendCardWrap}>
                                <ProductCardSkeleton />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className={styles.productGrid}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}
        </div>
    );
};
