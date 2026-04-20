import type { OrderDirectionType } from '@/models';
import type { GeekResponse } from '@/models/api/response';
import type {
    RecipeDifficulty,
    RecipeSourceType,
    RecipeStatus,
} from '@/models/shop';

// ===== Request Types =====

/** SNS URL로 레시피 생성 요청 */
export interface CreateRecipeData {
    /** 분석할 레시피 SNS URL */
    url: string;
}

export interface CreateRecipeResponse {
    created: boolean;
    message: string;
    status: RecipeStatus;
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

export interface RegisterManualTempImagesResponse {
    memberNo: number;
    tempImages: {
        sno: number;
        uploadPath: string;
        imageUrl: string;
        sortOrder: number;
        //TODO: TEMP or ....
        status: string;
    }[];
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

/** 조리 단계 */
export interface RecipeStep {
    /** 단계 고유 번호 */
    no: number;
    /** 조리 단계 순서 */
    stepNumber: number;
    /** 조리 단계 설명 */
    description: string;
    /** 단계 이미지 URL */
    stepImageUrl: Nullable<string>;
    /** 영상 기준 시점(초) */
    timestampSeconds: Nullable<number>;
}

/** 매칭된 대표 쿠팡 상품 */
export interface RecipeIngredientProduct {
    /** 상품 캐시 번호 */
    productCacheSno: Nullable<number>;
    /** 쿠팡 상품 ID */
    productId: Nullable<string>;
    /** 노출 상품명 */
    name: Nullable<string>;
    /** 상품 가격 */
    price: Nullable<number>;
    /** 상품 이미지 URL */
    imageUrl: Nullable<string>;
    /** 쿠팡 파트너스 상품 URL */
    url: Nullable<string>;
    /** 쿠팡 연동 상태 */
    status: Nullable<string>;
    /** 로켓배송 여부 */
    isRocket: Nullable<boolean>;
    /** 무료배송 여부 */
    isFreeShipping: Nullable<boolean>;
}

/** 레시피 재료 */
export interface RecipeIngredient {
    /** 재료 고유 번호 */
    sno: number;
    /** 재료명 */
    name: string;
    /** 재료 사용량 */
    amount: Nullable<string>;
    /** 필수 재료 여부 */
    isEssential: boolean;
    /** 매칭된 대표 쿠팡 상품 */
    coupangProduct: Nullable<RecipeIngredientProduct>;
}

/** 레시피 상세 */
export interface GetRecipeDetailResponse {
    /** 레시피 번호 */
    sno: number;
    /** 작성자 회원 번호 */
    memberNo: number;
    /** 현재 사용자의 좋아요 여부 */
    liked: boolean;
    /** 현재 사용자의 북마크 여부 */
    bookmarked: boolean;
    /** 전체 좋아요 수 */
    likeCount: number;
    /** 전체 북마크 수 */
    bookmarkCount: number;
    /** 작성자 이름 */
    memberName: string;
    /** 작성자 아이디 */
    memberId: string;
    /** 레시피 제목 */
    title: string;
    /** 레시피 요약 설명 */
    description: string;
    /** 레시피 생성 상태 */
    recipeStatus: RecipeStatus;
    /** 레시피 생성 실패 사유 */
    failureReason: string;
    /** 원본 URL */
    sourceUrl: string;
    /** 플랫폼 타입 */
    sourceType: RecipeSourceType;
    /** 원본 식별 ID */
    sourceId?: string;
    /** 원작자 이름 */
    authorName: string;
    /** 원작자 URL */
    authorUrl: string;
    /** 대표 썸네일 URL */
    thumbnailUrl: string;
    /** 채널 이미지 URL */
    channelImageUrl: string;
    /** 원본 영상 길이(초) */
    durationSeconds: number;
    /** 난이도 */
    difficulty: RecipeDifficulty;
    /** 예상 인분 */
    servings: number;
    /** 1인분당 칼로리 */
    caloriesPerServingKcal: number;
    /** 영양 정보 추정 여부 */
    nutritionEstimated: boolean;
    /** 추가 메타 정보 */
    extraData: Record<string, unknown>;
    /** 등록일시 */
    regDt: string;
    /** 수정일시 */
    updateDt: string;
    /** 조리 단계 목록 */
    steps: RecipeStep[];
    /** 재료 목록 */
    ingredients: RecipeIngredient[];
}

export interface UpdateRecipeData {
    /** 레시피 제목 */
    title: string;
    /** 레시피 설명 */
    description: string;
    /** 예상 인분 */
    servings: number;
    /** 예상 조리 시간(분) */
    cookTimeMinutes?: number;
    /** 1인분당 칼로리 */
    caloriesPerServingKcal: number;
    /** 대표 썸네일로 사용할 임시 이미지 번호 */
    thumbnailTempImageSno?: number;
    /** 기존 대표 이미지 URL */
    thumbnailUrl?: string;
    /** 재료 목록 */
    ingredients: {
        /** 재료명 */
        name: string;
        /** 재료 수량 */
        amount?: string;
    }[];
    /** 조리 단계 목록 */
    steps: {
        /** 조리 단계 순서 */
        stepNumber: number;
        /** 조리 단계 설명 */
        description: string;
        /** 연결할 임시 이미지 번호 */
        tempImageSno?: number;
        /** 기존 단계 이미지 URL */
        stepImageUrl?: string;
    }[];
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
    recipes: {
        /** 레시피 번호 */
        sno: number;
        /** 작성자 회원 번호 */
        memberNo: number;
        /** 현재 사용자의 좋아요 여부 */
        liked: boolean;
        /** 현재 사용자의 북마크 여부 */
        bookmarked: boolean;
        /** 전체 좋아요 수 */
        likeCount: number;
        /** 전체 북마크 수 */
        bookmarkCount: number;
        /** 작성자 이름 */
        memberName: string;
        /** 작성자 아이디 */
        memberId: string;
        /** 레시피 제목 */
        title: string;
        /** 레시피 요약 설명 */
        description: string;
        /** 레시피 생성 상태 */
        recipeStatus: 'PROCESSING' | 'COMPLETED' | 'FAILED';
        /** 레시피 생성 실패 사유 */
        failureReason: string;
        /** 원본 URL */
        sourceUrl: string;
        /** 플랫폼 타입 */
        sourceType: 'YOUTUBE' | 'INSTAGRAM' | 'MANUAL';
        /** 원본 식별 ID */
        sourceId: string;
        /** 원작자 이름 */
        authorName: string;
        /** 원작자 URL */
        authorUrl: string;
        /** 대표 썸네일 URL */
        thumbnailUrl: string;
        /** 채널 이미지 URL */
        channelImageUrl: string;
        /** 원본 영상 길이(초) */
        durationSeconds: number;
        /** 난이도 */
        difficulty: 'EASY' | 'NORMAL' | 'HARd';
        /** 예상 인분 */
        servings: number;
        /** 1인분당 칼로리 */
        caloriesPerServingKcal: number;
        /** 영양 정보 추정 여부 */
        nutritionEstimated: boolean;
        /** 추가 메타 정보 */
        extraData: any;
        /** 등록일시 */
        regDt: string;
        /** 수정일시 */
        updateDt: string;
        steps: {}[];
        ingredients: {}[];
    }[];
}

/** 노출 그룹 아이템 */
export interface RecipeExposureGroupItem {
    /** 노출 그룹 번호 */
    sno: number;
    /** 노출 그룹명 */
    groupName: string;
    /** 노출 그룹 설명 */
    description: string;
    /** 정렬 순서 */
    sortOrder: number;
    /** 노출 여부 */
    isDisplay: boolean;
    /** 레시피 목록 */
    recipes: GetRecipeDetailResponse[];
}

/** 상위 영역별 레시피 노출 그룹 응답 */
export interface RecipeExposureGroupResponse {
    groupId: string;
    groups: RecipeExposureGroupItem[];
}

/** 페이징 포함 레시피 응답 */
export type SearchRecipesResponse = GeekResponse<GetRecipeDetailResponse>;
