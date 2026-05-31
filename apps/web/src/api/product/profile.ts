import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    DeleteRecentViewProductsParams,
    GetGuestRecentViewProductsParams,
    GetLikeBrandsCountParams,
    GetLikeBrandsCountResponse,
    GetLikeBrandsParams,
    GetLikeBrandsResponse,
    GetLikeProductsCountResponse,
    GetLikeProductsParams,
    GetLikeProductsResponse,
    GetMemberLikeBrandListParams,
    GetMemberLikeBrandListResponse,
    GetRecentViewProductsParams,
    GetRecentViewProductsResponse,
    RegisterRecentViewProductData,
    ToggleLikeBrandsData,
    UpdateProductsLikeData,
    UpdateProductsLikeOldData,
    UpdateProductsLikeOldResponse,
    UpdateProductsLikeResponse,
} from '@/models/product/profile';

const productProfile = {
    /**
     * 비회원용 최근 본 상품 조회하기
     *  - 비회원용 최근 본 상품 조회하는 API입니다
     *  - localStorage에 저장한 mallProductNos로 최근 본 상품을 조회합니다
     */
    getGuestRecentViewProducts: (
        params: GetGuestRecentViewProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetRecentViewProductsResponse>({
            method: 'GET',
            url: '/guest/recent-products',
            params,
            ...options,
        });
    },

    /**
     * 브랜드 좋아요 목록 전체 조회하기
     *  - 좋아요한 브랜드 목록을 전체 조회하는 API입니다.
     *  - 더보기 방식으로 조회를 원할 경우 displayBrandNo를 추가해주시면 됩니다.(pageNumber는 제외 하고 요청)
     */
    getLikeBrands: (
        params: GetLikeBrandsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetLikeBrandsResponse>({
            method: 'GET',
            url: '/profile/like-brands',
            params,
            ...options,
        });
    },

    /**
     * 회원이 좋아하는 상품목록 조회하기
     *  - 회원이 좋아하는 상품목록 조회하는 API입니다
     *  - 로그인 이후에만 호출 가능합니다(accessToken)
     */
    getLikeProducts: (
        params?: GetLikeProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetLikeProductsResponse>({
            method: 'GET',
            url: '/profile/like-products',
            params,
            ...options,
        });
    },

    /**
     * 회원이 상품을 좋아한다고 추가/삭제하기
     *  - 회원이 좋아하는 상품목록 추가/삭제하는 API입니다
     *  - 로그인 이후에만 호출 가능합니다(accessToken)
     */
    updateProductsLikeOld: (
        data: UpdateProductsLikeOldData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<UpdateProductsLikeOldResponse>({
            method: 'POST',
            url: '/profile/like-products',
            data,
            ...options,
        });
    },

    /**
     * 최근 본 상품 조회하기
     *  - 최근 본 상품 조회하는 API입니다
     *  - 로그인 이후에만 호출 가능(accessToken)합니다
     */
    getRecentViewProducts: (
        params: GetRecentViewProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetRecentViewProductsResponse>({
            method: 'GET',
            url: '/profile/recent-products',
            params,
            ...options,
        });
    },

    /**
     * 최근 본 상품 등록하기
     *  - 최근 본 상품 등록하는 API입니다
     *  - 로그인 이후에만 호출 가능(accessToken)합니다
     *  - 최근 본 50개 상품까지 서버에서 저장합니다
     */
    registerRecentViewProduct: (
        data: RegisterRecentViewProductData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/recent-products',
            data,
            ...options,
        });
    },

    /**
     * 최근 본 상품 삭제하기
     *  - 최근 본 상품 삭제하는 API입니다
     *  - 로그인 이후에만 호출 가능(accessToken)합니다
     */
    deleteRecentViewProducts: (
        params: DeleteRecentViewProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: '/profile/recent-products',
            params,
            ...options,
        });
    },

    /**
     * 브랜드에 대한 좋아요 설정 및 해제하기
     *  - 브랜드에 대한 좋아요 설정 및 해제를 하는 API입니다.
     *  - 로그인 이후에만 호출 가능합니다(accessToken)
     *  - 1명의 회원이 좋아요할 수 있는 브랜드 개수는 최대 50개 입니다.
     *  - 50개를 넘게 등록했을 경우 최근 등록된 좋아요 브랜드 정보만 남게 됩니다.
     *  - 해당 회원이 이미 좋아요한 브랜드를 중복으로 요청할 경우 좋아요 수는 카운팅 되지 않습니다.
     */
    toggleLikeBrands: (
        data: ToggleLikeBrandsData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/like-brands',
            data,
            ...options,
        });
    },

    /**
     * 브랜드 좋아요 수 목록 조회
     *  - 브랜드별 좋아요 수를 조회하는 API입니다.
     */
    getLikeBrandsCount: (
        params: GetLikeBrandsCountParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetLikeBrandsCountResponse>({
            method: 'GET',
            url: '/profile/like-brands/count',
            params,
            ...options,
        });
    },

    /**
     * 회원이 좋아요한 브랜드 목록 조회하기
     *  - 내가 좋아요한 브랜드 목록을 조회할 수 있는 API입니다.
     *  - 로그인 이후에만 호출 가능합니다(accessToken)
     *  - 좋아요한 브랜드가 없을 경우 응답값에서 제외됩니다.
     */
    getMemberLikeBrandList: (
        params?: GetMemberLikeBrandListParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetMemberLikeBrandListResponse>({
            method: 'GET',
            url: '/profile/like-brands/member',
            params,
            ...options,
        });
    },

    /**
     * 상품에 대한 좋아요 설정 및 해제하기
     *  - 상품에 대한 좋아요 설정 및 해제를 하는 API입니다.
     *  - 기존 '회원이 상품을 좋아한다고 추가/삭제하기' API에서 명시적인 '좋아요 설정 및 해제' 요청이 추가되었습니다.
     *  - 기존에 '좋아요 설정'을 하지 않았던 상품에 대한 '좋아요 해제' 요청은 응답에 포함되지 않습니다.
     *  - 로그인 이후에만 호출 가능합니다(accessToken)
     *  - header의 Version 값은 1.1로 요청해야합니다.
     */
    updateProductsLike: (
        data: UpdateProductsLikeData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<UpdateProductsLikeResponse>({
            method: 'POST',
            url: '/profile/like-products',
            data,
            ...options,
            headers: {
                ...options?.headers,
                version: '1.1',
            },
        });
    },

    /**
     * 회원이 좋아하는 상품 수 조회하기
     *  - 회원이 좋아하는 상품 수를 조회하는 API입니다
     *  - 로그인 이후에만 호출 가능합니다(accessToken)
     */
    getLikeProductsCount: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetLikeProductsCountResponse>({
            method: 'GET',
            url: '/profile/like-products/count',
            ...options,
        });
    },
};

export default productProfile;
