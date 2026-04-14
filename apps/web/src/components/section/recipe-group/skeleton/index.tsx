import * as recipeCardStyle from '@/components/recipe/card/index.css';
import * as styles from '@/components/section/recipe-group/index.css';
import * as recipeSectionStyle from '@/components/section/recipe-group/recipe/index.css';

const RecipeSectionSkeleton = () => {
    return (
        <section className={recipeSectionStyle.Container} aria-busy='true'>
            <div className={recipeSectionStyle.RecipeSectionHeader}>
                <div className={recipeSectionStyle.RecipeSectionTitleContainer}>
                    <div className={styles.SkeletonTitleBlock} />
                    <div className={styles.SkeletonSubTitleBlock} />
                </div>
                <div className={styles.SkeletonLinkBlock} />
            </div>

            <ul className={recipeSectionStyle.RecipeList}>
                {Array.from({ length: 2 }).map((_, idx) => (
                    <li key={idx}>
                        <div
                            className={recipeCardStyle.recipeCard}
                            aria-hidden='true'
                        >
                            <div className={recipeCardStyle.recipeThumbWrapper}>
                                <div
                                    className={`${styles.SkeletonBlock} ${recipeCardStyle.recipeThumb}`}
                                    style={{ position: 'relative' }}
                                >
                                    <div className={styles.SkeletonShimmer} />
                                </div>
                                <div
                                    className={styles.SkeletonBlockSoft}
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>

                            <div className={recipeCardStyle.recipeInfo}>
                                <div className={recipeCardStyle.recipeHeader}>
                                    <div
                                        className={styles.SkeletonTextLineLong}
                                        style={{ width: '75%', height: 16 }}
                                    />
                                    <div
                                        className={styles.SkeletonTextLineShort}
                                        style={{ width: '45%', height: 14 }}
                                    />
                                </div>

                                <ul className={recipeCardStyle.recipeMeta}>
                                    <li
                                        className={
                                            recipeCardStyle.recipeTimerMetaItem
                                        }
                                    >
                                        <div
                                            className={styles.SkeletonBlockSoft}
                                            style={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: 4,
                                            }}
                                        />
                                        <div
                                            className={styles.SkeletonMetaChip}
                                            style={{ width: 44 }}
                                        />
                                    </li>
                                    <li
                                        className={
                                            recipeCardStyle.recipeServingsMetaItem
                                        }
                                    >
                                        <div
                                            className={styles.SkeletonBlockSoft}
                                            style={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: 4,
                                            }}
                                        />
                                        <div
                                            className={styles.SkeletonMetaChip}
                                            style={{ width: 44 }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const RecipeGroupSectionSkeleton = () => {
    return (
        <section className={styles.RecipeGroupSection}>
            <RecipeSectionSkeleton />
            <RecipeSectionSkeleton />
        </section>
    );
};

export default RecipeGroupSectionSkeleton;
