export interface SearchRecipesParams {
    keyword: string;
    // page: number;
    // take: number;
}

export interface Recipe {
    authorName: string;
    sno: number;
    sourceType: string;
    thumbnailUrl: string;
    title: string;
}

export type SearchRecipesResponse = Recipe[];

export type ExposureLocation =
    | 'recipe_group_1'
    | 'recipe_group_2'
    | 'recipe_group_3';

export interface GetRecipeExposureGroupsParams {
    isDisplay?: boolean;
    exposureLocation?: ExposureLocation;
}

export interface RecipeExposureGroup {
    sno: number;
    groupName: string;
    description: string;
    exposureLocation: ExposureLocation;
    isDisplay: boolean;
    sortOrder: number;
    recipeCount: number;
}

export type RecipeExposureGroupResponse = RecipeExposureGroup[];

export interface RecipeExposureGroupDetailResponse {
    sno: number;
    groupName: string;
    description: string;
    exposureLocation: ExposureLocation;
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
    exposureLocation: ExposureLocation;
    groupSnos: number[];
}
