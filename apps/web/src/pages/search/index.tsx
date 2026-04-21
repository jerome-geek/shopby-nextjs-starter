import { useRouter } from 'next/router';
import { useMemo } from 'react';

import type { OrderDirectionType } from '@/models';

import { ProductListSearchInput } from '@/components/product-list/search-input';
import { CollectionSearchView } from '@/components/search/collection-search-view';
import { IntegratedSearchView } from '@/components/search/integrated-search-view';
import { RecipeSearchView } from '@/components/search/recipe-search-view';
import { ShoppingSearchView } from '@/components/search/shopping-search-view';
import { Column } from '@/components/ui/layout/flex';
import { SORT_OPTIONS } from '@/const/product';
import { type CollectionSortBy, type RecipeSortBy } from '@/const/recipe';
import {
    COLLECTION_ORDER_QUERY_KEY,
    COLLECTION_PAGE_QUERY_KEY,
    COLLECTION_SORT_BY_QUERY_KEY,
    COLLECTION_TAKE_PER_TAB,
    INTEGRATED_SEARCH_PAGE,
    RECIPE_ORDER_QUERY_KEY,
    RECIPE_PAGE_QUERY_KEY,
    RECIPE_SORT_BY_QUERY_KEY,
    RECIPE_TAKE_PER_TAB,
    SEARCH_TABS,
    TAB_QUERY_KEY,
    type SearchTabId,
} from '@/const/search';
import { useInfiniteProductList } from '@/hooks/infiniteQuery/product/product';
import { useCategoriesByCode } from '@/hooks/query/display/category';
import { useProductList } from '@/hooks/query/product/product';
import {
    useInfinitePublicCollectionSearch,
    usePublicCollectionSearch,
} from '@/hooks/query/shop/collection';
import {
    useInfinitePublicRecipeSearch,
    usePublicRecipeSearch,
} from '@/hooks/query/shop/recipe';
import { useProductFilter } from '@/hooks/useProductFilter';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/search/index.css';

const parseOrderDirectionParam = (
    value: string | string[] | undefined,
): OrderDirectionType => {
    const raw = Array.isArray(value) ? value[0] : value;

    if (raw === 'ASC' || raw === 'DESC') {
        return raw;
    }

    return 'DESC';
};

const parseSortByParam = <TSortBy extends string>(
    value: string | string[] | undefined,
    options: readonly TSortBy[],
    fallback: TSortBy,
): TSortBy => {
    const raw = Array.isArray(value) ? value[0] : value;

    if (raw && options.includes(raw as TSortBy)) {
        return raw as TSortBy;
    }

    return fallback;
};

const parseSearchTabParam = (
    value: string | string[] | undefined,
): SearchTabId | undefined => {
    const tabFromQuery = Array.isArray(value) ? value[0] : value;

    return SEARCH_TABS.find((tab) => tab.id === tabFromQuery)?.id;
};

const parsePageParam = (value: string | string[] | undefined): number => {
    const raw = Array.isArray(value) ? value[0] : value;
    const parsed = Number(raw);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const Search = () => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    const { data: mainCategoryData } = useCategoriesByCode({
        data: {
            codes: ['MAIN'],
        },
    });

    const mainCategoryNo = mainCategoryData?.[0]?.displayCategoryNo ?? 0;

    const { appliedSearchParams } = useProductFilter({
        categoryNo: mainCategoryNo,
    });

    const selectedSortOptionId = useMemo(() => {
        const by = appliedSearchParams.order?.by;
        const direction = appliedSearchParams.order?.direction;
        return (
            SORT_OPTIONS.find(
                (option) => option.by === by && option.direction === direction,
            )?.id ?? SORT_OPTIONS[0].id
        );
    }, [appliedSearchParams.order?.by, appliedSearchParams.order?.direction]);

    const searchKeyword = appliedSearchParams.filter?.keywords ?? '';

    const recipeOrderQuery = router.query[RECIPE_ORDER_QUERY_KEY];
    const recipeSortByQuery = router.query[RECIPE_SORT_BY_QUERY_KEY];
    const collectionOrderQuery = router.query[COLLECTION_ORDER_QUERY_KEY];
    const collectionSortByQuery = router.query[COLLECTION_SORT_BY_QUERY_KEY];
    const recipePageQuery = router.query[RECIPE_PAGE_QUERY_KEY];
    const collectionPageQuery = router.query[COLLECTION_PAGE_QUERY_KEY];

    const recipeSortOrder = useMemo(
        () => parseOrderDirectionParam(recipeOrderQuery),
        [recipeOrderQuery],
    );
    const collectionSortOrder = useMemo(
        () => parseOrderDirectionParam(collectionOrderQuery),
        [collectionOrderQuery],
    );
    const recipeSortBy = useMemo(
        () =>
            parseSortByParam<RecipeSortBy>(
                recipeSortByQuery,
                ['LATEST', 'BOOKMARK_COUNT', 'LIKE_COUNT'],
                'LATEST',
            ),
        [recipeSortByQuery],
    );
    const collectionSortBy = useMemo(
        () =>
            parseSortByParam<CollectionSortBy>(
                collectionSortByQuery,
                ['LATEST', 'BOOKMARK_COUNT'],
                'LATEST',
            ),
        [collectionSortByQuery],
    );
    const recipeCurrentPage = useMemo(
        () => parsePageParam(recipePageQuery),
        [recipePageQuery],
    );
    const collectionCurrentPage = useMemo(
        () => parsePageParam(collectionPageQuery),
        [collectionPageQuery],
    );

    const tabQuery = router.query[TAB_QUERY_KEY];
    const selectedTab = useMemo(
        () => parseSearchTabParam(tabQuery) ?? 'integrated',
        [tabQuery],
    );

    const isIntegratedTab = selectedTab === 'integrated';

    const productSearchParams = useMemo(
        () => ({
            ...appliedSearchParams,
            pageSize: isIntegratedTab
                ? INTEGRATED_SEARCH_PAGE.product
                : appliedSearchParams.pageSize,
            filter: {
                ...appliedSearchParams.filter,
                includeLikeSearch: true,
            },
        }),
        [appliedSearchParams, isIntegratedTab],
    );

    const recipeTake = isIntegratedTab
        ? INTEGRATED_SEARCH_PAGE.recipe
        : RECIPE_TAKE_PER_TAB;
    const collectionTake = isIntegratedTab
        ? INTEGRATED_SEARCH_PAGE.collection
        : COLLECTION_TAKE_PER_TAB;

    const shoppingTabInfiniteEnabled =
        (selectedTab === 'integrated' ||
            (selectedTab === 'shopping' && isTablet)) &&
        mainCategoryNo !== 0;
    const shoppingTabQueryEnabled =
        selectedTab === 'shopping' && !isTablet && mainCategoryNo !== 0;

    const recipeTabInfiniteEnabled =
        selectedTab === 'integrated' || (selectedTab === 'recipe' && isTablet);
    const recipeTabQueryEnabled = selectedTab === 'recipe' && !isTablet;

    const collectionTabInfiniteEnabled =
        selectedTab === 'integrated' ||
        (selectedTab === 'collection' && isTablet);
    const collectionTabQueryEnabled = selectedTab === 'collection' && !isTablet;

    const {
        fetchNextPage: fetchNextProductPage,
        hasNextPage: hasNextProductPage,
        data: infiniteProductListData,
    } = useInfiniteProductList({
        searchParams: productSearchParams,
        options: {
            enabled: shoppingTabInfiniteEnabled,
        },
    });

    const { data: productListData } = useProductList({
        searchParams: productSearchParams,
        options: {
            enabled: shoppingTabQueryEnabled,
        },
    });

    const {
        data: infiniteRecipeData,
        fetchNextPage: fetchNextRecipePage,
        hasNextPage: hasNextRecipePage,
    } = useInfinitePublicRecipeSearch({
        searchParams: {
            keyword: searchKeyword,
            order: recipeSortOrder,
            sortBy: recipeSortBy,
            take: recipeTake,
        },
        options: {
            enabled: recipeTabInfiniteEnabled,
        },
    });

    const { data: recipeData } = usePublicRecipeSearch({
        searchParams: {
            keyword: searchKeyword,
            order: recipeSortOrder,
            sortBy: recipeSortBy,
            page: recipeCurrentPage,
            take: recipeTake,
        },
        options: {
            enabled: recipeTabQueryEnabled,
        },
    });

    const {
        data: infiniteCollectionData,
        fetchNextPage: fetchNextCollectionPage,
        hasNextPage: hasNextCollectionPage,
    } = useInfinitePublicCollectionSearch({
        searchParams: {
            keyword: searchKeyword,
            order: collectionSortOrder,
            sortBy: collectionSortBy,
            take: collectionTake,
        },
        options: {
            enabled: collectionTabInfiniteEnabled,
        },
    });

    const { data: collectionData } = usePublicCollectionSearch({
        searchParams: {
            keyword: searchKeyword,
            order: collectionSortOrder,
            sortBy: collectionSortBy,
            page: collectionCurrentPage,
            take: collectionTake,
        },
        options: {
            enabled: collectionTabQueryEnabled,
        },
    });

    const productList = useMemo(() => {
        if (selectedTab === 'shopping' && !isTablet) {
            return productListData?.items ?? [];
        }

        return (
            infiniteProductListData?.pages.flatMap((page) => page.data.items) ??
            []
        );
    }, [
        infiniteProductListData,
        isTablet,
        productListData?.items,
        selectedTab,
    ]);
    const productTotalCount =
        selectedTab === 'shopping' && !isTablet
            ? (productListData?.totalCount ?? 0)
            : (infiniteProductListData?.pages[0]?.data.totalCount ?? 0);

    const recipeList = useMemo(() => {
        if (selectedTab === 'recipe' && !isTablet) {
            return recipeData?.data ?? [];
        }

        return infiniteRecipeData?.pages.flatMap((page) => page.data) ?? [];
    }, [infiniteRecipeData, isTablet, recipeData?.data, selectedTab]);
    const recipeTotalCount =
        selectedTab === 'recipe' && !isTablet
            ? (recipeData?.count ?? 0)
            : (infiniteRecipeData?.pages[0]?.count ?? 0);

    const collectionList = useMemo(() => {
        if (selectedTab === 'collection' && !isTablet) {
            return collectionData?.data ?? [];
        }

        return infiniteCollectionData?.pages.flatMap((page) => page.data) ?? [];
    }, [collectionData?.data, infiniteCollectionData, isTablet, selectedTab]);
    const collectionTotalCount =
        selectedTab === 'collection' && !isTablet
            ? (collectionData?.count ?? 0)
            : (infiniteCollectionData?.pages[0]?.count ?? 0);

    const integratedTotalCount = useMemo(
        () => productTotalCount + recipeTotalCount + collectionTotalCount,
        [productTotalCount, recipeTotalCount, collectionTotalCount],
    );

    const renderSearchBody = (tab: SearchTabId) => {
        switch (tab) {
            case 'shopping':
                return (
                    <ShoppingSearchView
                        mainCategoryNo={mainCategoryNo}
                        selectedSortOptionId={selectedSortOptionId}
                        productList={productList}
                        fetchNextProductPage={fetchNextProductPage}
                        hasNextProductPage={hasNextProductPage ?? false}
                        productTotalCount={productTotalCount}
                        currentPage={productSearchParams.pageNumber ?? 1}
                        pageSize={productSearchParams.pageSize ?? 20}
                    />
                );
            case 'recipe':
                return (
                    <RecipeSearchView
                        recipeSortOrder={recipeSortOrder}
                        recipeSortBy={recipeSortBy}
                        recipeList={recipeList}
                        fetchNextRecipePage={fetchNextRecipePage}
                        hasNextRecipePage={hasNextRecipePage ?? false}
                        recipeTotalCount={recipeTotalCount}
                        currentPage={recipeCurrentPage}
                        pageSize={recipeTake}
                    />
                );
            case 'collection':
                return (
                    <CollectionSearchView
                        collectionSortOrder={collectionSortOrder}
                        collectionSortBy={collectionSortBy}
                        collectionList={collectionList}
                        fetchNextCollectionPage={fetchNextCollectionPage}
                        hasNextCollectionPage={hasNextCollectionPage ?? false}
                        collectionTotalCount={collectionTotalCount}
                        currentPage={collectionCurrentPage}
                        pageSize={collectionTake}
                    />
                );
            case 'integrated':
            default:
                return (
                    <IntegratedSearchView
                        totalCount={integratedTotalCount}
                        productList={productList}
                        recipeList={recipeList}
                        collectionList={collectionList}
                        shoppingFetchNextPage={fetchNextProductPage}
                        shoppingHasNextPage={hasNextProductPage ?? false}
                        recipeFetchNextPage={fetchNextRecipePage}
                        recipeHasNextPage={hasNextRecipePage ?? false}
                        collectionFetchNextPage={fetchNextCollectionPage}
                        collectionHasNextPage={hasNextCollectionPage ?? false}
                    />
                );
        }
    };

    return (
        <Column style={{ gap: '90px', paddingTop: isTablet ? '0' : '66px' }}>
            {!isTablet && (
                <div className={styles.searchInputContainer}>
                    <ProductListSearchInput syncKeywordFromUrl />
                </div>
            )}

            {renderSearchBody(selectedTab)}
        </Column>
    );
};

export default Search;
