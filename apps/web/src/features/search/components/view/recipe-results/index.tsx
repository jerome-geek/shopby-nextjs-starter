import { useTranslation } from 'react-i18next';
import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';

import { NoResult } from '@/shared/components/common/no-result';
import { ObserverTarget } from '@/shared/components/observer-target';
import * as styles from '@/features/search/components/view/recipe-results/index.css';
import PagingV2 from '@/shared/ui/paging-v2';
import { RECIPE_PAGE_QUERY_KEY } from '@/features/search/constants';
import { useInfinitePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { useResponsive } from '@/hooks/utils';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { RecipeCard } from '@/features/recipe/components/view';

interface RecipeSearchResultsProps {
    recipeList: GetRecipeDetailResponse[];
    fetchNextPage: ReturnType<
        typeof useInfinitePublicRecipeSearch
    >['fetchNextPage'];
    hasNextPage: boolean;
    totalCount: number;
    currentPage: number;
    pageSize: number;
}

export const RecipeSearchResults = ({
    recipeList,
    fetchNextPage,
    hasNextPage,
    totalCount,
    currentPage,
    pageSize,
}: RecipeSearchResultsProps) => {
    const { t } = useTranslation();

    const { isTablet } = useResponsive();

    const router = useRouter();

    return (
        <section className={styles.container}>
            {isEmpty(recipeList) ? (
                <NoResult
                    className={styles.noResult}
                    text={t('검색 결과가 없습니다.')}
                    isIconVisible={false}
                />
            ) : (
                <ul className={styles.recipeContainer}>
                    {recipeList.map((recipe) => (
                        <li key={recipe.sno}>
                            <RecipeCard recipe={recipe} />
                        </li>
                    ))}
                </ul>
            )}

            {isTablet ? (
                <ObserverTarget
                    onIntersect={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    hasNextPage={hasNextPage}
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
        </section>
    );
};
