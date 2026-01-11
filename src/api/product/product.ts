import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';

import {
    GetBestReviewProductsParams,
    GetBestReviewProductsResponse,
    GetBestSellerProductsParams,
    GetBestSellerProductsResponse,
    GetBundleProductsParams,
    GetChangeableRegularDeliveryProductsResponse,
    GetExtraProductsResponse,
    GetFavoriteKeywordsParams,
    GetFavoriteKeywordsResponse,
    GetGroupManagementCodesData,
    GetKeywordsByProductNoParams,
    GetKeywordsByProductNoResponse,
    GetPriorityPurchasableRightResponse,
    GetProductDetailParams,
    GetProductDisplayCategoriesResponse,
    GetProductExtraInfoParams,
    GetProductExtraInfoResponse,
    GetProductPublicInfoParams,
    GetProductPublicInfoResponse,
    GetProductSearchSummaryParams,
    GetProductSearchSummaryResponse,
    GetProductsInfoByProductNosData,
    GetProductsInfoByProductNosResponse,
    GetProductsShippingInfoParams,
    GetProductsShippingInfoResponse,
    GetRegularDeliveryProductsByProductNos,
    GetRegularDeliveryProductsResponse,
    GetRelatedProductsResponse,
    GetShortUrlResponse,
    GetStandardCategoryResponse,
    GroupManagementCodeResponse,
    ProductDetailResponse,
    ProductSearchParams,
    ProductsSearchResponse,
    RequestRestockNotificationData,
} from '@/models/product/product';

const product = {
    /**
     * 묶음 배송 상품 목록 조회하기
     *  - 묶음 배송 상품 목록 조회하는 API입니다
     */
    getBundleProducts: (params: GetBundleProductsParams, options?: Options) => {
        return request.get('products/bundle-shipping', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 상품 번호 리스트로 추가 정보 조회
     *  - 상품번호를 통해 extraInfo(추가정보)를 조회하는 API입니다.
     */
    getProductExtraInfo: (
        params: GetProductExtraInfoParams,
        options?: Options,
    ) => {
        return request.get<GetProductExtraInfoResponse>('products/extraInfo', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 인기 검색어 조회하기
     *  - 인기 검색어 조회하는 API입니다
     */
    getFavoriteKeywords: (
        params: GetFavoriteKeywordsParams,
        options?: Options,
    ) => {
        return request.get<GetFavoriteKeywordsResponse>(
            'products/favoriteKeywords',
            {
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },

    /**
     * 그룹관리코드 조회하기
     *  - 그룹관리코드 조회하는 API입니다
     */
    getGroupManagementCodes: (
        data: GetGroupManagementCodesData,
        options?: Options,
    ) => {
        return request.post<GroupManagementCodeResponse>(
            'products/group-management-code',
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 상품 공개용 기본정보 조회 API
     *  - 상품번호를 통해 공개용 기본정보들을 조회하는 API 입니다.
     */
    getProductPublicInfo: (
        params: GetProductPublicInfoParams,
        options?: Options,
    ) => {
        return request.get<GetProductPublicInfoResponse>(
            'products/public-info',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 변경 가능한 정기 결제 상품 조회하기
     */
    getChangeableRegularDeliveryProducts: (
        params?: GetRegularDeliveryProductsByProductNos,
        options?: Options,
    ) => {
        return request.get<GetChangeableRegularDeliveryProductsResponse>(
            'products/regular-delivery',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 재입고 알림 신청
     *  - 재입고 알림 신청하는 API입니다
     */
    requestRestockNotification: (
        data: RequestRestockNotificationData,
        options?: Options,
    ) => {
        return request.post('products/restock', {
            json: data,
            ...options,
        });
    },

    /**
     * 상품 검색(search engine)하기
     *  - 상품 목록 조회하는 API입니다
     *   - Paging 기능 제공합니다. (페이지당 조회가능한 최대 상품 개수는 500개 입니다.)
     */
    searchProducts: (params: ProductSearchParams, options?: Options) => {
        return request.get<ProductsSearchResponse>('products/search', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 상품번호 리스트로 상품 조회
     *  - 상품번호 리스트로 상품을 조회하는 API입니다. (hasOptionValues: 옵션값 포함여부, default: false)
     */
    getProductsInfoByProductNos: (
        data: GetProductsInfoByProductNosData,
        options?: Options,
    ) => {
        return request.post<GetProductsInfoByProductNosResponse>(
            'products/search-by-nos',
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 상품번호를 통한 배송 정보 및 배송 불가 국가 조회 API
     *  - 상품번호를 통해 배송 정보 및 배송 불가 국가를 조회하는 API 입니다.
     */
    getProductsShippingInfo: (
        params: GetProductsShippingInfoParams,
        options?: Options,
    ) => {
        return request.get<GetProductsShippingInfoResponse>(
            'products/shipping-info',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 상품 상세 조회하기
     *  - 해당 상품 번호에 대한 상세, 이미지, 옵션 정보를 조회하는 API입니다
     */
    getProductDetail: (
        productNo: number,
        params?: GetProductDetailParams,
        options?: Options,
    ) => {
        return request.get<ProductDetailResponse>(`products/${productNo}`, {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 베스트 리뷰 상품 검색(search engine)하기
     *  - 베스트 리뷰 상품 검색하는 API입니다.
     *  - 전일 ~ 7일 전까지의 평점과 전체기간 평점을 합산한 최종 점수로 정렬된 상품을 조회합니다.
     *  - 동일한 점수의 경우 베스트 리뷰 점수 -> 총 리뷰 개수 -> 최근 등록 순으로 정렬합니다.
     */
    getBestReviewProducts: (
        params: GetBestReviewProductsParams,
        options?: Options,
    ) => {
        return request.get<GetBestReviewProductsResponse>(
            'products/best-review/search',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 베스트 셀러 상품(search engine) 검색하기
     *  - 베스트 셀러 상품 검색하는 API입니다
     *  - 1주일전 ~ 현재까지의 판매수로 정렬된 상품을 조회합니다
     *  - 예시: 2023-07-25 13:00:00 기준, 2023-07-18 13:00:00 ~ 2023-07-25 13:00:00 사이에 판매된 수를 기준으로 조회합니다
     */
    getBestSellerProducts: (
        params?: GetBestSellerProductsParams,
        options?: Options,
    ) => {
        return request.get<GetBestSellerProductsResponse>(
            'products/best-seller/search',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 상품 번호 리스트로 정기 결제 상품 조회하기
     *  - 상품번호 리스트로 정기 결제 상품 조회 API 입니다.
     */
    getRegularDeliveryProductsByProductNos: (
        params: GetRegularDeliveryProductsByProductNos,
        options?: Options,
    ) => {
        return request.get<GetRegularDeliveryProductsResponse>(
            'products/regular-delivery',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 상품 번호 리스트로 검색어 조회
     *   - 상품번호를 통해 어드민에 등록된 검색어를 조회하는 API 입니다
     */
    getKeywordsByProductNo: (
        params: GetKeywordsByProductNoParams,
        options?: Options,
    ) => {
        return request.get<GetKeywordsByProductNoResponse>(
            'products/search/keywords',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 상품 검색 결과 Summary 정보 조회(search engine)하기
     *  - 상품 검색 결과의 Summary 정보만 응답하는 API입니다
     *   - 상품 검색 결과의 Summary 정보를 제공합니다. (displayCategories, brands 등)
     *   - 항목 값(propNos, propValueNos)은 GET /products/custom-properties API를 참조하면됩니다.
     *   - filter.customProperties.propOperator : 상품항목 추가정보 조회 조건을 선택합니다.
     *    - AND: 항목값들을 모두 만족시키는 상품이 조회됩니다. ("propNo: 100, propValueNos: 1 2 3" 이 경우 propNo에 해당하는 propValueNos가 1 AND 2 AND 3으로 조회됩니다.)
     *    - OR: 항목값 중 하나라도 만족되는 상품이 조회됩니다. ("propNo: 100, propValueNos: 1 2 3" 이 경우 propNo에 해당하는 propValueNos가 1 OR 2 OR 3으로 조회됩니다.)
     */
    getProductSearchSummary: (
        params: GetProductSearchSummaryParams,
        options?: Options,
    ) => {
        return request.get<GetProductSearchSummaryResponse>(
            'products/search/summary',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 상품 번호에 해당하는 모든 전시카테고리 조회하기
     *  - 상품번호에 해당하는 모든 전시카테고리 조회하기 API입니다
     *  - 마지막 뎁스 번호는 depth5No, 전체 전시카테고리 경로는 fullCategoryName 으로 확인할 수 있습니다
     */
    getProductDisplayCategories: (productNo: number) => {
        return request.get<GetProductDisplayCategoriesResponse>(
            `products/${productNo}/display-categories`,
        );
    },

    /**
     * 추가상품 조회하기
     *  - 상품 번호에 대한 추가상품을 조회하는 API입니다
     *  - 2가지 옵션 목록(계층, 원본)을 제공합니다
     *  - 필수/선택 옵션인 경우 multiOptions(분리형 옵션)노출방식이 변경됩니다.
     *   - multiOptions[].optionValue(옵션값)는 빈값으로 노출됩니다.
     *   - 필수옵션 및 선택옵션의 옵션 값들은 multiOptions.children[]의 1depth로만 노출됩니다.
     */
    getExtraProducts: (productNo: number, options?: Options) => {
        return request.get<GetExtraProductsResponse>(
            `products/${productNo}/extra-products`,
            {
                ...options,
            },
        );
    },

    /**
     * 상품번호로 상품우선구매권한 조회
     *  - 상품에 매핑된 상품우선구매권한 정보를 조회하는 API 입니다.
     */
    getPriorityPurchasableRight: (productNo: string, options?: Options) => {
        return request.get<GetPriorityPurchasableRightResponse>(
            `products/${productNo}/purchasable`,
            {
                ...options,
            },
        );
    },

    /**
     * 관련 상품 정보 조죄하기
     *  - 관련 상품 정보를 조회하는 API입니다
     *  - 관련 상품은 설정된 기준에 따라 최대 500개까지 조회할 수 있습니다
     */
    getRelatedProducts: (productNo: string, options?: Options) => {
        return request.get<GetRelatedProductsResponse>(
            `products/${productNo}/related-products`,
            {
                ...options,
            },
        );
    },

    /**
     * 상품번호에 해당하는 표준카테고리 조회하기
     *  - 상품번호에 해당하는 표준 카테고리를 조회하는 API입니다
     *  - 마지막 뎁스 번호는 depth4No, 전체 표준 카테고리 경로는 fullCategoryName 으로 확인할 수 있습니다.
     */
    getStandardCategory: (productNo: number, options?: Options) => {
        return request.get<GetStandardCategoryResponse>(
            `products/${productNo}/standard-category`,
            {
                ...options,
            },
        );
    },

    /**
     * 상품 번호와 쇼핑몰 번호에 해당하는 단축URL 조회하기
     *  - 상품번호와 쇼핑몰 번호에 해당하는 단축URL 조회하는 API입니다
     */
    getShortUrl: (productNo: string, options?: Options) => {
        return request.get<GetShortUrlResponse>(
            `products/${productNo}/url-shortening`,
            {
                ...options,
            },
        );
    },
};

export default product;
