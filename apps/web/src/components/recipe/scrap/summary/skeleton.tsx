import Skeleton from '@/components/ui/skeleton';
import * as styles from '@/components/recipe/scrap/summary/index.css';
import { useResponsive } from '@/hooks/utils';

const CollectionCardSkeleton = () => {
    return (
        <div className={styles.collectionCard} aria-hidden='true'>
            <div className={styles.collagePlaceholder} style={{ backgroundColor: '#f5f5f5' }}>
                <Skeleton width='100%' height='100%' />
            </div>
            <div className={styles.collectionInfo}>
                <div className={styles.collectionTitleArea}>
                    <Skeleton width='60%' height={20} style={{ borderRadius: 6, marginBottom: 8 }} />
                    <Skeleton width='90%' height={14} style={{ borderRadius: 4, marginBottom: 4 }} />
                    <Skeleton width='40%' height={12} style={{ borderRadius: 4 }} />
                </div>
            </div>
        </div>
    );
};

export const CollectionGridSkeleton = () => {
    const { isMobile } = useResponsive();
    const skeletonItems = Array.from({ length: isMobile ? 2 : 3 });

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <Skeleton width={80} height={24} style={{ borderRadius: 8 }} />
            </div>
            <ul className={styles.collectionGrid}>
                {skeletonItems.map((_, idx) => (
                    <li key={idx} className={styles.collectionItem}>
                        <CollectionCardSkeleton />
                    </li>
                ))}
            </ul>
        </section>
    );
};
