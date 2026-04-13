import type { SearchPublicCollectionParams } from '@/models/shop/collection';

const collectionKeys = {
    all: ['collection'] as const,

    publicSearches: () => [...collectionKeys.all, 'public-search'] as const,
    publicSearch: (params: SearchPublicCollectionParams) =>
        [...collectionKeys.publicSearches(), params] as const,
    publicSearchInfinite: (
        params: Omit<SearchPublicCollectionParams, 'page'>,
    ) => [...collectionKeys.publicSearches(), 'infinite', params] as const,
};

export default collectionKeys;
