// import qs from 'qs';
import type { Options } from 'ky';

// import request from '@/api/core/request';
// import {
//     GetStandardCategoryResponse,
//     ProductDetailResponse,
//     ProductOptionResponse,
//     ProductsParams,
//     ProductsSearchResponse,
//     RelatedProductResponse,
// } from '@/models/product';
import { request } from '@/api/core';
import {
    //     ExtraInfo,
    //     GetBestReviewProductsParams,
    //     GetBestReviewProductsResponse,
    GetBestSellerProductsParams,
    GetBestSellerProductsResponse,
    //     GetGroupManagementCodesData,
    //     GetKeywordsByProductNoParams,
    //     GetKeywordsByProductNoResponse,
    //     GetOptionImagesResponse,
    //     GetPriorityPurchasableRightResponse,
    //     GetProductDetailParams,
    GetProductDisplayCategoriesResponse,
    //     GetProductOptionImagesResponse,
    //     GetProductOptionParams,
    //     GetProductOptionsResponse,
    //     GetProductSearchSummaryParams,
    //     GetProductSearchSummaryResponse,
    //     GetProductsInfoByProductNosData,
    //     GetProductsInfoByProductNosResponse,
    //     GetProductsShippingInfoParams,
    //     GetProductsShippingInfoResponse,
    //     GetRegularDeliveryProductsResponse,
    //     GetShortUrlResponse,
    //     GroupManagementCodeResponse,
    //     ProductSearchParams,
    //     RequestRestockNotificationData,
} from '@/models/product/product';

const product = {
    //     /**
    //      * 묶음 배송 상품 목록 조회하기
    //      *  - 묶음 배송 상품 목록 조회하는 API입니다
    //      */
    //     getBundleProducts: (params: ProductsParams) => {
    //         return request({ method: ''})
    //     }
    //         // request<ProductsSearchResponse>({
    //         //     method: 'GET',
    //         //     url: '/products/bundle-shipping',
    //         //     params,
    //         // }),
    //     /**
    //      *  상품 번호 리스트로 추가 정보 조회
    //      *  상품번호를 통해 extraInfo(추가정보)를 조회하는 API입니다.
    //      */
    //     getProductExtraInfo: (params: { productNos: number[] }) =>
    //         request<ExtraInfo[]>({
    //             method: 'GET',
    //             url: '/products/extraInfo',
    //             params,
    //             paramsSerializer: {
    //                 serialize: (params) =>
    //                     qs.stringify(params, { arrayFormat: 'comma' }),
    //             },
    //         }),
    //     /**
    //      * 인기 검색어 조회하기
    //      *  - 인기 검색어 조회하는 API입니다
    //      */
    //     getFavoriteKeywords: (params: { size?: number }) =>
    //         request<string[]>({
    //             method: 'GET',
    //             url: '/products/favoriteKeywords',
    //             params,
    //         }),
    //     /**
    //      * 그룹관리코드 조회하기
    //      *  - 그룹관리코드 조회하는 API입니다
    //      */
    //     getGroupManagementCodes: (data: GetGroupManagementCodesData) =>
    //         request<GroupManagementCodeResponse>({
    //             method: 'POST',
    //             url: '/products/group-management-code',
    //             data,
    //         }),
    //     /**
    //      * 옵션 목록 조회하기
    //      *  - 옵션 목록을 조회하는 API입니다
    //      */
    //     getProductOptions: (productNos: number[]) =>
    //         request<GetProductOptionsResponse>({
    //             method: 'GET',
    //             url: '/products/options',
    //             params: { productNos },
    //             paramsSerializer: (params) =>
    //                 qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 }),
    //         }),
    //     /** 변경 가능한 정기 결제 상품 조회하기 */
    //     getRegularDeliveryProducts: (params?: { page: number; size: number }) =>
    //         request<GetRegularDeliveryProductsResponse>({
    //             method: 'GET',
    //             url: '/products/regular-delivery',
    //             params,
    //         }),
    //     /**
    //      * 재입고 알림 신청
    //      *  - 재입고 알림 신청하는 API입니다
    //      */
    //     requestRestockNotification: (data: RequestRestockNotificationData) =>
    //         request({
    //             method: 'POST',
    //             url: '/products/restock',
    //             data,
    //         }),
    //     /**
    //      * 상품 검색(search engine)하기
    //      *  - 상품 목록 조회하는 API입니다
    //      *  - Paging 기능 제공합니다. (페이지당 조회가능한 최대 상품 개수는 500개 입니다.)
    //      *  - 아래 Parameters에 해당하는 검색조건들의 경우, 매 10분 마다 캐시가 됩니다 ( ex. 10시 10분, 10시 20분, 10시 30분...)
    //      *  - ex. 10시 13분에 상품명을 [테스트 상품 -> 임시 상품]으로 변경 후 '임시 상품'으로 검색 시, 10시 19분까지 검색되지않고, 10시 20분이후에 검색 가능합니다
    //      *  *  ※ filter.customProperties.propOperator을 입력하시는 경우 아래 검색 조건은 필수로 입력하셔야 합니다.
    //      *  - filter.customProperties.propNos / filter.customProperties.propValueNos
    //      *  판매중인 상태의 상품 조회 시 검색되는 예약 판매중인 상품은 검색되지 않도록 개선되었습니다.
    //      */
    //     searchProducts: (params: ProductSearchParams) =>
    //         request<ProductsSearchResponse>({
    //             method: 'GET',
    //             url: '/products/search',
    //             params: {
    //                 'filter.discountedPrices': params.filter?.discountedPrices,
    //                 'filter.keywords': params.filter?.keywords,
    //                 'filter.keywordInResult': params.filter?.keywordInResult,
    //                 'filter.discountedComparison':
    //                     params.filter?.discountedComparison,
    //                 'filter.deliveryConditionType':
    //                     params.filter?.deliveryConditionType,
    //                 'filter.saleStatus': params.filter?.saleStatus,
    //                 'filter.soldout': params.filter?.soldout,
    //                 'filter.totalReviewCount': params.filter?.totalReviewCount,
    //                 'filter.familyMalls': params.filter?.familyMalls,
    //                 'filter.productManagementCd':
    //                     params.filter?.productManagementCd,
    //                 'filter.excludeMallProductNo':
    //                     params.filter?.excludeMallProductNo,
    //                 'filter.includeMallProductNo':
    //                     params.filter?.includeMallProductNo,
    //                 'filter.customProperties.propValueNos':
    //                     params.filter?.customProperties?.propValueNos,
    //                 'filter.customProperties.propNos':
    //                     params.filter?.customProperties?.propNos,
    //                 'filter.customProperties.propOperator':
    //                     params.filter?.customProperties?.propOperator,
    //                 'filter.stickerNos': params.filter?.stickerNos,
    //                 'order.by': params.order?.by,
    //                 'order.direction': params.order?.direction,
    //                 'order.soldoutPlaceEnd': params.order?.soldoutPlaceEnd,
    //                 categoryNos: params.categoryNos,
    //                 categoryOperator: params.categoryOperator,
    //                 brandNos: params.brandNos,
    //                 partnerNo: params.partnerNo,
    //                 clientKey: params.clientKey,
    //                 pageNumber: params.pageNumber,
    //                 pageSize: params.pageSize,
    //                 onlySaleProduct: params.onlySaleProduct,
    //                 hasMaxCouponAmt: params.hasMaxCouponAmt,
    //                 hasTotalCount: params.hasTotalCount,
    //                 hasOptionValues: params.hasOptionValues,
    //                 includeSummaryInfo: params.includeSummaryInfo,
    //                 shippingAreaType: params.shippingAreaType,
    //             },
    //             paramsSerializer: (params) => {
    //                 return qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 });
    //             },
    //         }),
    //     /**
    //      * 상품번호 리스트로 상품 조회
    //      *  - 상품번호 리스트로 상품을 조회하는 API입니다. (hasOptionValues: 옵션값 포함여부, default: false)
    //      */
    //     getProductsInfoByProductNos: (data: GetProductsInfoByProductNosData) =>
    //         request<GetProductsInfoByProductNosResponse>({
    //             method: 'POST',
    //             url: '/products/search-by-nos',
    //             data,
    //         }),
    //     /**
    //      * 상품번호를 통한 배송 정보 및 배송 불가 국가 조회 API
    //      *  - 상품번호를 통해 배송 정보 및 배송 불가 국가를 조회하는 API 입니다.
    //      */
    //     getProductsShippingInfo: (params: GetProductsShippingInfoParams) =>
    //         request<GetProductsShippingInfoResponse>({
    //             method: 'GET',
    //             url: '/products/shipping-info',
    //             params,
    //             paramsSerializer: (params) => {
    //                 return qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 });
    //             },
    //         }),
    //     /**
    //      * 상품 상세 조회하기
    //      *  - 해당 상품 번호에 대한 상세, 이미지, 옵션 정보를 조회하는 API입니다
    //      */
    //     getProductDetail: (productNo: number, params?: GetProductDetailParams) =>
    //         request<ProductDetailResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}`,
    //             params,
    //         }),
    //     /**
    //      * 베스트 리뷰 상품 검색(search engine)하기
    //      *  - 베스트 리뷰 상품 검색하는 API입니다.
    //      *  - 전일 ~ 7일 전까지의 평점과 전체기간 평점을 합산한 최종 점수로 정렬된 상품을 조회합니다.
    //      *  - 동일한 점수의 경우 베스트 리뷰 점수 -> 총 리뷰 개수 -> 최근 등록 순으로 정렬합니다.
    //      */
    //     getBestReviewProducts: (params: GetBestReviewProductsParams) =>
    //         request<GetBestReviewProductsResponse>({
    //             method: 'GET',
    //             url: '/products/best-review/search',
    //             params,
    //             paramsSerializer: (params) =>
    //                 qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 }),
    //         }),

    /**
     * 베스트 셀러 상품(search engine) 검색하기
     *  - 베스트 셀러 상품 검색하는 API입니다
     *  - 1주일전 ~ 현재까지의 판매수로 정렬된 상품을 조회합니다
     *  - 예시: 2023-07-25 13:00:00 기준, 2023-07-18 13:00:00 ~ 2023-07-25 13:00:00 사이에 판매된 수를 기준으로 조회합니다
     */
    getBestSellerProducts: (
        searchParams: GetBestSellerProductsParams,
        options?: Options
    ) => {
        return request.get('products/best-seller/search', {
            searchParams: { test: 111, test2: 3333 },
            ...options,
        });

        // .json<GetBestSellerProductsResponse>();
    },
    //     getBestSellerProducts: (params: GetBestSellerProductsParams) =>
    //         request<GetBestSellerProductsResponse>({
    //             method: 'GET',
    //             url: '/products/best-seller/search',
    //             params,
    //             paramsSerializer: (params) =>
    //                 qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 }),
    //         }),

    //     /**
    //      * 상품 번호 리스트로 검색어 조회
    //      *   - 상품번호를 통해 어드민에 등록된 검색어를 조회하는 API 입니다
    //      */
    //     getKeywordsByProductNo: (params: GetKeywordsByProductNoParams) =>
    //         request<GetKeywordsByProductNoResponse>({
    //             method: 'GET',
    //             url: '/products/search/keywords',
    //             params,
    //             paramsSerializer: (params) =>
    //                 qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 }),
    //         }),
    //     /**
    //      *  상품 검색 결과 Summary 정보 조회(search engine)하기
    //      *  - 상품 검색 결과의 Summary 정보만 응답하는 API입니다
    //      *  - 상품 검색 결과의 Summary 정보를 제공합니다. (displayCategories, brands 등)
    //      *  아래 Parameters에 해당하는 검색조건들의 경우, 매 10분 마다 캐시가 됩니다 ( ex. 10시 10분, 10시 20분, 10시 30분...)
    //      *  ex. 10시 13분에 상품명을 [테스트 상품 -> 임시 상품]으로 변경 후 '임시 상품'으로 검색 시, 10시 19분까지 검색되지않고, 10시 20분이후에 검색 가능합니다.
    //      *  항목 값(propNos, propValueNos)은 GET /products/custom-properties API를 참조하면됩니다.
    //      *  filter.customProperties.propOperator : 상품항목 추가정보 조회 조건을 선택합니다.
    //      *  ※ filter.customProperties.propOperator을 입력하시는 경우 아래 검색 조건은 필수로 입력하셔야 합니다.
    //      *  - filter.customProperties.propNos / filter.customProperties.propValueNos
    //      *  판매중인 상태의 상품 조회 시 검색되는 예약 판매중인 상품은 검색되지 않도록 개선되었습니다.
    //      */
    //     getProductSearchSummary: (params: GetProductSearchSummaryParams) =>
    //         request<GetProductSearchSummaryResponse>({
    //             method: 'GET',
    //             url: '/products/search/summary',
    //             params: {
    //                 'filter.discountedPrices': params.filter?.discountedPrices,
    //                 'filter.keywords': params.filter?.keywords,
    //                 'filter.keywordInResult': params.filter?.keywordInResult,
    //                 'filter.discountedComparison':
    //                     params.filter?.discountedComparison,
    //                 'filter.deliveryConditionType':
    //                     params.filter?.deliveryConditionType,
    //                 'filter.saleStatus': params.filter?.saleStatus,
    //                 'filter.soldout': params.filter?.soldout,
    //                 'filter.totalReviewCount': params.filter?.totalReviewCount,
    //                 'filter.familyMalls': params.filter?.familyMalls,
    //                 'filter.productManagementCd':
    //                     params.filter?.productManagementCd,
    //                 'filter.excludeMallProductNo':
    //                     params.filter?.excludeMallProductNo,
    //                 'filter.includeMallProductNo':
    //                     params.filter?.includeMallProductNo,
    //                 'filter.customProperties.propValueNos':
    //                     params.filter?.customProperties?.propValueNos,
    //                 'filter.customProperties.propNos':
    //                     params.filter?.customProperties?.propNos,
    //                 'filter.customProperties.propOperator':
    //                     params.filter?.customProperties?.propOperator,
    //                 'filter.stickerNos': params.filter?.stickerNos,
    //                 categoryNos: params.categoryNos,
    //                 categoryOperator: params.categoryOperator,
    //                 brandNos: params.brandNos,
    //                 partnerNo: params.partnerNo,
    //                 onlySaleProduct: params.onlySaleProduct,
    //                 shippingAreaType: params.shippingAreaType,
    //             },
    //             paramsSerializer: (params) =>
    //                 qs.stringify(params, {
    //                     arrayFormat: 'comma',
    //                 }),
    //         }),

    /**
     * 상품 번호에 해당하는 모든 전시카테고리 조회하기
     *  - 상품번호에 해당하는 모든 전시카테고리 조회하기 API입니다
     *  - 마지막 뎁스 번호는 depth5No, 전체 전시카테고리 경로는 fullCategoryName 으로 확인할 수 있습니다
     */
    getProductDisplayCategories: (productNo: number) => {
        return request
            .get(`products/${productNo}/display-categories`)
            .json<GetProductDisplayCategoriesResponse>();
    },

    //     /**
    //      * 옵션 조회하기
    //      *  - 해당 상품 번호에 대한 옵션 정보를 조회하는 API입니다
    //      *  - 2가지 옵션 목록(계층, 원본)을 제공합니다
    //      */
    //     getProductOption: (productNo: number, params?: GetProductOptionParams) =>
    //         request<ProductOptionResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/options`,
    //             params,
    //         }),
    //     /**
    //      *  상품번호로 상품우선구매권한 조회
    //      */
    //     getPriorityPurchasableRight: (productNo: string) =>
    //         request<GetPriorityPurchasableRightResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/purchasable`,
    //         }),
    //     /**
    //      * 관련 상품 정보 조죄하기
    //      *  - 관련 상품 정보를 조회하는 API입니다
    //      *  - 관련 상품은 설정된 기준에 따라 최대 500개까지 조회할 수 있습니다
    //      */
    //     getRelatedProducts: (productNo: string) =>
    //         request<RelatedProductResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/related-products`,
    //         }),
    //     getStandardCategory: (productNo: number) =>
    //         request<GetStandardCategoryResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/standard-category`,
    //         }),
    //     /**
    //      * 상품 번호와 쇼핑몰 번호에 해당하는 단축URL 조회하기
    //      *  - 상품번호와 쇼핑몰 번호에 해당하는 단축URL 조회하는 API입니다
    //      *  - 어드민 설정을 제공하는 샵바이 프로에서만 사용가능한 API입니다
    //      */
    //     getShortUrl: (productNo: string) =>
    //         request<GetShortUrlResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/url-shortening`,
    //         }),
    //     /**
    //      * 상품에 해당하는 옵션 이미지 목록 조회하기
    //      *  - 상품에 해당하는 옵션 이미지 목록 조회하는 API입니다
    //      *  - 옵션 상세 보기 시, 사용합니다
    //      */
    //     getProductOptionImages: (productNo: string) =>
    //         request<GetProductOptionImagesResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/options/images`,
    //         }),
    //     /**
    //      * 옵션의 이미지 정보 조회하기
    //      *  - 옵션의 이미지 목록을 조회하는 API입니다
    //      *  - 옵션 상세 보기 시, 사용합니다
    //      */
    //     getOptionImages: (productNo: string, optionNo: string) =>
    //         request<GetOptionImagesResponse>({
    //             method: 'GET',
    //             url: `/products/${productNo}/options/${optionNo}/images`,
    //         }),
};

export default product;
