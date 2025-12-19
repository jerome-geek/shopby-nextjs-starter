import {
    AccumulationReasonType,
    AccumulationReserveReasonType,
    AccumulationStatusGroupType,
    AccumulationStatusType,
    ArticleRegisterType,
    DisplayStatusType,
    ImageDisplayType,
    InquiryStatusType,
    OrderDirectionType,
} from '@/models';

type PAGE_TYPE =
    | 'MAIN'
    | 'COMMON_HEAD'
    | 'COMMON_FOOTER'
    | 'PRODUCT'
    | 'PRODUCT_LIST'
    | 'PRODUCT_SEARCH'
    | 'CART'
    | 'ORDER'
    | 'ORDER_DETAIL'
    | 'ORDER_COMPLETE'
    | 'DISPLAY_SECTION'
    | 'MEMBER_JOIN_COMPLETE'
    | 'MYPAGE';

export type PAGE_TYPES =
    | `${PAGE_TYPE}`
    | `${PAGE_TYPE},${PAGE_TYPE}`
    | `${PAGE_TYPE},${PAGE_TYPE},${PAGE_TYPE}`;

export type SearchType = 'ALL' | 'TITLE' | 'CONTENT' | 'WRITER';

export interface ImagesType {
    /** 원본 파일명 (최대 길이 100자, 업로드 파일 최대 개수: 10) */
    originalFileName: string;
    /** 업로드 된 파일명 (최대 길이 500자, 업로드 파일 최대 개수: 10) */
    uploadedFileName: string;
}

export type DisplayType = 'LIST' | 'CARD' | 'REPLY' | 'INQUIRY';

export type PostDirection = 'DESC' | 'ASC' | 'RECOMMEND_COUNT' | 'READ_COUNT';

export type ModifierType = 'MEMBER' | 'ADMIN' | 'GUEST' | 'DEVELOPER';

export interface InquiryType {
    inquiryTypeNo: number;
    inquiryTypeName: string;
    inquiryTypeDescription: string;
}

export interface File {
    originalFileName: string;
    uploadedFileName: string;
}

export interface BoardCategory {
    /** 게시판 카테고리 번호 */
    categoryNo: number;
    /** 카테고리 명칭1  ` */
    label: string;
}

export interface ReplyList extends ArticleDetail {
    /** 회원 아이디 */
    memberId: string;
    /** 해당 게시글 본인 추천 여부 */
    recommended: boolean;
    /** 게시글 신고 누적 횟수 */
    reportCount: number;
    /** 게시글 전시 상태 (전시중: DISPLAY, 차단: BLIND) */
    displayStatusType: DisplayStatusType;
}

export interface ArticleDetail {
    /** 수정자 번호(nullable) */
    modifierNo: number;
    /** 댓글 여부(false: 댓글 미존재, true: 댓글 존재) */
    replied: boolean;
    /** 최종 수정일(nullable) */
    modifyYmdt: string;
    /** 카테고리 명 */
    categoryLabel: string;
    /** 최초 등록자 타입 */
    registerType: ArticleRegisterType;
    /** 제목 */
    title: string;
    /** 비밀글 여부(false: 공개글, true: 비밀글)  */
    secreted: boolean;
    /** 수정자 타입 (nullable)  */
    modifierType: ArticleRegisterType;
    /** 내용 */
    content: string;
    /** 게시글 번호  */
    articleNo: number;
    tags: (boolean | string | number)[];
    /** 최초 등록자 번호(nullable) */
    registerNo: number;
    /** 댓글 수 */
    repliedCnt: number;
    /** 추천수 */
    recommendCount: number;
    /** 조회수 */
    viewCnt: number;
    /** 이미지 URL */
    imageUrl: string;
    /** 파일 첨부 여부 (false: 첨부파일 미존재, true: 첨부파일 존재)  */
    attached: boolean;
    /** 카테고리 번호  */
    categoryNo: number;
    /** 최종 수정자명(nullable) */
    modifierName: string;
    /** 수정 가능 여부  */
    modifiable: boolean;
    /** 최초 등록자명 */
    registerName: string;
    /** 공지 여부(false: 일반글, true: 공지글)  */
    notice: boolean;
    /** 최초 등록일  */
    registerYmdt: string;
}

export interface BoardDetail {
    /** 첨부파일 목록 */
    attachments: Attachment[];
    /** 최종 수정일 */
    modifyYmdt: string;
    /** 카테고리 명 */
    categoryLabel: string;
    /** 최초 등록자 타입 */
    registerType: ArticleRegisterType;
    /** 제목 */
    title: string;
    /** 최종 수정자 타입 (nullable) */
    modifierType: ArticleRegisterType;
    /** 본문 */
    content: string;
    /** 게시글 번호  */
    articleNo: number;
    // TODO: 체크필요
    /** 답글 리스트 */
    childArticles: BoardDetail[];
    /** 조회수 */
    viewCnt: number;
    /** 이미지 URL */
    imageUrl: string;
    /** 카테고리 번호  */
    categoryNo: number;
    // TODO: 체크필요
    /** 부모 게시글 */
    parentArticle: any;
    /** 수정가능 여부 (false: 수정 불가능, true: 수정 가능) */
    modifiable: boolean;
    /** 공지글 여부 (false: 일반글, true: 공지글) */
    notice: boolean;
    /** 작성자 아이디 */
    memberId: string;
    /** 최초 등록일 */
    registerYmdt: string;
    /** 추천가능여부 */
    recommendable: boolean;
    /** 최종 수정자 번호 (nullable) */
    modifierNo: Nullable<number>;
    /** 비밀글 여부 (false: 공개글, true: 비밀글) */
    secreted: boolean;
    /** 태그 */
    tags: (boolean | string | number)[];
    /** 최초 등록자 소속명 */
    registerGroupNames: string;
    /** 추천 수 */
    recommendCount: number;
    /** 최종 수정자명 */
    modifierName: string;
    /** 최초 등록자명 */
    registerName: string;
}

export interface Attachment {
    fileName: string;
    uploadedFileName: string;
    downloadFileUrl: string;
}

// 1:1 문의 유형 목록
export interface InquiryType {
    /** 1:1문의 유형 번호 */
    inquiryTypeNo: number;
    /** 1:1문의 유형 이름 */
    inquiryTypeName: string;
    /** 1:1문의 유형 설명 */
    inquiryTypeDescription: string;
}

export interface InquiryInfo {
    /** 답변 등록시 SMS 수신 여부 (false: 수신 안함, true: 수신함) */
    answerSmsSend: boolean;
    /** 1:1문의 유형 */
    inquiryType: {
        /** 1:1문의 유형 번호 */
        inquiryTypeNo: number;
        /** 1:1문의 유형 이름 */
        inquiryTypeName: string;
        /** 1:1문의 유형 설명 */
        inquiryTypeDescription: string;
    };
    /** 주문번호(nullable) */
    orderNo: Nullable<string>;
    /** 답변 등록시 메일 수신 여부(false: 수신 안함, true: 수신함) */
    answerEmailSend: boolean;
    /** 1:1 문의자 이름 */
    issuerName: string;
    /** 원본 이미지 url */
    originalImageUrls: string[];
    /** 답변 상태 (ISSUED(ASKED-이전버전 호환용): 답변대기, IN_PROGRESS: 답변 진행중, ANSWERED: 답변완료) */
    inquiryStatus: InquiryStatusType;
    /** 상품명 (nullable) */
    productName?: Nullable<string>;
    /** 등록인 번호 (nullable) */
    registerNo?: Nullable<number>;
    /** 문의 제목 */
    inquiryTitle: string;
    /** 1:1문의 답변 (nullable) */
    answer?: Nullable<InquiryAnswer>;
    /** 이미지 url */
    imageUrls: string[];
    /** 문의 내용 */
    inquiryContent: string;
    /** 영문 상품명 (nullable) */
    productNameEn?: Nullable<string>;
    /** 주문옵션번호 (nullable) */
    orderOptionNo?: Nullable<number>;
    /** 상품번호 (nullable) */
    productNo?: Nullable<number>;
    /** 등록일 (example: YYYY-MM-DD HH:mm:ss) */
    registerYmdt: string;
    /** 1:1문의 번호 */
    inquiryNo: number;
}

export interface InquiryAnswer {
    /** 답변 일자 (nullable) */
    answerRegisterYmdt?: string;
    /** 답변 내용 (nullable) */
    answerContent?: string;
    /** 답변 번호 (nullable) */
    answerNo?: number;
    /** 파일 목록 */
    files: File[];
}
