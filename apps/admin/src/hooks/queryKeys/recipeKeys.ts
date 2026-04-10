import { SearchRecipesParams } from '@/model/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    /** 레시피 검색 */
    searchRecipes: () => [...recipeKeys.all, 'search'] as const,
    searchRecipe: (params: SearchRecipesParams) =>
        [...recipeKeys.searchRecipes(), params] as const,
};

export default recipeKeys;
