'use client';

import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import * as styles from '@/features/recipe/components/recipe-recommendation-content/index.css';

export const RecipeRecommendationLayerContentSkeleton = () => {
    const { t } = useTranslation();

    return (
        <section className={styles.container}>
            <header className={styles.titleGroup}>
                <h2
                    className={styles.titleLine}
                    dangerouslySetInnerHTML={{
                        __html: t(
                            '배송 기다리는 동안<br/>식비를 절반으로 줄여주는 레시피 구경하세요!',
                        ),
                    }}
                />
            </header>

            <div className={styles.recipeArea}>
                <ul 
                    style={{ 
                        display: 'flex', 
                        gap: '16px', 
                        width: '100%', 
                        overflow: 'hidden',
                        padding: '0 20px',
                        listStyle: 'none'
                    }}
                >
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} style={{ flexShrink: 0, width: '240px' }}>
                            <article>
                                {/* Recipe Card Skeleton */}
                                <Skeleton width="100%" height="240px" style={{ borderRadius: '8px' }} />
                                <div style={{ marginTop: '12px' }}>
                                    <Skeleton width="90%" height="20px" />
                                    <Skeleton width="60%" height="16px" style={{ marginTop: '4px' }} />
                                    <ul style={{ display: 'flex', gap: '8px', marginTop: '8px', listStyle: 'none' }}>
                                        <li><Skeleton width="50px" height="16px" /></li>
                                        <li><Skeleton width="50px" height="16px" /></li>
                                    </ul>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                <div className={styles.paginationWrapper} style={{ display: 'flex' }}>
                    <Skeleton width="80px" height="24px" />
                </div>
            </div>

            <footer className={styles.footerButtonGroup}>
                <Skeleton width="100%" height="60px" style={{ borderRadius: '4px', flex: 1 }} />
                <Skeleton width="100%" height="60px" style={{ borderRadius: '4px', flex: 1 }} />
            </footer>
        </section>
    );
};
