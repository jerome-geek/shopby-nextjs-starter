import { Swiper, SwiperSlide } from 'swiper/react';

import * as integratedStyles from '@/components/search/integrated-results/index.css';
import { Column } from '@/shared/ui/layout/flex';
import Skeleton from '@/shared/ui/skeleton';
import { useResponsive } from '@/hooks/utils';

import 'swiper/css';

const SWIPER_SKELETON_CONFIG = {
    tablet: {
        slidesPerView: 2.2,
        spaceBetween: 16,
    },
    desktop: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
    },
} as const;

const ProductCardSkeleton = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton width='100%' style={{ aspectRatio: '1/1', borderRadius: '4px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width='40%' height={12} style={{ borderRadius: '4px' }} />
            <Skeleton width='90%' height={14} style={{ borderRadius: '4px' }} />
            <Skeleton width='70%' height={14} style={{ borderRadius: '4px' }} />
            <Skeleton width='50%' height={20} style={{ borderRadius: '4px' }} />
        </div>
    </div>
);

export const ShoppingRecommendSectionSkeleton = () => {
    const { isTablet } = useResponsive();
    const skeletonCount = isTablet ? 3 : SWIPER_SKELETON_CONFIG.desktop.slidesPerView;

    return (
        <Column gap='12px' aria-busy='true' aria-label='추천 상품 로딩 중'>
            <Skeleton
                width={140}
                height={24}
                style={{ borderRadius: '4px' }}
                className={integratedStyles.productSectionTitle}
            />
            <Swiper
                slidesPerView={SWIPER_SKELETON_CONFIG.tablet.slidesPerView}
                spaceBetween={SWIPER_SKELETON_CONFIG.tablet.spaceBetween}
                breakpoints={{
                    1025: {
                        slidesPerView:
                            SWIPER_SKELETON_CONFIG.desktop.slidesPerView,
                        slidesPerGroup:
                            SWIPER_SKELETON_CONFIG.desktop.slidesPerGroup,
                        spaceBetween:
                            SWIPER_SKELETON_CONFIG.desktop.spaceBetween,
                    },
                }}
                style={{ width: '100%' }}
            >
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <SwiperSlide key={`shopping-recommend-skeleton-${index}`}>
                        <ProductCardSkeleton />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Column>
    );
};
