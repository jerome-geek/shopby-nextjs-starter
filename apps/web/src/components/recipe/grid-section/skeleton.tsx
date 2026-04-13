import * as styles from '@/components/recipe/grid-section/index.css';

export const RecipeGridSkeleton = () => {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.skeletonTitle} />
            </div>
            <div className={styles.recipeGrid}>
                {Array.from({ length: 5 }).map((_, i) => (
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
