import { GeekResponse, ShopByResponse } from '@/models/api/response';
import { Nullable } from '@/models/common';
import { OrderDirectionType } from '@/models';

// ===== Request Types =====

/** SNS URL로 레시피 생성 요청 */
export interface CreateRecipeData {
    /** 분석할 레시피 SNS URL */
    url: string;
}

export interface CreateRecipeResponse {
    created: boolean;
    message: string;
    status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
    recipeSno: number;
}

/** 임시 이미지 항목 */
export interface RegisterManualTempImageItem {
    /** common/upload 응답의 업로드 파일 URL */
    filePath: string;
    /** 원본 파일명 */
    originFileName: string;
    /** 파일 크기(bytes) */
    size: number;
    /** 파일 content type */
    contentType: string;
    /** 정렬 순서 */
    sortOrder: number;
}

/** 수동 레시피 임시 이미지 등록 요청 */
export interface RegisterManualTempImagesData {
    /** 임시 이미지 목록 */
    images: RegisterManualTempImageItem[];
}

/** 수동 레시피 재료 */
export interface CreateManualRecipeIngredient {
    /** 재료명 */
    name: string;
    /** 재료 수량 */
    amount?: string | null;
}

/** 수동 레시피 조리 단계 */
export interface CreateManualRecipeStep {
    /** 조리 단계 순서 */
    stepNumber: number;
    /** 조리 단계 설명 */
    description: string;
    /** 연결할 임시 이미지 번호 */
    tempImageSno?: number | null;
}

/** 수동 레시피 생성 요청 */
export interface CreateManualRecipeData {
    /** 레시피 제목 */
    title: string;
    /** 레시피 설명 */
    description: string;
    /** 예상 조리 시간(분) */
    cookTimeMinutes?: number | null;
    /** 예상 인분 */
    servings?: number | null;
    /** 1인분당 칼로리 */
    caloriesPerServingKcal?: number | null;
    /** 대표 썸네일로 사용할 임시 이미지 번호 */
    thumbnailTempImageSno: number;
    /** 재료 목록 */
    ingredients: CreateManualRecipeIngredient[];
    /** 조리 단계 목록 */
    steps: CreateManualRecipeStep[];
}

/** 레시피 컬렉션 생성 요청 */
export interface CreateRecipeCollectionData {
    /** 컬렉션 이름 */
    title: string;
    /** 컬렉션 설명 */
    description?: string | null;
}

/** 레시피 컬렉션 수정 요청 */
export interface UpdateRecipeCollectionData {
    /** 컬렉션 이름 */
    title: string;
    /** 컬렉션 설명 */
    description?: string | null;
}

/** 레시피 북마크 요청 */
export interface BookmarkRecipeData {
    /** 저장할 컬렉션 번호 */
    collectionSno?: number | null;
    /** 새로 만들 컬렉션 이름 */
    createCollectionName?: string | null;
}

/** GET /shop/recipe/group/{groupId} query params */
export interface GetRecipeExposureGroupParams {
    /** 노출 개수 */
    exposureCount?: number;
}

/** 레시피 필터 타입 */
export type RecipeFilterType = 'LIKED' | 'CREATED';

/** 레시피 검색 파라미터 (내 레시피/좋아요) */
export interface SearchRecipesParams {
    /** 정렬 방향 (ASC: 최신 순, DESC: 오래된 순) */
    order?: OrderDirectionType;
    /** 페이지 번호 */
    page?: number;
    /** 페이지당 노출 개수 */
    take?: number;
    /** 검색 키워드 */
    keyword?: string;
    /** 필터 (LIKED: 좋아요 한 레시피, CREATED: 내가 생성한 레시피) */
    filter?: RecipeFilterType;
    /** 카테고리 번호 */
    categoryId?: number;
}

/** 전체 레시피 검색 파라미터 */
export interface SearchPublicRecipesParams {
    /** 정렬 방향 (ASC: 최신 순, DESC: 오래된 순) */
    order?: OrderDirectionType;
    /** 페이지 번호 */
    page?: number;
    /** 페이지당 노출 개수 */
    take?: number;
    /** 검색 키워드 */
    keyword?: string;
    /** 카테고리 번호 */
    categoryId?: number;
    /** 정렬 기준 */
    sortBy: 'LATEST' | 'BOOKMARK_COUNT' | 'LIKE_COUNT';
}

/** 전체 컬렉션 검색 파라미터 */
export interface SearchPublicCollectionsParams {
    /** 정렬 방향 (ASC: 최신 순, DESC: 오래된 순) */
    order?: OrderDirectionType;
    /** 페이지 번호 */
    page?: number;
    /** 페이지당 노출 개수 */
    take?: number;
    /** 검색 키워드 */
    keyword?: string;
}

// ===== Response Types =====

export type RecipeSourceType = 'YOUTUBE' | 'INSTAGRAM' | 'MANUAL';
export type RecipeDifficulty = 'EASY' | 'NORMAL' | 'HARD';
export type RecipeStatus = 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type RecipeOwnershipType =
    | 'CREATED'
    | 'BOOKMARKED'
    | 'CREATED_AND_BOOKMARKED';

/** 조리 단계 */
export interface RecipeStep {
    sno: number;
    stepNumber: number;
    description: string;
    stepImageUrl: string | null;
    timestampSeconds: number;
}

/** 재료에 연결된 쿠팡 상품 */
export interface RecipeIngredientProduct {
    imageUrl: string;
    isFreeShipping: boolean;
    isRocket: boolean;
    price: number;
    productCacheSno: number;
    productId: string;
    status: RecipeStatus;
    url: string;
}

/** 레시피 재료 */
export interface RecipeIngredient {
    sno: number;
    name: string;
    amount: string | null;
    isEssential: boolean;
    coupangProduct: RecipeIngredientProduct | null;
}

/** 레시피 상세 */
export interface GetRecipeDetailResponse {
    sno: number;
    memberNo: number;
    liked: boolean;
    bookmarked: boolean;
    likeCount: number;
    bookmarkCount: number;
    memberName: string | null;
    memberId: string | null;
    title: string;
    description: string | null;
    sourceUrl?: string | null;
    sourceType: RecipeSourceType;
    sourceId?: string | null;
    authorName: string | null;
    authorUrl?: string | null;
    thumbnailUrl: string | null;
    channelImageUrl?: string | null;
    durationSeconds?: number | null;
    difficulty?: RecipeDifficulty | null;
    servings?: number | null;
    caloriesPerServingKcal?: number | null;
    nutritionEstimated?: boolean | null;
    extraData?: Record<string, unknown> | null;
    regDt: string;
    updateDt: string;
    steps?: RecipeStep[];
    ingredients?: RecipeIngredient[];
    recipeStatus: RecipeStatus;
    ownershipType: RecipeOwnershipType;
    failureReason: string | null;
}

/** 컬렉션 북마크 응답 */
export interface CollectionBookmarkResponse {
    success: boolean;
    bookmarked: boolean;
    bookmarkCount: number;
}

export interface CollectionInfo {
    sno: number;
    title: string;
    description: string | null;
    shareCode: string;
    memberNo: number;
    memberName: string | null;
    recipeCount: number;
    bookmarkCount: number;
    bookmarked: boolean;
    isDefault: boolean;
}

export type GetCollectionsResponse = CollectionInfo[];

/** 북마크된 레시피 컬렉션 */
export interface BookmarkedRecipeCollection {
    sno: number;
    title: string;
    description: string | null;
    shareCode: string;
    memberNo: number;
    memberName: string | null;
    recipeCount: number;
    bookmarkCount: number;
    bookmarked: boolean;
    isDefault: boolean;
    recipeImageUrls: string[];
    // TODO: TO CHECK
    recipes: any[];
}

/** 노출 그룹 아이템 */
export interface RecipeExposureGroupItem {
    sno: number;
    groupName: string;
    description: string | null;
    sortOrder: number;
    isDisplay: boolean;
    recipes: GetRecipeDetailResponse[];
}

/** 상위 영역별 레시피 노출 그룹 응답 */
export interface RecipeExposureGroupResponse {
    groupId: string;
    groups: RecipeExposureGroupItem[];
}

/** 페이징 포함 레시피 응답 */
export type SearchRecipesResponse = GeekResponse<GetRecipeDetailResponse>;

/** 페이징 포함 컬렉션 검색 응답 (레시피 공개검색과 동일한 Geek 페이징 필드) */
export type SearchCollectionsResponse =
    GeekResponse<BookmarkedRecipeCollection>;
