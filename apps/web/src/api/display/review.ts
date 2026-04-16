import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    CategoryProductReviewsParams,
    GetCategoryProductReviewResponse,
    GetMyProductReviewsParams,
    GetMyProductReviewsResponse,
    GetPhotoReviewListParams,
    GetPhotoReviewListResponse,
    GetProductReviewCommentResponse,
    GetProductReviewCommentsParams,
    GetProductReviewListParams,
    GetProductReviewListResponse,
    GetProductReviewParams,
    GetProductReviewResponse,
    GetReviewBoardConfigResponse,
    GetReviewBoardListParams,
    GetReviewBoardListResponse,
    GetReviewCountByRatingRangeData,
    GetReviewCountByRatingRangeResponse,
    GetReviewListV2Params,
    GetReviewListV2Response,
    GetReviewTagsResponse,
    GetReviewableOptionResponse,
    GetReviewableOptionsParams,
    GetReviewableProductsParams,
    GetReviewableProductsResponse,
    GetReviewedProductsResponse,
    GetReviewsProductsParams,
    RegisterProductReviewData,
    RegisterProductReviewResponse,
    ReportProductReviewData,
    UpdateProductReviewData,
} from '@/models/display/review';

const review = {
    /**
     * 카테고리 상품평 목록 조회하기
     *  - 카테고리 별 상품평 목록 조회하는 API입니다
     *  - Paging 기능 제공합니다
     *  - 정렬 기준(모든 정렬은 1차적으로 정렬된 후, 최근 등록된 순으로 한 번 더 정렬됩니다.)
     *     - RATING - 상품평 평점순
     *     - RECOMMEND - 상품평 추천순
     *     - REGISTER_YMDT - 상품평 등록순
     *     - BEST_REVIEW - 우수 상품평순(DESC: 우수 상품평 먼저 조회, ASC: 일반 상품평 먼저 조회)
     *  - hasOrderedOption 을 false로 설정 했을 때, orderedOption 항목은 디폴트 옵션 정보 값으로 내려갑니다. (default: false)
     *     - 주문 옵션 정보 필요한 경우 hasOrderedOption=true 로 설정하여 요청하시기 바랍니다.
     */
    getCategoryProductReviews: (
        params: CategoryProductReviewsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCategoryProductReviewResponse>({
            method: 'GET',
            url: '/category/product-reviews',
            params,
            ...options,
        });
    },

    /**
     * 상품평 게시판 설정 조회하기
     *  - 상품평 게시판 설정을 조회하는 API입니다
     */
    getReviewBoardConfig: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetReviewBoardConfigResponse>({
            method: 'GET',
            url: '/product-reviews/configurations',
            ...options,
        });
    },

    /**
     * 상품의 포토 후기 목록 조회하기
     *  - 상품 별 포토 상품평 목록을 조회하는 API입니다.
     *  - Paging 기능 제공합니다.
     */
    getPhotoReviewList: (
        productNo: number,
        params?: GetPhotoReviewListParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetPhotoReviewListResponse>({
            method: 'GET',
            url: `/products/${productNo}/photo-reviews`,
            params,
            ...options,
        });
    },

    /**
     * 상품평 목록 조회하기
     *  - 상품 별 상품평 목록을 조회하는 API입니다
     *  - Paging 기능 제공합니다
     *  - https://docs.shopby.co.kr/?url.primaryName=display/#/Review/get-product-product-reviews 참고
     */
    getProductReviewList: (
        productNo: number,
        params: GetProductReviewListParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetProductReviewListResponse>({
            method: 'GET',
            url: `/products/${productNo}/product-reviews`,
            params,
            ...options,
        });
    },

    /**
     * 상품평 등록하기
     *  - 상품평 등록하는 API입니다
     */
    registerProductReview: (
        productNo: number,
        data: RegisterProductReviewData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<RegisterProductReviewResponse>({
            method: 'POST',
            url: `/products/${productNo}/product-reviews`,
            data,
            ...options,
        });
    },

    /**
     * 상품평 가능 유무 조회하기
     *  - 상품평을 작성할 수 있는 구매확정 상품옵션 조회하는 API입니다
     */
    getReviewableOptions: (
        productNo: number,
        params: GetReviewableOptionsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetReviewableOptionResponse>({
            method: 'GET',
            url: `/products/${productNo}/reviewable-options`,
            params,
            ...options,
        });
    },

    /**
     * 상품평 목록 가져오기 2.0
     *  - 상품 별 상품평 목록을 조회하는 API입니다
     */
    getProductReviewListV2: (
        productNo: number,
        params: GetReviewListV2Params,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetReviewListV2Response>({
            method: 'GET',
            url: `/products/${productNo}/product-reviews/`,
            params,
            ...options,
            headers: {
                ...options?.headers,
                version: '2.0',
            },
        });
    },

    /**
     * 상품별 평점 구간별 매칭 리뷰수
     *  - 상품 리뷰평점 구간별 상품매칭수를 확인하는 API입니다
     */
    getReviewCountByRatingRange: (
        productNo: number,
        data: GetReviewCountByRatingRangeData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetReviewCountByRatingRangeResponse>({
            method: 'POST',
            url: `/products/${productNo}/summary`,
            data,
            ...options,
        });
    },

    /**
     * 상품평 가져오기
     *  - 상품평 조회하는 API입니다
     */
    getProductReview: (
        productNo: number,
        reviewNo: number,
        params?: GetProductReviewParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetProductReviewResponse>({
            method: 'GET',
            url: `/products/${productNo}/product-reviews/${reviewNo}`,
            params,
            ...options,
        });
    },

    /**
     * 상품평 수정하기
     *  - 상품평 수정하는 API입니다
     *  - 작성자만 수정 가능합니다
     */
    updateProductReview: (
        productNo: number,
        reviewNo: number,
        data: UpdateProductReviewData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: `/products/${productNo}/product-reviews/${reviewNo}`,
            data,
            ...options,
        });
    },

    /**
     * 상품평 삭제하기
     *  - 상품평 삭제하는 API입니다
     *  - 작성자만 삭제 가능합니다
     */
    deleteProductReview: (
        productNo: number,
        reviewNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: `/products/${productNo}/product-reviews/${reviewNo}`,
            ...options,
        });
    },

    /**
     * 상품평의 댓글 목록 조회하기
     *  - 상품평 전체 목록을 조회하는 API입니다
     *  - Paging 기능 제공합니다
     *  - 정렬 기준(모든 정렬은 1차적으로 정렬된 후, 최근 등록된 순으로 한 번 더 정렬됩니다.)
     *   - RATING - 상품평 평점순
     *   - RECOMMEND - 상품평 추천순
     *   - REGISTER_YMDT - 상품평 등록순
     *   - BEST_REVIEW - 우수 상품평순(DESC: 우수 상품평 먼저 조회, ASC: 일반 상품평 먼저 조회)
     */
    getProductReviewComments: (
        productNo: number,
        reviewNo: number,
        params: GetProductReviewCommentsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetProductReviewCommentResponse>({
            method: 'GET',
            url: `/products/${productNo}/product-reviews/${reviewNo}/comments`,
            params,
            ...options,
        });
    },

    /**
     * 상품평 추천하기
     *  - 상품평 추천하는 API입니다
     */
    recommendProductReview: (
        productNo: number,
        reviewNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/products/${productNo}/product-reviews/${reviewNo}/recommend`,
            ...options,
        });
    },

    /**
     * 상품평 추천 취소하기
     *  - 상품평 추천 취소하는 API입니다
     */
    cancelProductReviewRecommend: (
        productNo: number,
        reviewNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: `/products/${productNo}/product-reviews/${reviewNo}/recommend`,
            ...options,
        });
    },

    /**
     * 상품평 신고하기
     *  - 상품평 신고하는 API입니다
     */
    reportProductReview: (
        productNo: number,
        reviewNo: number,
        data: ReportProductReviewData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/products/${productNo}/product-reviews/${reviewNo}/report`,
            data,
            ...options,
        });
    },

    /**
     * 상품평 신고 취소하기
     */
    cancelReportProductReview: (
        productNo: number,
        reviewNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: `/products/${productNo}/product-reviews/${reviewNo}/report`,
            ...options,
        });
    },

    /**
     * 내 상품평 목록 조회하기
     *  - 내 상품평 목록을 조회하는 API입니다
     */
    getMyProductReviews: (
        params: GetMyProductReviewsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetMyProductReviewsResponse>({
            method: 'GET',
            url: 'profile/product-reviews',
            params,
            ...options,
        });
    },

    /**
     * 내 상품평 작성 가능 목록 조회하기
     *  - 내 상품평 작성 가능 목록들을 조회하는 API입니다
     */
    getReviewableProducts: (
        params: GetReviewableProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetReviewableProductsResponse>({
            method: 'GET',
            url: 'profile/order-options/product-reviewable',
            params,
            ...options,
        });
    },

    /**
     * 상품평 게시판 목록 조회하기
     *  - 상품평 게시판 목록을 조회하는 API입니다. (전체 상품평 / 포토 상품평)
     *  - Paging 기능 제공합니다.
     *  - page 사이즈는 몰의 설정된 값을 조회하여 자동으로 적용됩니다.
     *  - isWidget = true 인 경우, 입력받은 requestParameter 값이 아닌 위젯의
     *  - 리뷰 노출갯수와 베스트 후기 순으로 조회됩니다.
     */
    getReviewBoardList: (
        params: GetReviewBoardListParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetReviewBoardListResponse>({
            method: 'GET',
            url: 'reviews/boards',
            params,
            ...options,
        });
    },

    /**
     * 상품리뷰 태그 전체 조회하기
     *  - 상품리뷰 태그 전체 조회하는 API입니다
     */
    getReviewTags: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetReviewTagsResponse>({
            method: 'GET',
            url: 'reviews/tags',
            ...options,
        });
    },

    /**
     * 상품 기준 상품평 게시판 목록 조회하기
     *  - 상품 기준 상품평 게시판 목록을 조회하는 API입니다
     *  - Paging 기능 제공합니다
     *  - page 사이즈는 몰의 설정된 값을 조회하여 자동으로 적용됩니다
     *  - isWidget = true 인 경우, 입력받은 requestParameter 값이 아닌 위젯의
     *    리뷰 노출 갯수와 리뷰가 많은 순으로 조회됩니다.
     */
    getReviewedProducts: (
        params: GetReviewsProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetReviewedProductsResponse>({
            method: 'GET',
            url: 'reviews/boards/reviewed-products',
            params,
            ...options,
        });
    },
};

export default review;
