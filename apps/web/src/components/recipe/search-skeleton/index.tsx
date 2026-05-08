import * as cardStyles from '@/components/recipe/card/index.css';
import * as detailCardStyles from '@/components/recipe/detail-card/index.css';
import * as listStyles from '@/features/recipe/components/recipe-list/index.css';
import * as styles from '@/pages/mypage/recipes/index.css';

interface RecipeSearchSkeletonProps {
    viewMode?: 'grid' | 'details';
    count?: number;
}

export const RecipeSearchSkeleton = ({
    viewMode = 'grid',
    count = 12,
}: RecipeSearchSkeletonProps) => {
    return (
        <div className={listStyles.listContainer}>
            <ul
                className={
                    viewMode === 'grid'
                        ? listStyles.gridList
                        : listStyles.detailList
                }
            >
                {Array.from({ length: count }).map((_, i) => (
                    <li
                        key={i}
                        className={
                            viewMode === 'grid'
                                ? cardStyles.recipeCard
                                : detailCardStyles.recipeLink
                        }
                    >
                        {/* 썸네일 영역 스켈레톤 */}
                        <div className={styles.thumbArea} />

                        {/* 정보 영역 스켈레톤 */}
                        <div className={styles.recipeInfo}>
                            <div
                                style={{
                                    height: '24px',
                                    width: '80%',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '4px',
                                }}
                            />
                            <div
                                style={{
                                    height: '18px',
                                    width: '40%',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                    marginTop: '4px',
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
