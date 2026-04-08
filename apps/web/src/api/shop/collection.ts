import { geekRequest } from '@/api/core/geekRequest';

export interface CreateCollectionRequest {
    title: string;
    description?: string;
}

export interface UpdateCollectionRequest {
    title?: string;
    description?: string;
}

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
        return geekRequest({
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
    searchPublic: (params: {
        keyword?: string;
        order?: 'RECENT' | 'POPULAR';
        page?: number;
        take?: number;
    }) => {
        return geekRequest({
            method: 'GET',
            url: '/shop/recipe/collections/public-search',
            params,
        });
    },
};

export default collection;
