import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { parseAsInteger, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useDeferredValue } from 'react';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/components/common/FetchBoundary';
import { RecipeCard } from '@/components/recipe/card';
import { RecipeDetailCard } from '@/components/recipe/detail-card';
import { Paging } from '@/components/ui/paging';
import { usePublicRecipeSearch } from '@/hooks/suspenseQuery/shop/recipe';
import type { SearchPublicRecipesParams } from '@/models/shop/recipe';
import * as styles from '@/pages/recipes/index.css';
import { RecipeSearchSkeleton } from '@/components/recipe/search-skeleton';
import { vars } from '@/styles/theme.css';

interface RecipeQueryParams extends SearchPublicRecipesParams {
    viewMode: 'grid' | 'details';
}

/**
 * 분리된 리스트 컴포넌트
 * useDeferredValue를 통해 부모로부터 받은 queryParams의 변경을 지연 처리하여
 * 데이터 로드 중 기존 UI를 유지하고 로딩 상태(isPending)를 자체적으로 계산합니다.
 */
const RecipeList = ({
    queryParams,
    onPageChange,
}: {
    queryParams: RecipeQueryParams;
    onPageChange: (page: number) => void;
}) => {
    // queryParams의 지연된 버전을 생성
    const deferredParams = useDeferredValue(queryParams);
    // 실제 값과 지연된 값이 다르면 데이터 로드 중인 것으로 간주 (0.5 opacity 적용)
    const isPending = queryParams !== deferredParams;

    const { data: recipeListData } = usePublicRecipeSearch({
        searchParams: {
            page: deferredParams.page,
            take: deferredParams.take,
            sortBy: deferredParams.sortBy,
            order: deferredParams.order,
        },
    });
    console.log('🚀 ~ RecipeList ~ recipeListData:', recipeListData);

    const recipeList = recipeListData.data || [];
    const totalCount = recipeListData.count || 0;

    return (
        <div
            className={`${styles.listContainer} ${isPending ? styles.isPending : ''}`}
        >
            <ul
                className={
                    deferredParams.viewMode === 'grid'
                        ? styles.gridList
                        : styles.detailList
                }
            >
                {recipeList.map((recipe) => (
                    <li key={recipe.sno}>
                        {deferredParams.viewMode === 'grid' ? (
                            <RecipeCard recipe={recipe} />
                        ) : (
                            <RecipeDetailCard recipe={recipe} />
                        )}
                    </li>
                ))}
            </ul>

            <footer>
                <Paging
                    currentPage={Number(deferredParams.page)}
                    totalCount={totalCount}
                    pageSize={Number(deferredParams.take)}
                    onPageClick={onPageChange}
                />
            </footer>
        </div>
    );
};

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
