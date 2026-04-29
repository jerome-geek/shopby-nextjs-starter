'use client';

import { useDeferredValue } from 'react';

import { RecipeCard } from '@/components/recipe/card';
import { RecipeDetailCard } from '@/components/recipe/detail-card';
import { Paging } from '@/components/ui/paging';
import * as styles from '@/features/recipe/components/RecipeList.css';
import { usePublicRecipeSearch } from '@/hooks/suspenseQuery/shop/recipe';
import type { SearchPublicRecipesParams } from '@/models/shop/recipe';

export interface RecipeQueryParams extends SearchPublicRecipesParams {
    viewMode: 'grid' | 'details';
}

/**
 * 분리된 리스트 컴포넌트
 * useDeferredValue를 통해 부모로부터 받은 queryParams의 변경을 지연 처리하여
 * 데이터 로드 중 기존 UI를 유지하고 로딩 상태(isPending)를 자체적으로 계산합니다.
 */
export const RecipeList = ({
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

    const recipeList = recipeListData.data || [];
    const totalCount = recipeListData.count || 0;

    return (
        <div
            className={`${styles.listContainer} ${
                isPending ? styles.isPending : ''
            }`}
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
