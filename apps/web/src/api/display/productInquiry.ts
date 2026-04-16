import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { SearchDate } from '@/models/common';
import type {
    GetAllProductInquiriesParams,
    GetAllProductInquiriesResponse,
    GetMyProductInquiriesParams,
    GetMyProductInquiriesResponse,
    GetProductInquiriesParams,
    GetProductInquiriesResponse,
    GetProductInquiryConfigResponse,
    GetProductInquiryResponse,
    GetProductInquiryTagsResponse,
    ReportProductInquiryData,
    UpdateProductInquiryData,
    WriteProductInquiryData,
    WriteProductInquiryResponse,
} from '@/models/display/productInquiry';

const productInquiry = {
    /**
     * 전체 상품 문의 목록 조회하기
     *  - 전체 상품 문의 목록 조회하는 API입니다
     *  - Paging 기능을 제공합니다
     */
    getAllProductInquiries: (
        params: GetAllProductInquiriesParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetAllProductInquiriesResponse>({
            method: 'GET',
            url: '/products/inquiries',
            params,
            ...options,
        });
    },

    /**
     * 상품문의 게시판 설정 조회하기
     *  - 상품문의 게시판 설정 조회하는 API입니다
     */
    getConfig: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetProductInquiryConfigResponse>({
            method: 'GET',
            url: '/products/inquiries/configurations',
            ...options,
        });
    },

    /**
     * 상품문의 태그 전체 조회하기
     *  - 상품문의 태그 전체 조회하는 API입니다.
     */
    getProductInquiryTags: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetProductInquiryTagsResponse>({
            method: 'GET',
            url: '/products/inquiries/tags',
            ...options,
        });
    },

    /**
     * 상품문의 수정하기
     *  - 상품문의를 수정하는 API입니다
     *  - 작성자 본인만 수정 가능합니다
     *  - 제목,내용,문의유형만 수정 가능합니다
     */
    updateProductInquiry: (
        inquiryNo: number,
        data: UpdateProductInquiryData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: `/products/inquiries/${inquiryNo}`,
            data,
            ...options,
        });
    },

    /**
     * 상품문의 삭제하기
     *  - 상품문의를 삭제하는 API입니다
     *  - 작성자 본인만 삭제 가능합니다
     */
    deleteProductInquiry: (inquiryNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'DELETE',
            url: `/products/inquiries/${inquiryNo}`,
            ...options,
        });
    },

    /**
     * 상품문의 목록 조회하기
     *  - 상품번호로 상품문의를 조회하는 API 입니다.
     *   - 로그인 했을 경우 accessToken을 추가해야 합니다
     *  - Paging 기능을 제공합니다.
     *  - 조회 시작일/종료일을 입력하지 않는 경우 최근 3개월간 상품문의 게시글이 조회됩니다.
     */
    getProductInquiries: (
        productNo: number,
        params?: GetProductInquiriesParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetProductInquiriesResponse>({
            method: 'GET',
            url: `/products/${productNo}/inquiries`,
            params,
            ...options,
        });
    },

    /**
     * 상품문의 등록하기
     *  - 상품문의를 등록하는 API입니다
     */
    writeProductInquiry: (
        productNo: number,
        data: WriteProductInquiryData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<WriteProductInquiryResponse>({
            method: 'POST',
            url: `/products/${productNo}/inquiries`,
            data,
            ...options,
        });
    },

    /**
     * 상품문의 신고 취소하기
     *  - 상품문의 신고 취소하는 API입니다.
     */
    cancelReportProductInquiry: (
        inquiryNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: `/products/${inquiryNo}/inquiries/report`,
            ...options,
        });
    },

    /**
     *  상품문의 신고하기
     *   - 상품문의를 신고하는 API 입니다.
     */
    reportProductInquiry: (
        productNo: number,
        data: ReportProductInquiryData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: `/products/${productNo}/inquiries/report`,
            data,
            ...options,
        });
    },

    /**
     * 상품문의 조회하기
     *  - 상품번호로 상품문의를 조회하는 API입니다
     *  - 로그인 했을 경우 accessToken을 추가해야 합니다
     */
    getProductInquiry: (
        productNo: number,
        inquiryNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetProductInquiryResponse>({
            method: 'GET',
            url: `/products/${productNo}/inquiries/${inquiryNo}`,
            ...options,
        });
    },

    /**
     * 내 상품문의 목록 조회하기
     *  - 내 상품문의를 조회하는 API입니다
     *  - Paging 기능을 제공합니다
     */
    getMyProductInquiries: (
        params: GetMyProductInquiriesParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetMyProductInquiriesResponse>({
            method: 'GET',
            url: '/profile/product-inquiries',
            params,
            ...options,
        });
    },

    /**
     * 내 상품문의 횟수 조회하기
     *  - 내 상품문의 횟수를 조회하는 API입니다
     */
    getMyProductInquiriesCount: (
        params: SearchDate,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'GET',
            url: '/profile/product-inquiries/count',
            params,
            ...options,
        });
    },
};

export default productInquiry;
