import { IntegratedSearchView } from '@/components/search/integrated-search-view';
import { useCollectionSearch } from '../../hooks/useCollectionSearch';
import { useRecipeSearch } from '../../hooks/useRecipeSearch';
import { useShoppingSearch } from '../../hooks/useShoppingSearch';

export const IntegratedSearchContainer = () => {
    const shopping = useShoppingSearch({ isIntegrated: true });
    const recipe = useRecipeSearch({ isIntegrated: true });
    const collection = useCollectionSearch({ isIntegrated: true });

    return (
        <IntegratedSearchView
            totalCount={
                shopping.totalCount + recipe.totalCount + collection.totalCount
            }
            productList={shopping.products}
            recipeList={recipe.recipes}
            collectionList={collection.collections}
            shoppingFetchNextPage={shopping.fetchNextPage}
            shoppingHasNextPage={shopping.hasNextPage}
            recipeFetchNextPage={recipe.fetchNextPage}
            recipeHasNextPage={recipe.hasNextPage}
            collectionFetchNextPage={collection.fetchNextPage}
            collectionHasNextPage={collection.hasNextPage}
        />
    );
};
