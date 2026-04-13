import {
    GetRecipeExposureGroupsParams,
    SearchRecipesParams,
} from '@/model/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    /** 레시피 검색 */
    searchLists: () => [...recipeKeys.all, 'search'] as const,
    searchList: (params: SearchRecipesParams) =>
        [...recipeKeys.searchLists(), params] as const,

    /** 레시피 노출 그룹 조회 */
    lists: () => [...recipeKeys.all, 'exposureGroups'] as const,
    list: (params?: GetRecipeExposureGroupsParams) =>
        [...recipeKeys.lists(), params] as const,

    /** 레시피 노출 그룹 상세 조회 */
    details: () => [...recipeKeys.all, 'exposureGroupDetail'] as const,
    detail: (groupSno: number) => [...recipeKeys.details(), groupSno] as const,
};

export default recipeKeys;
