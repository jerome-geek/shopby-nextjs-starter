import { flatMap, pipe, toArray } from '@fxts/core';
import { useMemo } from 'react';

import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';
import { INTEGRATED_SEARCH_PAGE, RECIPE_TAKE_PER_TAB } from '@/const/search';
import {
    useInfinitePublicRecipeSearch,
    usePublicRecipeSearch,
} from '@/hooks/query/shop/recipe';
import { useResponsive } from '@/hooks/utils';
import { OrderDirectionType } from '@/models';
import { RecipeSortBy } from '@/const/recipe';

interface UseRecipeSearchProps {
    isIntegrated?: boolean;
}

export const useRecipeSearch = ({
    isIntegrated = false,
}: UseRecipeSearchProps = {}) => {
    const { isTablet } = useResponsive();
    const [searchParams] = useProductSearchParams();

    const recipeTake = isIntegrated
        ? INTEGRATED_SEARCH_PAGE.recipe
        : RECIPE_TAKE_PER_TAB;

    const isInfinite = isIntegrated || isTablet;
    const isQuery = !isIntegrated && !isTablet;

    const commonParams = useMemo(
        () => ({
            keyword: searchParams.keyword,
            order: searchParams['recipe.order'] as OrderDirectionType,
            sortBy: searchParams['recipe.sortBy'] as RecipeSortBy,
            take: recipeTake,
        }),
        [searchParams, recipeTake],
    );

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
    } = useInfinitePublicRecipeSearch({
        searchParams: commonParams,
        options: {
            enabled: isInfinite,
        },
    });

    const { data: queryData } = usePublicRecipeSearch({
        searchParams: {
            ...commonParams,
            page: searchParams['recipe.page'],
        },
        options: {
            enabled: isQuery,
        },
    });

    const recipes = useMemo(() => {
        if (isInfinite) {
            return pipe(
                infiniteData?.pages ?? [],
                flatMap((page) => page.data),
                toArray,
            );
        }
        return queryData?.data ?? [];
    }, [isInfinite, infiniteData, queryData]);

    const totalCount = isInfinite
        ? (infiniteData?.pages[0]?.count ?? 0)
        : (queryData?.count ?? 0);

    return {
        recipes,
        totalCount,
        hasNextPage: hasNextPage ?? false,
        fetchNextPage,
        pageNumber: searchParams['recipe.page'],
        pageSize: recipeTake,
    };
};
