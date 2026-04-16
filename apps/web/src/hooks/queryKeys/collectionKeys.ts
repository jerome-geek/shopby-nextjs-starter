import type { SearchPublicCollectionParams } from '@/models/shop/collection';

const collectionKeys = {
    all: ['collection'] as const,

    list: () => [...collectionKeys.all, 'list'] as const,

    publicSearches: () => [...collectionKeys.all, 'public-search'] as const,
    publicSearch: (params: SearchPublicCollectionParams) =>
        [...collectionKeys.publicSearches(), params] as const,
    publicSearchInfinite: (
        params: Omit<SearchPublicCollectionParams, 'page'>,
    ) => [...collectionKeys.publicSearches(), 'infinite', params] as const,

    exposureGroups: () => [...collectionKeys.all, 'exposure-groups'] as const,
    exposureGroup: (groupId: string) =>
        [...collectionKeys.exposureGroups(), groupId] as const,

    detail: (shareCode: string) => [...collectionKeys.all, shareCode] as const,
};

export default collectionKeys;
