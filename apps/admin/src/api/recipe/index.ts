import { request } from '@/api/core/request';
import {
    GetRecipeExposureGroupsParams,
    RecipeExposureGroupResponse,
    SearchRecipesParams,
    SearchRecipesResponse,
} from '@/model/recipe';

export const recipe = {
    searchRecipes: (params: SearchRecipesParams) => {
        return request<SearchRecipesResponse>({
            method: 'GET',
            url: '/admin/recipe/search',
            params,
        });
    },
    getRecipeExposureGroups: (params?: GetRecipeExposureGroupsParams) => {
        return request<RecipeExposureGroupResponse>({
            method: 'GET',
            url: '/admin/recipe/exposure-groups',
            params,
        });
    },
};
