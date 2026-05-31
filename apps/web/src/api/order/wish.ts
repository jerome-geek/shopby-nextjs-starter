import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
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
    getWishList: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetWishListResponse>({
            method: 'GET',
            url: '/wish',
            ...options,
        });
    },

    /**
     * 위시리스트 수정하기
     *  - 위시리스트를 수정하는 API 입니다.
     */
    updateWishList: (
        data: UpdateWishListData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/wish',
            data,
            ...options,
        });
    },

    /**
     * 위시리스트 등록하기
     *  - 위시리스트를 등록하는 API 입니다.
     */
    registerWishList: (
        data: RegisterWishListData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<{ count: number }>({
            method: 'POST',
            url: '/wish',
            data,
            ...options,
        });
    },

    /**
     * 위시리스트 삭제하기
     *  - 위시리스트를 삭제하는 API 입니다.
     */
    deleteWishList: (
        params: DeleteWishListParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<DeleteWishListResponse>({
            method: 'DELETE',
            url: '/wish',
            params,
            ...options,
        });
    },

    /**
     * 위시리스트 개수 가져오기
     *  - 위시리스트 개수를 조회하는 API 입니다.
     */
    getWishListCount: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetWishListCountResponse>({
            method: 'GET',
            url: '/wish/count',
            ...options,
        });
    },
};

export default wish;
