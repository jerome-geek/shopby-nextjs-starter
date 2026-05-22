import type {
    GetRecipeExposureGroupParams,
    SearchPublicRecipesParams,
    SearchRecipesParams,
} from '@/models/shop/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    lists: () => [...recipeKeys.all, 'list'] as const,
    list: (params?: SearchRecipesParams) =>
        [...recipeKeys.lists(), params ?? null] as const,

    publicSearches: () => [...recipeKeys.all, 'public-search'] as const,
    publicSearch: (searchParams: SearchPublicRecipesParams) =>
        [...recipeKeys.publicSearches(), searchParams] as const,
    publicSearchInfinite: (params: Omit<SearchPublicRecipesParams, 'page'>) =>
        [...recipeKeys.publicSearches(), 'infinite', params] as const,

    details: () => [...recipeKeys.all, 'detail'] as const,
    detail: (sno: number) =>
        [...recipeKeys.details(), sno] as const,

    collections: () => [...recipeKeys.all, 'collections'] as const,

    sharedCollections: () => [...recipeKeys.all, 'shared-collection'] as const,
    sharedCollection: (shareCode: string) =>
        [...recipeKeys.sharedCollections(), shareCode] as const,

    exposureGroups: () => [...recipeKeys.all, 'exposure-groups'] as const,
    exposureGroup: (groupId: string, params?: GetRecipeExposureGroupParams) =>
        [...recipeKeys.exposureGroups(), groupId, params ?? null] as const,
};

export default recipeKeys;
