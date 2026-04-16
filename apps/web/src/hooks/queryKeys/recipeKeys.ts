import type {
    GetRecipeExposureGroupParams,
    SearchPublicRecipesParams,
} from '@/models/shop/recipe';
import type { SearchRecipesParams } from '@/models/shop/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    lists: () => [...recipeKeys.all, 'list'] as const,
    list: (params?: SearchRecipesParams) =>
        [...recipeKeys.lists(), params] as const,

    publicSearches: () => [...recipeKeys.all, 'public-search'] as const,
    publicSearch: (params: SearchPublicRecipesParams) =>
        [...recipeKeys.publicSearches(), params] as const,
    publicSearchInfinite: (params: Omit<SearchPublicRecipesParams, 'page'>) =>
        [...recipeKeys.publicSearches(), 'infinite', params] as const,

    details: () => [...recipeKeys.all, 'detail'] as const,
    detail: (sno: number, memberNo: number) =>
        [...recipeKeys.details(), sno, memberNo] as const,

    collections: () => [...recipeKeys.all, 'collections'] as const,

    sharedCollections: () => [...recipeKeys.all, 'shared-collection'] as const,
    sharedCollection: (shareCode: string) =>
        [...recipeKeys.sharedCollections(), shareCode] as const,

    exposureGroups: () => [...recipeKeys.all, 'exposure-groups'] as const,
    exposureGroup: (groupId: string, params?: GetRecipeExposureGroupParams) =>
        [...recipeKeys.exposureGroups(), groupId, params] as const,
};

export default recipeKeys;
