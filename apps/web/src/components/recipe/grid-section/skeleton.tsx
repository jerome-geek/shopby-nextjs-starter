import * as styles from '@/components/recipe/grid-section/index.css';

export const RecipeGridSkeleton = ({ count = 12 }: { count?: number }) => {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.skeletonTitle} />
            </div>
            <div className={styles.recipeGrid}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i}>
                        <div className={styles.skeletonThumbnail} />
                        <div className={styles.productInfo}>
                            <div className={styles.skeletonTextLine} />
                            <div className={styles.skeletonTextShort} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
