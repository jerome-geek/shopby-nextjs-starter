import * as recipeCardStyle from '@/features/recipe/components/view/card/index.css';
import * as styles from '@/features/section/components/recipe-group/index.css';
import * as recipeSectionStyle from '@/features/section/components/recipe-group/recipe/index.css';
import Skeleton from '@/shared/ui/skeleton';

const RecipeSectionSkeleton = () => {
    return (
        <section className={recipeSectionStyle.container} aria-busy='true'>
            <div className={recipeSectionStyle.recipeSectionHeader}>
                <div
                    className={
                        recipeSectionStyle.recipeSectionTitleContainer
                    }
                >
                    <Skeleton
                        width={180}
                        height={22}
                        style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                        width={260}
                        height={18}
                        style={{ borderRadius: 8 }}
                    />
                </div>
                <Skeleton
                    width={76}
                    height={18}
                    style={{ borderRadius: 999 }}
                />
            </div>

            <ul className={recipeSectionStyle.recipeList}>
                {Array.from({ length: 2 }).map((_, idx) => (
                    <li key={idx}>
                        <div
                            className={recipeCardStyle.recipeCard}
                            aria-hidden='true'
                        >
                            <div className={recipeCardStyle.recipeThumbWrapper}>
                                <Skeleton
                                    className={recipeCardStyle.recipeThumb}
                                    width='100%'
                                    height='100%'
                                    style={{ position: 'absolute', inset: 0 }}
                                />
                                <Skeleton
                                    width={32}
                                    height={32}
                                    circle
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                    }}
                                />
                            </div>

                            <div className={recipeCardStyle.recipeInfo}>
                                <div className={recipeCardStyle.recipeHeader}>
                                    <Skeleton
                                        width='75%'
                                        height={16}
                                        style={{ borderRadius: 6 }}
                                    />
                                    <Skeleton
                                        width='45%'
                                        height={14}
                                        style={{ borderRadius: 6 }}
                                    />
                                </div>

                                <ul className={recipeCardStyle.recipeMeta}>
                                    <li
                                        className={
                                            recipeCardStyle.recipeTimerMetaItem
                                        }
                                    >
                                        <Skeleton
                                            width={14}
                                            height={14}
                                            style={{ borderRadius: 4 }}
                                        />
                                        <Skeleton
                                            width={44}
                                            height={14}
                                            style={{ borderRadius: 999 }}
                                        />
                                    </li>
                                    <li
                                        className={
                                            recipeCardStyle.recipeServingsMetaItem
                                        }
                                    >
                                        <Skeleton
                                            width={14}
                                            height={14}
                                            style={{ borderRadius: 4 }}
                                        />
                                        <Skeleton
                                            width={44}
                                            height={14}
                                            style={{ borderRadius: 999 }}
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
        <section className={styles.recipeGroupSection}>
            <RecipeSectionSkeleton />
            <RecipeSectionSkeleton />
        </section>
    );
};

export default RecipeGroupSectionSkeleton;
