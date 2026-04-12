import { request } from '@/api/core/request';
import {
    GetRecipeExposureGroupsParams,
    CreateRecipeExposureGroupsBody,
    CreateRecipeExposureGroupsResponse,
    SearchRecipesParams,
    SearchRecipesResponse,
    RecipeExposureGroupResponse,
    RecipeExposureGroupDetailResponse,
    UpdateRecipeExposureGroupsResponse,
    UpdateRecipeExposureGroupsBody,
    UpdateRecipeExposureGroupsSortOrderBody,
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
    getRecipeExposureGroup: (groupSno: number) => {
        return request<RecipeExposureGroupDetailResponse>({
            method: 'GET',
            url: `/admin/recipe/exposure-groups/${groupSno}`,
        });
    },
    createRecipeExposureGroups: (data: CreateRecipeExposureGroupsBody) => {
        return request<CreateRecipeExposureGroupsResponse>({
            method: 'POST',
            url: '/admin/recipe/exposure-groups',
            data,
        });
    },
    updateRecipeExposureGroups: (
        groupSno: number,
        data: UpdateRecipeExposureGroupsBody,
    ) => {
        return request<UpdateRecipeExposureGroupsResponse>({
            method: 'PATCH',
            url: `/admin/recipe/exposure-groups/${groupSno}`,
            data,
        });
    },
    deleteRecipeExposureGroups: (groupSno: number) => {
        return request({
            method: 'DELETE',
            url: `/admin/recipe/exposure-groups/${groupSno}`,
        });
    },
    updateRecipeExposureGroupsSortOrder: (
        data: UpdateRecipeExposureGroupsSortOrderBody,
    ) => {
        return request({
            method: 'PUT',
            url: '/admin/recipe/exposure-groups/reorder',
            data,
        });
    },
};
