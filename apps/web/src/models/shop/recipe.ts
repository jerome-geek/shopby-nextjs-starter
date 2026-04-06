// ===== Request Types =====

/** SNS URL로 레시피 생성 요청 */
export interface CreateRecipeData {
    /** 분석할 레시피 SNS URL */
    url: string;
}

export interface CreateRecipeResponse {
    created: boolean;
    message: string;
    status: 'PROCESSING' | 'COMPLETED';
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

// ===== Response Types =====

export type RecipeSourceType = 'YOUTUBE' | 'INSTAGRAM' | 'MANUAL';
export type RecipeDifficulty = 'EASY' | 'NORMAL' | 'HARD';

/** 조리 단계 */
export interface RecipeStep {
    sno: number;
    stepNumber: number;
    description: string;
    stepImageUrl: string | null;
    timestampSeconds: number | null;
}

/** 재료에 연결된 쿠팡 상품 */
export interface RecipeIngredientProduct {
    productCacheSno: number | null;
    productId: string | null;
    name: string | null;
    price: number | null;
    imageUrl: string | null;
    url: string | null;
    status: string | null;
    isRocket: boolean | null;
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
export interface RecipeDetail {
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
    sourceUrl: string;
    sourceType: RecipeSourceType;
    sourceId: string;
    authorName: string | null;
    authorUrl: string | null;
    thumbnailUrl: string | null;
    channelImageUrl: string | null;
    durationSeconds: number | null;
    difficulty: RecipeDifficulty;
    servings: number | null;
    caloriesPerServingKcal: number | null;
    nutritionEstimated: boolean | null;
    extraData: Record<string, unknown> | null;
    regDt: string;
    updateDt: string;
    steps: RecipeStep[];
    ingredients: RecipeIngredient[];
}

/** 컬렉션 북마크 응답 */
export interface CollectionBookmarkResponse {
    success: boolean;
    bookmarked: boolean;
    bookmarkCount: number;
}

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
}

/** 노출 그룹 아이템 */
export interface RecipeExposureGroupItem {
    sno: number;
    groupName: string;
    description: string | null;
    sortOrder: number;
    isDisplay: boolean;
    recipes: RecipeDetail[];
}

/** 상위 영역별 레시피 노출 그룹 응답 */
export interface RecipeExposureGroupResponse {
    groupId: string;
    groups: RecipeExposureGroupItem[];
}
