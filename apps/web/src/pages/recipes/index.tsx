import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { parseAsInteger, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/components/common/FetchBoundary';
import { RecipeSearchSkeleton } from '@/components/recipe/search-skeleton';
import { RecipeList } from '@/features/recipe/components/RecipeList';
import * as styles from '@/pages/recipes/index.css';
import { vars } from '@/styles/theme.css';

const RecipesPage = () => {
    const { t } = useTranslation();

    // nuqs를 사용한 쿼리 파라미터 관리
    const [queryParams, setQueryParams] = useQueryStates(
        {
            page: parseAsInteger.withDefault(1),
            take: parseAsInteger.withDefault(12),
            sortBy: parseAsStringLiteral([
                'LATEST',
                'BOOKMARK_COUNT',
                'LIKE_COUNT',
            ]).withDefault('LATEST'),
            order: parseAsStringLiteral(['ASC', 'DESC']).withDefault('DESC'),
            viewMode: parseAsStringLiteral(['grid', 'details']).withDefault(
                'grid',
            ),
        },
        {
            shallow: true,
        },
    );

    const handleViewModeToggle = () => {
        setQueryParams({
            viewMode: queryParams.viewMode === 'details' ? 'grid' : 'details',
        });
    };

    const handlePageChange = (page: number) => {
        setQueryParams({ page }, { scroll: true });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t('레시피 탐색')}</h1>
                <button
                    className={styles.viewToggle}
                    onClick={handleViewModeToggle}
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

            <FetchBoundary
                fallback={
                    <RecipeSearchSkeleton
                        viewMode={queryParams.viewMode}
                        count={12}
                    />
                }
            >
                <RecipeList
                    queryParams={queryParams}
                    onPageChange={handlePageChange}
                />
            </FetchBoundary>
        </div>
    );
};

export default RecipesPage;
