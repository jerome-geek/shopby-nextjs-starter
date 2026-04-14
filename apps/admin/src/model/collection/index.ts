import { PageParams, PageResponse } from '@/model/common';
import { RecipeDetail } from '@/model/recipe';

export interface SearchCollectionsParams extends PageParams {
    keyword: string;
}

export interface Collection {
    collectionSno: number;
    description?: string;
    memberName: string;
    memberNo: number;
    recipeCount: number;
    shareCode: string;
    title: string;
}

export type SearchCollectionsResponse = PageResponse<Collection>;

export interface CreateUserCollectionBody {
    memberNo: number;
    memberName?: string;
    memberId?: string;
    collectionName: string;
    recipeSnos: number[];
}

export interface GetCollectionExposureGroupsParams extends PageParams {
    isDisplay?: boolean;
    exposureLocation?: string;
}

export interface CollectionExposureGroup {
    sno: number;
    groupName: string;
    description: string;
    exposureLocation: string;
    isDisplay: boolean;
    sortOrder: number;
    groupType: 'COLLECTION';
    collection: {
        collectionSno: number;
        title: string;
        description: string;
        shareCode: string;
        memberNo: number;
        memberName: string;
        recipeCount: number;
    };
}

export type CollectionExposureGroupResponse =
    PageResponse<CollectionExposureGroup>;

export type CollectionExposureGroupDetailResponse = CollectionExposureGroup;

export interface CreateCollectionExposureGroupsBody {
    exposureLocation: string;
    groupName: string;
    description?: string;
    isDisplay: boolean;
    collectionSno: number;
}

export type CreateCollectionExposureGroupsResponse = CollectionExposureGroup;

export interface UpdateCollectionExposureGroupsBody {
    groupName: string;
    description?: string;
    isDisplay: boolean;
    collectionSno: number;
}

export type UpdateCollectionExposureGroupsResponse = CollectionExposureGroup;

export interface UpdateCollectionExposureGroupsSortOrderBody {
    exposureLocation: string;
    groupSnos: number[];
}

export interface GetCollectionResponse {
    sno: number;
    title: string;
    shareCode: string;
    memberNo: number;
    memberName: string;
    recipes: RecipeDetail[];
    bookmarked: boolean;
    bookmarkCount: number;
}
