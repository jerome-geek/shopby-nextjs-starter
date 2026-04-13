import { PageParams, PageResponse } from '@/model/common';

export interface CreateUserRecipeBody {
    memberNo: number;
    memberName: string;
    memberId: string;
    url: string;
}

export interface SearchRecipesParams extends PageParams {
    keyword: string;
}

export interface Recipe {
    authorName: string;
    sno: number;
    sourceType: string;
    thumbnailUrl: string;
    title: string;
    bookmarkCount: number;
    likeCount: number;
}

export type SearchRecipesResponse = PageResponse<Recipe>;
export interface GetRecipeExposureGroupsParams extends PageParams {
    isDisplay?: boolean;
    exposureLocation?: string;
}

export interface RecipeExposureGroup {
    sno: number;
    groupName: string;
    description: string;
    exposureLocation: string;
    isDisplay: boolean;
    sortOrder: number;
    recipeCount: number;
}

export type RecipeExposureGroupResponse = PageResponse<RecipeExposureGroup>;

export interface RecipeExposureGroupDetailResponse {
    sno: number;
    groupName: string;
    description: string;
    exposureLocation: string;
    isDisplay: boolean;
    sortOrder: number;
    recipes: {
        sno: number;
        recipeSno: number;
        title: string;
        authorName: string;
        thumbnailUrl: string;
        sourceType: string;
        sortOrder: number;
        likeCount: number;
        bookmarkCount: number;
    }[];
}

export interface CreateRecipeExposureGroupsBody {
    exposureLocation: string;
    groupName: string;
    description?: string;
    isDisplay: boolean;
    recipeSnos: number[];
}

export type CreateRecipeExposureGroupsResponse = RecipeExposureGroup;

export interface UpdateRecipeExposureGroupsBody {
    groupName: string;
    description?: string;
    isDisplay: boolean;
}

export type UpdateRecipeExposureGroupsResponse = RecipeExposureGroup;

export interface UpdateRecipeExposureGroupsSortOrderBody {
    exposureLocation: string;
    groupSnos: number[];
}
