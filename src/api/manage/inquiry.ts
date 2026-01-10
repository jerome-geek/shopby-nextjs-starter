import type { Options } from 'ky';
import qs from 'qs';

import request from '@/api/core/request';
import {
    DownloadInquiryFileParams,
    GetInquiriesParams,
    GetInquiryResponse,
    GetInquiryTypesParams,
    UpdateInquiryData,
    WriteInquiryData,
    GetInquiryConfigResponse,
    GetInquiriesResponse,
    GetInquiryTypesResponse,
    WriteInquiryResponse,
} from '@/models/manage/inquiry';

const inquiry = {
    /**
     * 1:1 문의 내역 조회하기
     *  - 1:1 문의글 목록을 전체 검색하는 API 입니다
     *  - 문의 상태 : inquiryStatus와 inquiryStatuses가 있으며, 두 개를 동시에 요청파라미터로 넣으면 그 둘을 합한 상태를 조회합니다
     *   - inquiryStatus: 하나의 1:1문의 상태에 대해서 조회 가능
     *   - inquiryStatuses, 여러 개의 1:1문의 상태 조회 가능. ','로 구분
     *   - (ASKED: 레거시 호환용, ISSUED와 같다)
     */
    getInquiries: (params?: GetInquiriesParams, options?: Options) => {
        return request.get<GetInquiriesResponse>('inquiries', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 1:1 문의 등록하기
     *  - 1:1 문의를 등록하는 API 입니다
     *  - 샵바이프리미엄 쇼핑몰에서만 비회원 1:1문의가 가능합니다. 비회원 등록 시에는 email을 필수로 입력해야 합니다
     */
    writeInquiry: (data: WriteInquiryData, options?: Options) => {
        return request.post<WriteInquiryResponse>('inquiries', {
            json: data,
            ...options,
        });
    },

    /**
     * 1:1 문의 설정 조회하기
     *  - 1:1 문의 설정을 조회하는 API 입니다
     */
    getInquiryConfig: (options?: Options) => {
        return request.get<GetInquiryConfigResponse>(
            'inquiries/configurations',
            {
                ...options,
            }
        );
    },

    /**
     * 1:1 문의 유형 조회
     *  - 1:1 문의 유형을 조회하는 API 입니다.
     */
    getInquiryTypes: (params?: GetInquiryTypesParams, options?: Options) => {
        return request.get<GetInquiryTypesResponse>('inquiries/types', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 1:1 문의 상세 조회하기 (문의번호 기준)
     *  - 특정 1:1 문의(문의번호 기준)를 상세 조회하는 API 입니다
     */
    getInquiry: (inquiryNo: number, options?: Options) => {
        return request.get<GetInquiryResponse>(`inquiries/${inquiryNo}`, {
            ...options,
        });
    },

    /**
     * 1:1 문의 변경하기
     *  - 특정 1:1 문의(문의번호 기준)를 수정하는 API 입니다
     *  image 삭제는 '1:1 문의 부분 변경하기' API를 통해 해야합니다.
     */
    updateInquiry: (
        inquiryNo: number,
        data: UpdateInquiryData,
        options?: Options
    ) => {
        return request.put(`inquiries/${inquiryNo}`, {
            json: data,
            ...options,
        });
    },

    /**
     * 1:1 문의 삭제하기
     *  - 특정 1:1 문의(문의번호 기준)를 삭제하는 API 입니다
     */
    deleteInquiry: (inquiryNo: number, options?: Options) => {
        return request.delete(`inquiries/${inquiryNo}`, {
            ...options,
        });
    },

    /**
     * 1:1 문의 부분 변경하기
     *  - 특정 1:1 문의(문의번호 기준)를 부분 수정하는 API 입니다.
     *  - originalFileNames, uploadedFileNames 이 null 인 경우 첨부파일은 수정되지 않습니다.
     *   - ex) { "originalFileNames" : null, "uploadedFileNames" : null }
     *  - originalFileNames, uploadedFileNames 이 빈 리스트일 경우 첨부파일은 모두 삭제 됩니다.
     *   - ex) { "originalFileNames" : [], "uploadedFileNames" : [] }
     */
    updatePartOfInquiry: (
        inquiryNo: number,
        data: UpdateInquiryData,
        options?: Options
    ) => {
        return request.patch(`inquiries/${inquiryNo}`, {
            json: data,
            ...options,
        });
    },

    /**
     * 1:1 문의 및 답변 파일 다운로드
     *  - 1:1 문의 및 답변 첨부 파일을 다운로드하는 API 입니다.
     */
    downloadInquiryFile: (
        inquiryNo: number,
        params: DownloadInquiryFileParams,
        options?: Options
    ) => {
        return request.get(`inquiries/${inquiryNo}/file`, {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },
};

export default inquiry;
