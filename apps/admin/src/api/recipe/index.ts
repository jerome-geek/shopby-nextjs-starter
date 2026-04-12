import { request } from '@/api/core/request';
import {
    GetRecipeExposureGroupsParams,
    CreateRecipeExposureGroupsBody,
    CreateRecipeExposureGroupsResponse,
    SearchRecipesParams,
    SearchRecipesResponse,
    RecipeExposureGroupResponse,
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
    createRecipeExposureGroups: (data: CreateRecipeExposureGroupsBody) => {
        return request<CreateRecipeExposureGroupsResponse>({
            method: 'POST',
            url: '/admin/recipe/exposure-groups',
            data,
        });
    },
    deleteRecipeExposureGroups: (groupSno: number) => {
        return request({
            method: 'DELETE',
            url: `/admin/recipe/exposure-groups/${groupSno}`,
        });
    },
};
