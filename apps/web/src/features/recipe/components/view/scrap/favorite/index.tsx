import { LayoutGrid, List, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeCard } from '@/features/recipe/components/view/card';
import { RecipeDetailCard } from '@/features/recipe/components/view/detail-card';
import { useSearchMyRecipeList } from '@/hooks/suspenseQuery/shop/recipe';

import * as styles from '@/features/recipe/components/view/scrap/favorite/index.css';

export const ScrapFavoriteContent = () => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<'grid' | 'details'>('grid');

    const { data: searchMyRecipeListData } = useSearchMyRecipeList({
        searchParams: { order: 'DESC', page: 1, take: 20 },
    });

    const recipeList = searchMyRecipeListData.data || [];

    if (recipeList.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.emptyContainer}
            >
                <div className={styles.emptyIconWrapper}>
                    <List size={32} />
                </div>
                <div>
                    <h3 className={styles.emptyTitle}>
                        {t('내가 좋아하는 레시피')}
                    </h3>
                    <p className={styles.emptyDescription}>
                        {t('아직 좋아하는 레시피가 없습니다.')}
                        <br />
                        {t('마음에 드는 레시피에 좋아요를 눌러보세요!')}
                    </p>
                </div>
                <button className={styles.primaryButton} type='button'>
                    {t('탐색하러 가기')}
                </button>
            </motion.div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleArea}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>
                            {t('내가 좋아하는 레시피')}
                        </h2>
                        <button className={styles.removeButton} type='button'>
                            <Plus
                                size={18}
                                style={{ transform: 'rotate(45deg)' }}
                            />
                        </button>
                    </div>

                    <p className={styles.subtitle}>
                        {t(
                            '제가 좋아하지만 누구에게나 추천합니다 즐거운 식사 합시다',
                        )}
                    </p>

                    <p className={styles.metaText}>
                        {t('By 나 · {{count}}개', { count: recipeList.length })}
                    </p>
                </div>

                <button
                    className={styles.viewToggle}
                    onClick={() =>
                        setViewMode((v) =>
                            v === 'details' ? 'grid' : 'details',
                        )
                    }
                    type='button'
                    aria-label={t('보기 방식 변경')}
                >
                    <motion.div
                        className={styles.toggleActiveBg}
                        initial={false}
                        animate={{ x: viewMode === 'grid' ? 26 : 2 }} // Adjusted based on size
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.5,
                        }}
                        style={{
                            left: 0,
                            x: viewMode === 'details' ? 2 : 28, // Details is left, Grid is right
                        }}
                    />
                    <div className={styles.toggleItem}>
                        <List
                            size={18}
                            color={viewMode === 'details' ? '#000' : '#ccc'}
                        />
                    </div>
                    <div className={styles.toggleItem}>
                        <LayoutGrid
                            size={18}
                            color={viewMode === 'grid' ? '#000' : '#ccc'}
                        />
                    </div>
                </button>
            </header>

            <AnimatePresence mode='wait'>
                <motion.ul
                    key={viewMode}
                    className={
                        viewMode === 'grid' ? styles.grid : styles.detailsGrid
                    }
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {recipeList.map((recipe) => (
                        <motion.li
                            key={recipe.sno}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {viewMode === 'grid' ? (
                                <RecipeCard recipe={recipe} />
                            ) : (
                                <RecipeDetailCard recipe={recipe} />
                            )}
                        </motion.li>
                    ))}
                </motion.ul>
            </AnimatePresence>
        </div>
    );
};
