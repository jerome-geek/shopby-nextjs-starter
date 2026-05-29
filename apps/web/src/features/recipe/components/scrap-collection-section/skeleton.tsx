import Skeleton from '@/shared/ui/skeleton';
import { useResponsive } from '@/hooks/utils';

import * as styles from '@/features/recipe/components/scrap-collection-section/index.css';

const CollectionCardSkeleton = () => {
    return (
        <div className={styles.collectionCard} aria-hidden='true'>
            <div
                className={`${styles.collagePlaceholder} ${styles.skeletonPlaceholder}`}
            >
                <Skeleton width='100%' height='100%' />
            </div>
            <div className={styles.collectionInfo}>
                <div className={styles.collectionTitleArea}>
                    <Skeleton
                        width='60%'
                        height={20}
                        className={styles.skeletonTitle}
                    />
                    <Skeleton
                        width='90%'
                        height={14}
                        className={styles.skeletonDescription}
                    />
                    <Skeleton
                        width='40%'
                        height={12}
                        className={styles.skeletonMeta}
                    />
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
                <Skeleton
                    width={80}
                    height={24}
                    className={styles.skeletonSectionTitle}
                />
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
