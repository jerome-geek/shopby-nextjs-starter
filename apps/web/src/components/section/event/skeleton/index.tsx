import * as bannerStyles from '@/features/event/section/components/event-section-banner/index.css';
import * as contentStyles from '@/features/event/section/components/event-section-content/index.css';
import * as productRowStyles from '@/components/product/card-row/index.css';
import * as sectionStyles from '@/components/section/event/index.css';
import Skeleton from '@/components/ui/skeleton';
import { useResponsive } from '@/hooks/utils';

export const EventProductsSkeleton = () => {
    return (
        <ul className={contentStyles.productList}>
            {Array.from({ length: 2 }).map((_, i) => (
                <li key={`event-skeleton-product-${i}`}>
                    <div className={productRowStyles.container}>
                        <div className={productRowStyles.thumbWrapper}>
                            <Skeleton width='100%' height='100%' />
                        </div>

                        <div className={productRowStyles.productInfoContainer}>
                            <div className={productRowStyles.brandInfoWrapper}>
                                <Skeleton
                                    width={90}
                                    height={14}
                                    style={{ borderRadius: 999 }}
                                />
                                <Skeleton width='50%' height={18} />
                            </div>

                            <div className={productRowStyles.priceWrapper}>
                                <Skeleton width={110} height={18} />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export const EventBannerSkeleton = () => {
    return (
        <div className={bannerStyles.imageWrapper}>
            <Skeleton width='100%' height='100%' />
        </div>
    );
};

export const EventContentSkeleton = () => {
    const { isMobile } = useResponsive();

    return (
        <div className={contentStyles.contentWrapper}>
            {!isMobile && (
                <div className={contentStyles.textWrapper}>
                    <Skeleton width='60%' height={28} />
                    <Skeleton width='82%' height={18} />
                </div>
            )}
            <EventProductsSkeleton />
        </div>
    );
};

const EventSectionSkeleton = () => {
    return (
        <div className={sectionStyles.container} aria-hidden='true'>
            <EventBannerSkeleton />
            <EventContentSkeleton />
        </div>
    );
};

export default EventSectionSkeleton;
