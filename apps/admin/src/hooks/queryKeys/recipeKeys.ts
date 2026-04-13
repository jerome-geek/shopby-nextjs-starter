import {
    GetRecipeExposureGroupsParams,
    SearchRecipesParams,
} from '@/model/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    /** 레시피 검색 */
    lists: () => [...recipeKeys.all, 'search'] as const,
    list: (params: SearchRecipesParams) =>
        [...recipeKeys.lists(), params] as const,

    /** 레시피 상세 조회 */
    details: () => [...recipeKeys.all, 'detail'] as const,
    detail: (sno: number) => [...recipeKeys.details(), sno] as const,

    /** 레시피 노출 그룹 조회 */
    groupLists: () => [...recipeKeys.all, 'exposureGroups'] as const,
    groupList: (params?: GetRecipeExposureGroupsParams) =>
        [...recipeKeys.groupLists(), params] as const,

    /** 레시피 노출 그룹 상세 조회 */
    groupDetails: () => [...recipeKeys.all, 'exposureGroupDetail'] as const,
    groupDetail: (groupSno: number) =>
        [...recipeKeys.groupDetails(), groupSno] as const,
};

export default recipeKeys;
