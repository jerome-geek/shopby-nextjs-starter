import { GetRecipeDetailResponse } from '@/models/shop/recipe';

export interface CreateCollectionRequest {
    title: string;
    description?: string;
}

export interface UpdateCollectionRequest {
    title?: string;
    description?: string;
}

export interface RecipeCollection {
    deletable: boolean;
    description: Nullable<string>;
    editable: boolean;
    isDefault: boolean;
    ownershipType: 'OWNED';
    recipeCount: number;
    shareCode: string;
    sno: number;
    title: string;
}

export type CollectionListResponse = RecipeCollection[];

export interface SearchPublicCollectionParams {
    keyword?: string;
    order?: 'ASC' | 'DESC';
    page?: number;
    take?: number;
    /** 정렬 기준 */
    sortBy: 'LATEST' | 'BOOKMARK_COUNT';
}

/** 컬렉션 노출 그룹 응답 */
export interface CollectionExposureGroupResponse {
    groupId: string;
    groups: {
        sno: number;
        groupName: string;
        description: string;
        sortOrder: number;
        isDisplay: boolean;
        collection: {
            sno: number;
            title: string;
            shareCode: string;
            memberNo: number;
            memberName: string;
            bookmarked: boolean;
            bookmarkCount: number;
            recipes: GetRecipeDetailResponse[];
        };
    }[];
}
