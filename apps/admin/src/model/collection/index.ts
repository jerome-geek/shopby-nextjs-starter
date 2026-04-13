export interface SearchCollectionsParams {
    keyword: string;
    // page: number;
    // take: number;
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

export type SearchCollectionsResponse = Collection[];

export interface GetCollectionExposureGroupsParams {
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

export type CollectionExposureGroupResponse = CollectionExposureGroup[];

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
