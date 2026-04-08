import type { AxiosRequestConfig } from 'axios';

import { geekRequest } from '@/api/core/geekRequest';
import {
    BookmarkRecipeData,
    BookmarkedRecipeCollection,
    CollectionBookmarkResponse,
    CreateManualRecipeData,
    CreateRecipeCollectionData,
    CreateRecipeData,
    CreateRecipeResponse,
    GetRecipeExposureGroupParams,
    RecipeDetail,
    RecipeExposureGroupResponse,
    RegisterManualTempImagesData,
    SearchCollectionsResponse,
    SearchPublicCollectionsParams,
    SearchPublicRecipesParams,
    SearchRecipesParams,
    SearchRecipesResponse,
    UpdateRecipeCollectionData,
} from '@/models/shop/recipe';

const recipe = {
    /**
     * SNS URL로 레시피 생성
     *  - SNS URL을 분석하여 레시피를 생성하거나 기존 레시피를 반환합니다
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
     * 공용 이미지 업로드 (Geek 백엔드)
     */
    upload: (formData: FormData, options?: AxiosRequestConfig) => {
        return geekRequest<{
            filePath: string;
            originFileName: string;
            size: number;
            contentType: string;
        }>({
            method: 'POST',
            url: '/common/upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...options,
        });
    },

    /**
     * 수동 레시피 임시 이미지 등록
     *  - 수동 레시피 작성 시 사용할 임시 이미지를 등록합니다
     */
    registerManualTempImages: (
        data: RegisterManualTempImagesData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<{
            memberNo: number;
            tempImages: {
                sno: number;
                uploadPath: string;
                imageUrl: string;
                sortOrder: number;
                //TODO: TEMP or ....
                status: string;
            }[];
        }>({
            method: 'POST',
            url: '/shop/recipe/manual/temp-images',
            data,
            ...options,
        });
    },

    /**
     * 수동 레시피 생성
     *  - 직접 입력한 정보로 레시피를 생성합니다
     */
    createManualRecipe: (
        data: CreateManualRecipeData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<RecipeDetail>({
            method: 'POST',
            url: '/shop/recipe/manual',
            data,
            ...options,
        });
    },

    /**
     * 레시피 컬렉션 생성
     *  - 레시피를 담을 컬렉션을 생성합니다
     */
    createCollection: (
        data: CreateRecipeCollectionData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest({
            method: 'POST',
            url: '/shop/recipe/collections',
            data,
            ...options,
        });
    },

    /**
     * 레시피 컬렉션 목록 조회
     *  - 사용자의 레시피 컬렉션 목록을 조회합니다
     */
    getCollections: (options?: AxiosRequestConfig) => {
        return geekRequest<BookmarkedRecipeCollection[]>({
            method: 'GET',
            url: '/shop/recipe/collections',
            ...options,
        });
    },

    /**
     * 레시피 컬렉션 수정
     *  - 컬렉션 이름 및 설명을 수정합니다
     */
    updateCollection: (
        collectionSno: number,
        data: UpdateRecipeCollectionData,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest({
            method: 'PATCH',
            url: `/shop/recipe/collections/${collectionSno}`,
            data,
            ...options,
        });
    },

    /**
     * 레시피 컬렉션 삭제
     *  - 컬렉션을 삭제합니다
     */
    deleteCollection: (collectionSno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/recipe/collections/${collectionSno}`,
            ...options,
        });
    },

    /**
     * 공유 컬렉션 상세 조회
     *  - 공유 코드로 다른 사용자의 컬렉션을 조회합니다
     */
    getSharedCollection: (shareCode: string, options?: AxiosRequestConfig) => {
        return geekRequest<BookmarkedRecipeCollection>({
            method: 'GET',
            url: `/shop/recipe/collections/shared/${shareCode}`,
            ...options,
        });
    },

    /**
     * 컬렉션 북마크 추가
     *  - 다른 사용자의 컬렉션을 북마크합니다
     */
    bookmarkCollection: (
        collectionSno: number,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<CollectionBookmarkResponse>({
            method: 'POST',
            url: `/shop/recipe/collections/${collectionSno}/bookmark`,
            ...options,
        });
    },

    /**
     * 컬렉션 북마크 취소
     *  - 컬렉션 북마크를 취소합니다
     */
    unbookmarkCollection: (
        collectionSno: number,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<CollectionBookmarkResponse>({
            method: 'DELETE',
            url: `/shop/recipe/collections/${collectionSno}/bookmark`,
            ...options,
        });
    },

    /**
     * 북마크한 컬렉션 목록 조회
     *  - 사용자가 북마크한 컬렉션 목록을 조회합니다
     */
    getBookmarkedCollections: (options?: AxiosRequestConfig) => {
        return geekRequest<BookmarkedRecipeCollection[]>({
            method: 'GET',
            url: '/shop/recipe/bookmark-collections',
            ...options,
        });
    },

    /**
     * 상위 영역별 사용자 레시피 그룹 조회
     *  - groupId에 해당하는 레시피 노출 그룹 목록을 조회합니다
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

    /**
     * 레시피 상세 조회
     *  - 레시피 번호로 상세 정보를 조회합니다
     */
    getRecipeDetail: (sno: number, options?: AxiosRequestConfig) => {
        return geekRequest<RecipeDetail>({
            method: 'GET',
            url: `/shop/recipe/${sno}`,
            ...options,
        });
    },

    /**
     * 레시피 좋아요 추가
     *  - 레시피에 좋아요를 추가합니다
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
     *  - 레시피 좋아요를 취소합니다
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
    unbookmarkRecipe: (sno: number, options?: AxiosRequestConfig) => {
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
        params: SearchRecipesParams,
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
