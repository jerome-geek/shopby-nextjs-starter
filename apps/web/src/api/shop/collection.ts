import { geekRequest } from '@/api/core/geekRequest';
import {
    CollectionExposureGroupResponse,
    CollectionListResponse,
    CreateCollectionRequest,
    SearchPublicCollectionParams,
    UpdateCollectionRequest,
} from '@/models/shop/collection';
import {
    CollectionBookmarkResponse,
    SearchCollectionsResponse,
} from '@/models/shop/recipe';
import { AxiosRequestConfig } from 'axios';

const collection = {
    /** 컬렉션 생성 */
    create: (data: CreateCollectionRequest) => {
        return geekRequest({
            method: 'POST',
            url: '/shop/recipe/collections',
            data,
        });
    },

    /** 내 컬렉션 목록 조회 */
    getList: () => {
        return geekRequest<CollectionListResponse>({
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

    /** 공개 컬렉션 검색 */
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
};

export default collection;
