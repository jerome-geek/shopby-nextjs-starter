import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { ProductListSearchInput } from '@/features/product/list/search-input';
import { SearchMobileSort } from '@/features/search/components/view/mobile-sort';
import { RecipeSearchResults } from '@/features/search/components/view/recipe-results';
import { SearchTabNav } from '@/features/search/components/view/tab-nav';
import { Row } from '@/shared/ui/layout/flex';
import { RECIPE_SORT_OPTIONS, type RecipeSortBy } from '@/features/recipe/constants';
import {
    RECIPE_ORDER_QUERY_KEY,
    RECIPE_PAGE_QUERY_KEY,
    RECIPE_SORT_BY_QUERY_KEY,
} from '@/features/search/constants';
import useInfinitePublicRecipeSearch from '@/hooks/infiniteQuery/shop/recipe/useInfinitePublicRecipeSearch';
import { useSearchTab } from '@/hooks/useSearchTab';
import { useResponsive } from '@/hooks/utils';
import type { OrderDirectionType } from '@/models';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import * as styles from '@/pages/search/index.css';
import { vars } from '@/styles/theme.css';

type RecipeSearchViewProps = {
    recipeSortOrder: OrderDirectionType;
    recipeSortBy: RecipeSortBy;
    recipeList: GetRecipeDetailResponse[];
    fetchNextRecipePage: ReturnType<
        typeof useInfinitePublicRecipeSearch
    >['fetchNextPage'];
    hasNextRecipePage: boolean;
    recipeTotalCount: number;
    currentPage: number;
    pageSize: number;
};

export const RecipeSearchView = ({
    recipeSortOrder,
    recipeSortBy,
    recipeList,
    fetchNextRecipePage,
    hasNextRecipePage,
    recipeTotalCount,
    currentPage,
    pageSize,
}: RecipeSearchViewProps) => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    const { setTab } = useSearchTab();

    const replaceSearchQuery = useCallback(
        (patch: Record<string, string>) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: { ...router.query, ...patch },
                },
                undefined,
                { shallow: true },
            );
        },
        [router],
    );

    return (
        <div className={styles.container}>
            {isTablet ? (
                <div className={styles.mobileTopContainer}>
                    <ProductListSearchInput
                        syncKeywordFromUrl
                        onBack={() => router.back()}
                        className={styles.searchInput}
                    />
                    <SearchTabNav activeTab='recipe' onTabChange={setTab} />
                    <SearchMobileSort
                        orderQueryKey={RECIPE_ORDER_QUERY_KEY}
                        sortByQueryKey={RECIPE_SORT_BY_QUERY_KEY}
                        pageQueryKey={RECIPE_PAGE_QUERY_KEY}
                        sortOptions={RECIPE_SORT_OPTIONS}
                    />
                    <div className={styles.totalCount}>
                        <span className={styles.totalCountValue}>
                            {recipeTotalCount}
                        </span>
                        개의 검색 결과
                    </div>
                </div>
            ) : (
                <aside className={styles.sideBar}>
                    <SearchTabNav activeTab='recipe' onTabChange={setTab} />
                </aside>
            )}

            <section className={styles.contentArea}>
                {!isTablet && (
                    <Row
                        justify='between'
                        align='center'
                        style={{
                            paddingBottom: '12px',
                            borderBottom: `1px solid ${vars.color.gray['20']}`,
                        }}
                    >
                        <div className={styles.totalCount}>
                            <span className={styles.totalCountValue}>
                                {recipeTotalCount}
                            </span>
                            개의 검색 결과
                        </div>

                        <ul className={styles.sortList}>
                            {RECIPE_SORT_OPTIONS.map((sortOption) => (
                                <li key={sortOption.id}>
                                    <button
                                        type='button'
                                        className={styles.sortListButton}
                                        data-selected={
                                            recipeSortOrder ===
                                                sortOption.order &&
                                            recipeSortBy === sortOption.sortBy
                                                ? 'true'
                                                : undefined
                                        }
                                        onClick={() =>
                                            replaceSearchQuery({
                                                [RECIPE_ORDER_QUERY_KEY]:
                                                    sortOption.order,
                                                [RECIPE_SORT_BY_QUERY_KEY]:
                                                    sortOption.sortBy,
                                                [RECIPE_PAGE_QUERY_KEY]: '1',
                                            })
                                        }
                                    >
                                        {sortOption.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Row>
                )}

                <RecipeSearchResults
                    recipeList={recipeList}
                    fetchNextPage={fetchNextRecipePage}
                    hasNextPage={hasNextRecipePage}
                    totalCount={recipeTotalCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </section>
        </div>
    );
};
