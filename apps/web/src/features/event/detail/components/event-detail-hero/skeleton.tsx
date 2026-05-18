import Skeleton from '@/components/ui/skeleton';
import * as styles from '@/features/event/detail/components/event-detail-hero/index.css';

export const EventDetailHeroSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topRow}>
                <div className={styles.bannerWrapper}>
                    <Skeleton width='100%' height='100%' />
                </div>

                <div className={styles.textContent}>
                    <Skeleton width='60%' height='40px' />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <Skeleton width='90%' height='24px' />
                        <Skeleton width='70%' height='24px' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailHeroSkeleton;
