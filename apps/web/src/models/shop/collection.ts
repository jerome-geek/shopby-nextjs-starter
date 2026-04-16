    BookmarkedRecipeCollection,
    GetRecipeDetailResponse,
} from '@/models/shop/recipe';

export interface CreateCollectionData {
    title: string;
    description?: string;
}

export interface SharedRecipeCollection extends RecipeCollection {
    recipes: GetRecipeDetailResponse[];
}

export interface RecipeCollection {
    sno: number;
    title: string;
    description: string;
    shareCode: string;
    isDefault: boolean;
    memberNo: number;
    memberName: string;
    recipeCount: number;
    recipeImageUrls: string[];
    bookmarkCount: number;
    bookmarked: boolean;
    ownershipType: 'OWNED';
    editable: boolean;
    deletable: boolean;
}

export type GetCollectionListResponse = RecipeCollection[];

export interface UpdateCollectionRequest {
    title?: string;
    description?: string;
}

export interface SearchPublicCollectionParams {
    keyword?: string;
    order?: 'ASC' | 'DESC';
    page?: number;
    take?: number;
    /** 정렬 기준 */
    sortBy: 'LATEST' | 'BOOKMARK_COUNT';
}

/** 페이징 포함 컬렉션 검색 응답 (레시피 공개검색과 동일한 Geek 페이징 필드) */
export type SearchCollectionsResponse =
    GeekResponse<BookmarkedRecipeCollection>;

export type CollectionExposureGroupItem = {
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
};

/** 컬렉션 노출 그룹 응답 */
export interface CollectionExposureGroupResponse {
    groupId: string;
    groups: CollectionExposureGroupItem[];
}
