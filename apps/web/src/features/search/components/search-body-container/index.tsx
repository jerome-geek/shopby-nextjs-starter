import { CollectionSearchView } from '@/components/search/collection-search-view';
import { RecipeSearchView } from '@/components/search/recipe-search-view';
import { ShoppingSearchView } from '@/components/search/shopping-search-view';
import { SORT_OPTIONS } from '@/const/product';
import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';
import { useMainCategory } from '@/hooks/useMainCategory';
import { useProductFilter } from '@/hooks/useProductFilter';

import { CollectionSearchContainer } from '@/features/search/components/collection-search-container';
import { IntegratedSearchContainer } from '@/features/search/components/integrated-search-container';
import { RecipeSearchContainer } from '@/features/search/components/recipe-search-container';
import { ShoppingSearchContainer } from '@/features/search/components/shopping-search-container';

export const SearchBodyContainer = () => {
    const [params] = useProductSearchParams();
    const { mainCategoryNo } = useMainCategory();
    const { appliedSearchParams } = useProductFilter({
        categoryNo: mainCategoryNo,
    });

    const selectedSortOptionId =
        SORT_OPTIONS.find(
            (option) =>
                option.by === (params.by ?? appliedSearchParams.order?.by) &&
                option.direction ===
                    (params.direction ?? appliedSearchParams.order?.direction),
        )?.id ?? SORT_OPTIONS[0].id;

    switch (params.tab) {
        case 'shopping':
            return (
                <ShoppingSearchContainer>
                    {({
                        products,
                        totalCount,
                        hasNextPage,
                        fetchNextPage,
                        pageNumber,
                        pageSize,
                    }) => (
                        <ShoppingSearchView
                            mainCategoryNo={mainCategoryNo}
                            selectedSortOptionId={selectedSortOptionId}
                            productList={products}
                            fetchNextProductPage={fetchNextPage!}
                            hasNextProductPage={hasNextPage!}
                            productTotalCount={totalCount}
                            currentPage={pageNumber}
                            pageSize={pageSize}
                        />
                    )}
                </ShoppingSearchContainer>
            );
        case 'recipe':
            return (
                <RecipeSearchContainer>
                    {({
                        recipes,
                        totalCount,
                        hasNextPage,
                        fetchNextPage,
                        pageNumber,
                        pageSize,
                    }) => (
                        <RecipeSearchView
                            recipeSortOrder={params['recipe.order']}
                            recipeSortBy={params['recipe.sortBy']}
                            recipeList={recipes}
                            fetchNextRecipePage={fetchNextPage!}
                            hasNextRecipePage={hasNextPage!}
                            recipeTotalCount={totalCount}
                            currentPage={pageNumber}
                            pageSize={pageSize}
                        />
                    )}
                </RecipeSearchContainer>
            );
        case 'collection':
            return (
                <CollectionSearchContainer>
                    {({
                        collections,
                        totalCount,
                        hasNextPage,
                        fetchNextPage,
                        pageNumber,
                        pageSize,
                    }) => (
                        <CollectionSearchView
                            collectionSortOrder={params['collection.order']}
                            collectionSortBy={params['collection.sortBy']}
                            collectionList={collections}
                            fetchNextCollectionPage={fetchNextPage!}
                            hasNextCollectionPage={hasNextPage!}
                            collectionTotalCount={totalCount}
                            currentPage={pageNumber}
                            pageSize={pageSize}
                        />
                    )}
                </CollectionSearchContainer>
            );
        case 'integrated':
        default:
            return <IntegratedSearchContainer />;
    }
};
