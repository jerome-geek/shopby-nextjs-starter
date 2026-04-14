import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';

import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import { RecipeCard } from '@/components/recipe/recipe-card';
import * as styles from '@/components/search/recipe-results/index.css';
import PagingV2 from '@/components/ui/paging-v2';
import { RECIPE_PAGE_QUERY_KEY } from '@/const/search';
import useInfinitePublicRecipeSearch from '@/hooks/query/shop/recipe/useInfinitePublicRecipeSearch';
import { useResponsive } from '@/hooks/utils';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

type RecipeSearchResultsProps = {
    recipeList: GetRecipeDetailResponse[];
    fetchNextPage: ReturnType<
        typeof useInfinitePublicRecipeSearch
    >['fetchNextPage'];
    hasNextPage: boolean;
    totalCount: number;
    currentPage: number;
    pageSize: number;
};

export const RecipeSearchResults = ({
    recipeList,
    fetchNextPage,
    hasNextPage,
    totalCount,
    currentPage,
    pageSize,
}: RecipeSearchResultsProps) => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    return (
        <div className={styles.container}>
            {isEmpty(recipeList) ? (
                <NoResult
                    className={styles.noResult}
                    text='검색 결과가 없습니다.'
                    isIconVisible={false}
                />
            ) : (
                <div className={styles.recipeContainer}>
                    {recipeList.map((recipe) => (
                        <RecipeCard key={recipe.sno} recipe={recipe} />
                    ))}
                </div>
            )}

            {isTablet ? (
                <ObserverTarget
                    onIntersect={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    hasNextPage={hasNextPage}
                    totalCount={totalCount}
                />
            ) : (
                <PagingV2
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    onPageClick={(pageNumber) => {
                        router.replace(
                            {
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    [RECIPE_PAGE_QUERY_KEY]: String(pageNumber),
                                },
                            },
                            undefined,
                            { shallow: true },
                        );
                    }}
                />
            )}
        </div>
    );
};
