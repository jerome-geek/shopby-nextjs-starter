import * as styles from '@/features/recipe/components/view/detail-sticky-footer/skeleton.css';

const SkeletonButton = () => (
    <div className={styles.actionButton}>
        <div className={styles.iconCircle} />
        <div className={styles.countRect} />
    </div>
);

export const RecipeDetailStickyFooterSkeleton = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.buttonGroup}>
                <SkeletonButton />
                <SkeletonButton />
            </div>
            <SkeletonButton />
        </footer>
    );
};
