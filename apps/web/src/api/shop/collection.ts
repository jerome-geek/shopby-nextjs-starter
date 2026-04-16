import type { AxiosRequestConfig } from 'axios';

import { geekRequest } from '@/api/core/geekRequest';
import type {
    CollectionExposureGroupResponse,
    GetCollectionListResponse,
    CreateCollectionData,
    SearchPublicCollectionParams,
    UpdateCollectionRequest,
    SearchCollectionsResponse,
    SharedRecipeCollection,
} from '@/models/shop/collection';
import type { CollectionBookmarkResponse } from '@/models/shop/recipe';

const collection = {
    /**
     * 컬렉션 생성
     */
    create: (data: CreateCollectionData) => {
        return geekRequest({
            method: 'POST',
            url: '/shop/recipe/collections',
            data,
        });
    },

    /** 내 컬렉션 목록 조회 */
    getList: () => {
        return geekRequest<GetCollectionListResponse>({
            method: 'GET',
            url: '/shop/recipe/collections',
        });
    },

    /** 컬렉션 수정 */
    update: (collectionSno: number, data: UpdateCollectionRequest) => {
        return geekRequest({
            method: 'PATCH',
            url: `/shop/recipe/collections/${collectionSno}`,
            data,
        });
    },

    /** 컬렉션 삭제 */
    remove: (collectionSno: number) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/recipe/collections/${collectionSno}`,
        });
    },

    /**
     * 전체 컬렉션 검색
     */
    searchPublic: (params: SearchPublicCollectionParams) => {
        return geekRequest<SearchCollectionsResponse>({
            method: 'GET',
            url: '/shop/recipe/collections/public-search',
            params,
        });
    },

    /** 컬렉션 노출 그룹 조회 */
    getCollectionExposureGroup: (groupId: string) => {
        return geekRequest<CollectionExposureGroupResponse>({
            method: 'GET',
            url: `/shop/recipe/collections/group/${groupId}`,
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
    unBookmarkCollection: (
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
     * 공유 컬렉션 상세 조회
     */
    getShared: (shareCode: string, options?: AxiosRequestConfig) => {
        return geekRequest<SharedRecipeCollection>({
            method: 'GET',
            url: `/shop/recipe/collections/shared/${shareCode}`,
            ...options,
        });
    },

    /**
     * 북마크한 컬렉션 목록 조회
     */
    getBookmarkedList: (options?: AxiosRequestConfig) => {
        return geekRequest<RecipeCollection[]>({
            method: 'GET',
            url: '/shop/recipe/bookmark-collections',
            ...options,
        });
    },
};

export default collection;
