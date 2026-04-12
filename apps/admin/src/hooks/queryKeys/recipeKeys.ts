import {
    GetRecipeExposureGroupsParams,
    SearchRecipesParams,
} from '@/model/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    /** 레시피 검색 */
    searchRecipes: () => [...recipeKeys.all, 'search'] as const,
    searchRecipe: (params: SearchRecipesParams) =>
        [...recipeKeys.searchRecipes(), params] as const,

    /** 레시피 노출 그룹 조회 */
    getRecipeExposureGroups: () =>
        [...recipeKeys.all, 'exposureGroups'] as const,
    getRecipeExposureGroup: (params?: GetRecipeExposureGroupsParams) =>
        [...recipeKeys.getRecipeExposureGroups(), params] as const,
};

export default recipeKeys;
