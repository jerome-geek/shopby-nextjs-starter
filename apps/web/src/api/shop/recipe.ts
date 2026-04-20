import type { AxiosRequestConfig } from 'axios';

import { geekRequest } from '@/api/core/geekRequest';
import { SearchCollectionsResponse } from '@/models/shop/collection';
import type {
    BookmarkRecipeData,
    CreateManualRecipeData,
    CreateRecipeData,
    CreateRecipeResponse,
    GetRecipeDetailResponse,
    GetRecipeExposureGroupParams,
    RecipeExposureGroupResponse,
    RegisterManualTempImagesData,
    RegisterManualTempImagesResponse,
    SearchPublicCollectionsParams,
    SearchPublicRecipesParams,
    SearchRecipesParams,
    SearchRecipesResponse,
    UpdateRecipeData,
} from '@/models/shop/recipe';

const recipe = {
    /**
     * SNS URL로 레시피 생성
     */
    createRecipe: (data: CreateRecipeData, options?: AxiosRequestConfig) => {
        return geekRequest<CreateRecipeResponse>({
            method: 'POST',
            url: '/shop/recipe',
            data,
            ...options,
        });
    },

    /**
     * 수동 레시피 임시 이미지 등록
     */
    registerManualTempImages: (
        data: RegisterManualTempImagesData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<RegisterManualTempImagesResponse>({
            method: 'POST',
            url: '/shop/recipe/manual/temp-images',
            data,
            ...options,
        });
    },

    /**
     * 수동 레시피 임시 이미지 전체 삭제
     */
    deleteManualTempImages: (options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: '/shop/recipe/manual/temp-images',
            ...options,
        });
    },

    /**
     * 수동 레시피 생성
     */
    createManualRecipe: (
        data: CreateManualRecipeData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<GetRecipeDetailResponse>({
            method: 'POST',
            url: '/shop/recipe/manual',
            data,
            ...options,
        });
    },

    /**
     * 상위 영역별 사용자 레시피 그룹 조회
     */
    getRecipeExposureGroup: (
        groupId: string,
        params?: GetRecipeExposureGroupParams,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<RecipeExposureGroupResponse>({
            method: 'GET',
            url: `/shop/recipe/group/${groupId}`,
            params,
            ...options,
        });
    },

    deleteCollection: (collectionSno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/recipe/collections/${collectionSno}`,
            ...options,
        });
    },

    /**
     * 레시피 상세 조회
     *  - 레시피 번호로 상세 정보를 조회합니다
     */
    getRecipeDetail: (sno: number, options?: AxiosRequestConfig) => {
        return geekRequest<GetRecipeDetailResponse>({
            method: 'GET',
            url: `/shop/recipe/${sno}`,
            ...options,
        });
    },

    /**
     * 레시피 수정
     */
    updateRecipe: (
        sno: number,
        data: UpdateRecipeData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest({
            method: 'PUT',
            url: `/shop/recipe/${sno}`,
            data,
            ...options,
        });
    },

    /**
     * 레시피 삭제
     */
    deleteRecipe: (sno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/recipe/${sno}`,
            ...options,
        });
    },

    /**
     * 레시피 좋아요 추가
     */
    likeRecipe: (sno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'POST',
            url: `/shop/recipe/${sno}/like`,
            ...options,
        });
    },

    /**
     * 레시피 좋아요 취소
     */
    unlikeRecipe: (sno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/recipe/${sno}/like`,
            ...options,
        });
    },

    /**
     * 레시피 북마크 추가
     *  - 레시피를 컬렉션에 북마크합니다
     */
    bookmarkRecipe: (
        sno: number,
        data: BookmarkRecipeData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest({
            method: 'POST',
            url: `/shop/recipe/${sno}/bookmark`,
            data,
            ...options,
        });
    },

    /**
     * 레시피 북마크 취소
     *  - 레시피 북마크를 취소합니다
     */
    unBookmarkRecipe: (sno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/recipe/${sno}/bookmark`,
            ...options,
        });
    },

    /**
     * 내 레시피/북마크 검색
     *  - 사용자가 생성하거나 북마크한 레시피를 검색합니다
     */
    searchMyRecipes: (
        params?: SearchRecipesParams,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<SearchRecipesResponse>({
            method: 'GET',
            url: '/shop/recipe/search',
            params,
            ...options,
        });
    },

    /**
     * 전체 레시피 검색
     *  - 공개된 모든 레시피를 검색합니다
     */
    searchPublicRecipes: (
        params: SearchPublicRecipesParams,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<SearchRecipesResponse>({
            method: 'GET',
            url: '/shop/recipe/public-search',
            params,
            ...options,
        });
    },

    /**
     * 전체 컬렉션 검색
     *  - 공개된 모든 레시피 컬렉션을 검색합니다
     */
    searchPublicCollections: (
        params: SearchPublicCollectionsParams,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<SearchCollectionsResponse>({
            method: 'GET',
            url: '/shop/recipe/collections/public-search',
            params,
            ...options,
        });
    },
};

export default recipe;
