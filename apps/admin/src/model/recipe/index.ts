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

export interface GetRecipeResponse {
    sno: number;
    memberNo: number;
    liked: boolean;
    bookmarked: boolean;
    likeCount: number;
    bookmarkCount: number;
    memberName: string;
    memberId: string;
    title: string;
    description: string;
    recipeStatus: string;
    failureReason: string | null;
    sourceUrl: string;
    sourceType: string;
    sourceId: string;
    authorName: string;
    authorUrl: null;
    thumbnailUrl: string;
    channelImageUrl: string | null;
    durationSeconds: number;
    difficulty: string;
    servings: number;
    caloriesPerServingKcal: number | null;
    nutritionEstimated: boolean;
    extraData: Record<string, unknown>;
    regDt: string;
    updateDt: string;
    steps: {
        sno: number;
        stepNumber: number;
        description: string;
        stepImageUrl: string;
        timestampSeconds: number;
    }[];
    ingredients: {
        sno: number;
        name: string;
        amount: string;
        isEssential: boolean;
        coupangProduct: {
            productCacheSno: number;
            productId: string;
            name: string;
            price: number;
            imageUrl: string;
            url: string;
            status: string;
            isRocket: boolean;
            isFreeShipping: boolean;
        };
    }[];
}
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
