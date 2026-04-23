import { useResponsive } from '@/hooks/utils';
import * as productRowStyles from '@/components/product/card-row/index.css';
import * as eventCardStyles from '@/components/section/event/card/index.css';
import Skeleton from '@/components/ui/skeleton';

export const EventProductsSkeleton = () => {
    return (
        <ul className={eventCardStyles.productList}>
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

const EventSectionSkeleton = () => {
    const { isMobile } = useResponsive();

    return (
        <div className={eventCardStyles.container} aria-hidden='true'>
            <div className={eventCardStyles.imageWrapper}>
                <Skeleton width='100%' height='100%' />
            </div>

            <div className={eventCardStyles.contentWrapper}>
                {!isMobile && (
                    <div className={eventCardStyles.textWrapper}>
                        <Skeleton width='60%' height={28} />
                        <Skeleton width='82%' height={18} />
                    </div>
                )}

                <EventProductsSkeleton />
            </div>
        </div>
    );
};

export default EventSectionSkeleton;
