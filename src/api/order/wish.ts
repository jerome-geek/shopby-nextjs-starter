import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import {
    DeleteWishListParams,
    DeleteWishListResponse,
    GetWishListCountResponse,
    GetWishListResponse,
    RegisterWishListData,
    UpdateWishListData,
} from '@/models/order/wish';

const wish = {
    /**
     * 위시리스트 리스트 가져오기
     *  - 위시리스트를 조회하는 API 입니다.
     */
    getWishList: (options?: Options) => {
        return request.get<GetWishListResponse>('wish', {
            ...options,
        });
    },

    /**
     * 위시리스트 수정하기
     *  - 위시리스트를 수정하는 API 입니다.
     */
    updateWishList: (data: UpdateWishListData, options?: Options) => {
        return request.put('wish', {
            json: data,
            ...options,
        });
    },

    /**
     * 위시리스트 등록하기
     *  - 위시리스트를 등록하는 API 입니다.
     */
    registerWishList: (data: RegisterWishListData, options?: Options) => {
        return request.post<{ count: number }>('wish', {
            json: data,
            ...options,
        });
    },

    /**
     * 위시리스트 삭제하기
     *  - 위시리스트를 삭제하는 API 입니다.
     */
    deleteWishList: (params: DeleteWishListParams, options?: Options) => {
        return request.delete<DeleteWishListResponse>('wish', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
            }),
            ...options,
        });
    },

    /**
     * 위시리스트 개수 가져오기
     *  - 위시리스트 개수를 조회하는 API 입니다.
     */
    getWishListCount: (options?: Options) => {
        return request.get<GetWishListCountResponse>('wish/count', {
            ...options,
        });
    },
};

export default wish;
