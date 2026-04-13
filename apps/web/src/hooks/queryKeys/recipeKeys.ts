import type { SearchPublicRecipesParams } from '@/models/shop/recipe';
import { SearchRecipesParams } from '@/models/shop/recipe';

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
};

export default recipeKeys;
