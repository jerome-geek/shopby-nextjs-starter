'use client';

import { useTranslation } from 'react-i18next';

import { Skeleton } from '@/shared/ui/skeleton';
import * as styles from '@/features/recipe/components/recipe-recommendation-content/index.css';

export const RecipeRecommendationLayerContentSkeleton = () => {
    const { t } = useTranslation();

    return (
        <section className={styles.container}>
            <header className={styles.titleGroup}>
                <h2
                    className={styles.title}
                    dangerouslySetInnerHTML={{
                        __html: t(
                            '배송 기다리는 동안<br/>식비를 절반으로 줄여주는 레시피 구경하세요!',
                        ),
                    }}
                />
            </header>

            <div className={styles.recipeArea}>
                <ul className={styles.skeletonList}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className={styles.skeletonItem}>
                            <article className={styles.recipeCardWrapper}>
                                {/* Recipe Card Skeleton */}
                                <Skeleton
                                    width='100%'
                                    height='fit-content'
                                    style={{
                                        borderRadius: '8px',
                                        aspectRatio: '3/4',
                                    }}
                                />
                                <div className={styles.skeletonCardInfo}>
                                    <Skeleton width='90%' height='20px' />
                                    <Skeleton width='60%' height='16px' />
                                    <ul className={styles.skeletonMetaList}>
                                        <li>
                                            <Skeleton
                                                width='50px'
                                                height='16px'
                                            />
                                        </li>
                                        <li>
                                            <Skeleton
                                                width='50px'
                                                height='16px'
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                <div className={styles.paginationWrapper} />
            </div>
        </section>
    );
};
