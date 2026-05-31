import type {
    AdminType,
    DisplayStatusType,
    InquirySearchType,
    ProductInquiryReportType,
    ProductInquirySearchType,
    ProductInquiryType,
    ProviderType,
} from '@/models';
import type { TagValue } from '@/entities/display/model';
import type { ImageUrlType } from '@/entities/product/model';

export type BoardImageType = 'NONE' | 'PRODUCT_MAIN_IMAGE';

export interface GetAllProductInquiriesParams extends Paging {
    /** 검색어 기준 (내용: CONTENT, 상품명: PRODUCT_NAME) */
    searchType?: 'CONTENT' | 'PRODUCT_NAME';
    /** 검색어 */
    searchKeyword?: string;
    /** 태그값번호 */
    tagValuesNos?: number[];
}

export type GetAllProductInquiriesResponse = ItemList<SummarizedInquiryItem>;

export interface SummarizedInquiryItem {
    /** 주문 번호 */
    orderNo: string;
    /** 답변 여부 */
    replied: boolean;
    /** 내 상품문의 여부 */
    myInquiry: boolean;
    /** 상품문의 타입 */
    type: ProductInquiryType;
    /** 문의 제목 */
    title: string;
    /** 비밀글 여부 */
    secreted: boolean;
    /** provider 유형 */
    providerType: ProviderType;
    /** 상품명 */
    productName: string;
    /** 문의 내용 */
    content: string;
    /** 회원번호 */
    registerNo: number;
    /** 태그값번호 */
    tagValueNos: number[];
    /** 관리자 여부 */
    administrator: boolean;
    /** 삭제 여부 */
    deleted: boolean;
    /** 상품 이미지 url */
    imageUrl: string;
    /** 상품문의 수정 가능 여부 */
    modifiable: boolean;
    /** 작성자 명 */
    registerName: string;
    /** 전시 상태 */
    displayStatusType: DisplayStatusType;
    /** 상품번호 */
    productNo: number;
    /** 작성자 아이디 */
    memberId: string;
    /** 상품문의 등록 일자 */
    registerYmdt: string;
    /** 상품문의 번호 */
    inquiryNo: number;
}

export interface GetProductInquiryConfigResponse {
    /** 답글 사용 가능 여부 (true: 답글 가능, false:답글 불가) */
    canReply: boolean;
    /** 게시판 게시판 유형 */
    boardType: 'INQUIRY';
    /** 회원 작성 가능 여부 (true: 회원 작성가능, false:회원 작성불가 */
    memberWriteable: boolean;
    /** 게시판 이미지 유형 */
    boardImageType: BoardImageType;
    /** 비밀글 사용 가능 여부 (true: 비밀글 사용가능, false:비밀글 사용불가 */
    secretUsable: boolean;
    /** 게시판 명 */
    name: string;
    /** 게시판 설명 */
    description: string;
    /** 상품평 게시판 사용 여부 (true: 사용가능, false: 사용불가 */
    boardUsable: boolean;
    /** 비회원 작성 가능 여부 (true: 비회원 작성가능, false:비회원 작성불가 */
    guestWriteable: boolean;
    /** 첨부 사용 가능 여부 (true: 첨부 기능 사용가능, false:첨부 기능 사용불가) */
    canAttach: boolean;
}

export interface GetProductInquiryTagsResponse {
    /** 상품문의 태그정보 */
    inquiryTags: {
        /** 태그명 */
        inquiryTagName: string;
        /** 상품문의 태그값 정보 */
        inquiryTagValues: TagValue[];
        /** 태그번호 */
        inquiryTagNo: number;
    }[];
}

export interface UpdateProductInquiryData {
    /** 상품문의 태그값번호 */
    tagValueNos?: number[];
    /** 상품문의 유형 */
    type: ProductInquiryType;
    /** 상품문의 제목(선택) */
    title: string;
    /** 비밀글 여부 */
    secreted: boolean;
    /** 상품문의 내용(필수) */
    content: string;
}

export interface WriteProductInquiryData {
    /** 상품문의 태그값 번호 */
    tagValueNos?: number[];
    /** 대댓글 경우만 전송(부모 상품문의 번호) */
    parentInquiryNo?: number;
    /** 상품문의 유형 */
    type: ProductInquiryType;
    /** 상품문의 제목(선택) */
    title?: string;
    /** 비밀글 여부 */
    secreted: boolean;
    /** 이메일 (입력시 회원 정보의 이메일이 아닌 입력한 주소로 답변 발송) */
    email?: string;
    /** 상품문의 내용(필수) */
    content: string;
    /** 상품번호 */
    productNo: number;
}

export interface GetProductInquiriesParams extends Paging {
    /** 조회일 시작일(입력 안 할 경우 3개월, yyyy-MM-dd) */
    startYmd?: string;
    /** 조회일 종료일(입력 안 할 경우 오늘, yyyy-MM-dd) */
    endYmd?: string;
    /** 답변 유무 조건(답변이 달린 문의 목록: true, 답변이 달리지 않은 목록이거나 없을 경우 전체(default): false) */
    answered?: boolean;
    /** 내 문의만 조회 여부 (default: true) */
    isMyInquiries?: boolean;
    /** 태그값 번호 */
    tagValueNos?: number[];
}
export type GetProductInquiriesResponse = ItemList<InquiryItem>;

export interface WriteProductInquiryResponse {
    /** 상품문의 번호 */
    inquiryNo: number;
}

export interface ReportProductInquiryData {
    /** 신고타입 (COPYRIGHT: 저작권 침해 및 기타사유, SLANDER: 욕설 또는 비방, ETC: 기타) */
    reportType: ProductInquiryReportType;
    /** 신고사유 상세 */
    reason: string;
    /** 상품평 번호 */
    inquiryNo: number;
}

export type GetProductInquiryResponse = InquiryItem;

export interface GetMyProductInquiriesParams extends Paging {
    /** 조회일 시작일(입력 안 할 경우 3개월, yyyy-MM-dd) */
    startYmd?: string;
    /** 조회일 종료일(입력 안 할 경우 오늘, yyyy-MM-dd) */
    endYmd?: string;
    /** 답변 유무 조건(답변이 달린 문의 목록: true, 답변이 달리지 않은 목록이거나 없을 경우 전체(default): false) */
    answered?: boolean;
    /** 검색어 기준 (Content: CONTENT, Product Name: PRODUCT_NAME, All: ALL) */
    searchType?: ProductInquirySearchType;
    /** 검색어 */
    searchKeyword?: string;
    /** 태그값번호 */
    tagValueNos?: number[];
}

export type GetMyProductInquiriesResponse = ItemList<InquiryItem>;

export interface InquiryItem {
    /** 상품관리코드 */
    productManagementCd: string;
    /** 답변 여부 */
    replied: boolean;
    answers: Answer[];
    /** 상품문의 타입 */
    type: ProductInquiryType;
    /** 문의 제목 */
    title: string;
    /** 상품명 */
    productName: string;
    /** provider 유형 */
    providerType: ProviderType;
    /** 문의 내용 */
    content: string;
    /** 회원번호 */
    registerNo: number;
    /**태그값번호 */
    tagValueNos: number[];
    /** 관리자 여부 */
    administrator: boolean;
    /** 상품문의 수정 일자 */
    updateYmdt: string;
    /** 차단여부 */
    blocked: boolean;
    /** 상품 이미지 url */
    imageUrl: string;
    /** 상품문의 수정 가능 여부 */
    modifiable: boolean;
    imageUrlInfo: {
        /** 상품 이미지 메인 여부 */
        isMain: boolean;
        /** 상품 이미지 URL 타입 */
        imageUrlType: ImageUrlType;
        /** 상품 이미지 URL */
        url: string;
    };
    /** 상품번호 */
    productNo: number;
    /** 상품문의 등록 일자 */
    registerYmdt: string;
    /** 작성자 아이디 */
    memberId: string;
    /** 작성자 등급 */
    gradeLabel: string;
    /** 상품 브랜드명 */
    brandName: string;
    /** 신고 취소 여부 */
    cancelReportable: string;
    /** 주문번호 */
    orderNo: string;
    /** 작성자 탈퇴 여부 */
    expelled: boolean;
    /** 작성자 닉네임 */
    nickName: string;
    /** 내 상품문의 여부 */
    myInquiry: boolean;
    /** 비밀글 여부 */
    secreted: boolean;
    /** 상품 브랜드 영문명 */
    brandNameEn: string;
    /** 영문상품명 */
    productNameEn: string;
    /** 작성자 명 */
    registerName: string;
    /** 전시 상태 */
    displayStatusType: DisplayStatusType;
    /** 상품문의 번호 */
    inquiryNo: number;
}

export interface Answer {
    /** 상품문의 답변 관리자 여부 */
    administrator: boolean;
    /** 상품문의 답변 관리자 여부 */
    adminType: AdminType;
    /** 상품문의 답변 수정 일 */
    updateYmdt: string;
    /** 상품문의 답변자 파트너인 경우, 파트너명 */
    partnerName: string;
    /** 상품문의 답변자 닉네임 */
    nickName: string;
    /** 상품문의 답변 제목 */
    title: string;
    /** 상품문의 답변 비밀글 여부 */
    secreted: boolean;
    /** 상품문의 답변 내용 */
    content: string;
    /** 상품문의 답변 등록 일자 */
    registerYmdt: string;
    /** 상품문의 답변 작성자 아이디 */
    memberId: string;
    /** 상품문의 답변 번호 */
    inquiryNo: number;
}
