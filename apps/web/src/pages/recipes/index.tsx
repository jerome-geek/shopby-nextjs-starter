import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { parseAsInteger, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useTranslation } from 'react-i18next';

import { RecipeCard } from '@/components/recipe/card';
import { RecipeDetailCard } from '@/components/recipe/detail-card';
import { Paging } from '@/components/ui/paging';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { vars } from '@/styles/theme.css';

import * as styles from '@/pages/recipes/index.css';

const RecipesPage = () => {
    const { t } = useTranslation();

    // nuqs를 사용한 쿼리 파라미터 관리
    const [queryParams, setQueryParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        take: parseAsInteger.withDefault(12),
        sortBy: parseAsStringLiteral([
            'LATEST',
            'BOOKMARK_COUNT',
            'LIKE_COUNT',
        ]).withDefault('LATEST'),
        order: parseAsStringLiteral(['ASC', 'DESC']).withDefault('DESC'),
        viewMode: parseAsStringLiteral(['grid', 'details']).withDefault('grid'),
    });

    const { data: recipeListData, isLoading } = usePublicRecipeSearch({
        searchParams: {
            page: queryParams.page,
            take: queryParams.take,
            sortBy: queryParams.sortBy,
            order: queryParams.order,
        },
    });

    const recipeList = recipeListData?.data || [];
    const totalCount = recipeListData?.count || 0;

    if (isLoading) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t('레시피 탐색')}</h1>
                <button
                    className={styles.viewToggle}
                    onClick={() =>
                        setQueryParams({
                            viewMode:
                                queryParams.viewMode === 'details'
                                    ? 'grid'
                                    : 'details',
                        })
                    }
                    type='button'
                >
                    <motion.div
                        className={styles.toggleActiveBg}
                        initial={false}
                        animate={{
                            x:
                                queryParams.viewMode === 'details'
                                    ? typeof window !== 'undefined' &&
                                      window.innerWidth > 768
                                        ? 38
                                        : 34
                                    : 0,
                        }}
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.5,
                        }}
                    />
                    <div className={styles.toggleItem}>
                        <LayoutGrid
                            size={18}
                            color={
                                queryParams.viewMode === 'grid'
                                    ? vars.color.black
                                    : vars.color.gray['30']
                            }
                        />
                    </div>
                    <div className={styles.toggleItem}>
                        <List
                            size={18}
                            color={
                                queryParams.viewMode === 'details'
                                    ? vars.color.black
                                    : vars.color.gray['30']
                            }
                        />
                    </div>
                </button>
            </header>

            <motion.ul
                className={
                    queryParams.viewMode === 'grid'
                        ? styles.gridList
                        : styles.detailList
                }
                initial='hidden'
                animate='visible'
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                }}
            >
                {recipeList.map((recipe) => (
                    <motion.li
                        key={recipe.sno}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {queryParams.viewMode === 'grid' ? (
                            <RecipeCard recipe={recipe} />
                        ) : (
                            <RecipeDetailCard recipe={recipe} />
                        )}
                    </motion.li>
                ))}
            </motion.ul>

            <footer style={{ marginTop: '40px' }}>
                <Paging
                    currentPage={queryParams.page}
                    totalCount={totalCount}
                    pageSize={queryParams.take}
                    onPageClick={(page) =>
                        setQueryParams({ page }, { scroll: true })
                    }
                />
            </footer>
        </div>
    );
};

export default RecipesPage;
