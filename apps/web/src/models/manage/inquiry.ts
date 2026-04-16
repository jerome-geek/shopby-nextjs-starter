import type {
    InquiryStatusType,
    InquirySearchType,
    ImageDisplayType,
    BoardDisplayType,
} from '@/models';
import type { InquiryAnswer, File, InquiryInfo } from '@/models/manage';

export type InquiryDirection = 'ADMIN' | 'CREATED_ASC' | 'CREATED_DESC';

export type InquiryFileType = 'INQUIRY' | 'INQUIRY_ANSWER';

export interface GetInquiriesParams extends Paging {
    /** 1:1 문의 유형 번호 */
    inquiryTypeNo?: number;
    /** 1:1 문의 상태 (ISSUED(ASKED-이전버전 호환용): 답변대기, IN_PROGRESS: 답변 진행중, ANSWERED: 답변완료) */
    inquiryStatus?: InquiryStatusType;
    /** 1:1 문의 상태 복수개 지정 (ISSUED(ASKED-이전버전 호환용): 답변대기, IN_PROGRESS: 답변 진행중, ANSWERED: 답변완료) */
    inquiryStatuses?: InquiryStatusType[];
    /** 조회기간 시작시간 (Example : YYYY-MM-DD) */
    startYmd?: string;
    /** 조회기간 종료시간 (Example : YYYY-MM-DD) */
    endYmd?: string;
    /** 검색어 */
    keyword?: string;
    /** 검색 타입 (ALL: 전체, TITLE: 제목, CONTENT: 내용) */
    searchType?: InquirySearchType;
}

export interface GetInquiriesItem extends Omit<GetInquiryResponse, 'answer'> {
    answer: Nullable<Omit<InquiryAnswer, 'files'>>;
}

export type GetInquiriesResponse = ItemList<GetInquiriesItem>;

export interface WriteInquiryData {
    /** 원본 파일명 (nullable) */
    originalFileName?: string[];
    /** 답변 등록시 메일 수신여부 (false: 수신 안함, true: 수신함) (nullable) */
    answerEmailSendYn?: boolean;
    /** 업로드 된 파일명 (nullable) */
    uploadedFileName?: string[];
    /** 주문번호 (nullable) */
    orderNo?: string;
    /** 답변 등록시 SMS 수신여부 (false: 수신 안함, true: 수신함) (nullable) */
    answerSmsSendYn?: boolean;
    /** 비회원 등록 시 작성자 휴대폰 번호 (nullable) */
    mobileNo?: string;
    /** 캡챠서비스 키(미사용 변수, 추후 사용예정) */
    captcha?: string;
    /** 1:1 문의 제목 (최대길이 : 400) */
    inquiryTitle?: string;
    /**
     * 1:1 문의 유형 번호
     *  - 어드민에서 등록한 1:1 문의유형은 GET /malls 몰 정보 조회하기 API 호출 시,
     *  - 응답값 내 inquiryType에서 inquiryTypeNo(1:1문의 유형번호) 항목 정보를 확인 가능합니다.
     */
    inquiryTypeNo?: number;
    /** 1:1 문의 내용 (최대길이 : 16,700,000) */
    inquiryContent?: string;
    /** 주문옵션번호 (nullable) */
    orderOptionNo?: number;
    /** 비회원 등록 시 작성자 이메일 주소 (nullable) */
    email?: string;
    /** 상품번호 (nullable) */
    productNo?: number;
}

export interface WriteInquiryResponse {
    /** 1:1문의 일련번호 */
    inquiryNo: number;
}

export interface GetInquiryConfigResponse {
    /** 답글 작성 허용 여부 (false: 작성 미허용, true: 작성 허용) */
    replyUsed: boolean;
    /** 비회원 글 작성 허용 여부 (false: 작성 미허용, true: 작성 허용) */
    guestPostingUsed: boolean;
    /** 게시판 설명 */
    description: string;
    /** 회원 글 작성 허용 여부 (false: 작성 미허용, true: 작성 허용) */
    memberPostingUsed: boolean;
    /** 게시판 사용 여부 */
    used: boolean;
    /** 답변완료 Email 템플릿 사용 여부 (false: 템플릿 미사용, true: 템플릿 사용) */
    answerMailTemplateUsed: boolean;
    /** 게시판 리스트 이미지 유형 */
    imageDisplayType: ImageDisplayType;
    /** 답변완료 SMS 템플릿 사용 여부 (false: 템플릿 미사용, true: 템플릿 사용) */
    answerSmsTemplateUsed: boolean;
    /** 게시판 유형 */
    displayType: BoardDisplayType;
    /** 첨부파일 게시 허용 여부 (false: 첨부 미허용, true: 첨부 허용) */
    attachmentUsed: boolean;
    /** 게시판 이름 */
    name: string;
    /** 비밀글 작성 허용 여부 (false: 작성 미허용, true: 작성 허용) */
    secretPostingUsed: boolean;
    /** Email 사용 여부 (false: Email 미사용, true: Email 사용) */
    emailUsed: boolean;
    /** SMS 사용 여부 (false: SMS 미사용, true: SMS 사용) */
    smsUsed: boolean;
}

export interface GetInquiryTypesParams {
    /** 정렬방식 (ADMIN: 서비스 어드민에서 정렬한 순서, CREATED_ASC: 최초 등록순, CREATED_DESC: 최신 등록순)*/
    direction: InquiryDirection;
}

export type GetInquiryTypesResponse = {
    /** 1:1문의 유형 설명 */
    inquiryTypeDescription: string;
    /** 1:1문의 유형 번호 */
    inquiryTypeNo: number;
    /** 1:1문의 유형 서비스 어드민 정렬 순서 */
    displayOrder: number;
    /** 1:1문의 유형 이름 */
    inquiryTypeName: string;
}[];

export type GetInquiryResponse = InquiryInfo;

export interface UpdateInquiryData {
    /** 원본 파일명 */
    originalFileName: Nullable<string[]>;
    /** 1:1 문의 제목 (최대길이 : 400) */
    inquiryTitle: string;
    /** 답변 등록시 메일 수신여부 (false: 수신 안함, true: 수신함) (nullable) */
    answerEmailSendYn: boolean;
    /** 업로드 된 파일명 */
    uploadedFileName: Nullable<string[]>;
    /** 답변 등록시 SMS 수신여부 (false: 수신 안함, true: 수신함) (nullable) */
    answerSmsSendYn: boolean;
    /** 1:1 문의 내용 (최대길이 : 16,700,000) */
    inquiryContent: string;
}

export interface DownloadInquiryFileParams {
    /** 업로드한 파일이름 */
    uploadedFileName: string;
    /** 파일 다운로드 타입(INQUIRY: 일대일 문의, INQUIRY_ANSWER: 일대일 문의 답변) */
    type: InquiryFileType;
}
