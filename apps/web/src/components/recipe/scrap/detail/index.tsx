import { Bookmark, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, List } from 'lucide-react';

import * as styles from '@/pages/recipes/scrap/index.css';
import { vars } from '@/styles/theme.css';
import { useSharedCollection } from '@/hooks/suspenseQuery/shop/recipe';
import { RecipeCard } from '@/components/recipe/card';
import { CollectionRecipeCard } from '@/components/collection/collection-recipe-card';

/**
 * 스크랩 상세 레이아웃 (개별 카테고리 탭용)
 */
export const RecipeScrapDetail = ({
    sno,
    shareCode,
    title,
}: {
    sno: number;
    shareCode: string;
    title: string;
}) => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<'grid' | 'details'>('details');

    const { data: sharedCollectionData } = useSharedCollection({
        shareCode,
    });

    const recipeList = sharedCollectionData?.recipes || [];

    if (recipeList.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                    padding: '100px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        backgroundColor: '#f2f5f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8da287',
                    }}
                >
                    <Bookmark size={32} />
                </div>
                <div>
                    <h3 className={styles.headingBold}>{t(title)}</h3>
                    <p
                        className={styles.body2Regular}
                        style={{
                            color: vars.color.gray['40'],
                            marginTop: '8px',
                        }}
                    >
                        {t('아직 스크랩된 아이템이 없습니다.')}
                        <br />
                        {t('마음에 드는 레시피를 담아보세요!')}
                    </p>
                </div>
                <button
                    className={styles.primaryButton}
                    style={{
                        width: 'auto',
                        padding: '14px 32px',
                        marginTop: '20px',
                    }}
                    type='button'
                >
                    {t('탐색하러 가기')}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.detailContainer}
        >
            <div className={styles.detailHeader}>
                <div className={styles.detailTitleArea}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <h2 className={styles.detailTitle}>
                            {t(sharedCollectionData?.title || title)}
                        </h2>
                        <button
                            type='button'
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                        >
                            <Plus
                                size={18}
                                style={{
                                    transform: 'rotate(45deg)',
                                    color: vars.color.gray['40'],
                                }}
                            />
                        </button>
                    </div>

                    <p className={styles.detailSubtitle}>
                        {sharedCollectionData?.description}
                    </p>

                    <p className={styles.detailMeta}>
                        By {sharedCollectionData?.memberName} ·{' '}
                        {recipeList.length}개
                    </p>
                </div>

                <div className={styles.viewToggleArea}>
                    <button
                        className={styles.viewToggle}
                        onClick={() =>
                            setViewMode((v) =>
                                v === 'details' ? 'grid' : 'details',
                            )
                        }
                        type='button'
                    >
                        <motion.div
                            className={styles.toggleActiveBg}
                            initial={false}
                            animate={{ x: viewMode === 'details' ? 0 : 42 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 40,
                            }}
                        />
                        <div className={styles.toggleItem}>
                            <List
                                size={18}
                                color={
                                    viewMode === 'details'
                                        ? vars.color.black
                                        : vars.color.gray['30']
                                }
                            />
                        </div>
                        <div className={styles.toggleItem}>
                            <LayoutGrid
                                size={18}
                                color={
                                    viewMode === 'grid'
                                        ? vars.color.black
                                        : vars.color.gray['30']
                                }
                            />
                        </div>
                    </button>
                </div>
            </div>

            <ul
                className={
                    viewMode === 'grid'
                        ? styles.recipeGrid
                        : styles.recipeDetailGrid
                }
            >
                {recipeList.map((recipe) => (
                    <li key={recipe.sno}>
                        {viewMode === 'grid' ? (
                            <RecipeCard recipe={recipe} />
                        ) : (
                            <CollectionRecipeCard recipe={recipe} />
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};
