export const SEARCH_TABS = [
    { id: 'integrated', label: '통합' },
    { id: 'shopping', label: '쇼핑' },
    { id: 'recipe', label: '레시피' },
    { id: 'collection', label: '컬렉션' },
] as const;

export type SearchTabId = (typeof SEARCH_TABS)[number]['id'];

export const TAB_QUERY_KEY = 'tab' as const;
export const RECIPE_ORDER_QUERY_KEY = 'recipe.order' as const;
export const RECIPE_SORT_BY_QUERY_KEY = 'recipe.sortBy' as const;
export const COLLECTION_ORDER_QUERY_KEY = 'collection.order' as const;
export const COLLECTION_SORT_BY_QUERY_KEY = 'collection.sortBy' as const;
export const RECIPE_PAGE_QUERY_KEY = 'recipe.page' as const;
export const COLLECTION_PAGE_QUERY_KEY = 'collection.page' as const;

export const INTEGRATED_SEARCH_PAGE = {
    product: 4,
    recipe: 4,
    collection: 2,
} as const;

export const RECIPE_TAKE_PER_TAB = 8;
export const COLLECTION_TAKE_PER_TAB = 8;
