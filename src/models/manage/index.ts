import {
    AccumulationStatusGroupType,
    ArticleRegisterType,
    InquiryStatusType,
    OrderDirectionType,
    AccumulationReasonType,
    AccumulationReserveReasonType,
    AccumulationStatusType,
    ImageDisplayType,
    DisplayStatusType,
    ProductInquiryReportType,
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

export interface GetArticleDetailParams {
    boardNo: string;
    articleNo: string;
    query?: {
        password?: string;
        withReplied?: boolean;
    };
}

export interface GroupByState {
    state: string;
    count: number;
}

export interface Item {
    address: string;
    detailAddress: string;
    roadAddress: string;
    roadAddressExtra: string;
    jibunAddress: string;
    relatedJibun: string;
    zipCode: string;
    oldZipCode: string;
}

export interface AddressResponse extends ItemList<Item> {
    groupByStates: GroupByState[];
}

export interface ArticleParams extends Paging {
    /** 검색어 */
    keyword?: string;
    /** 검색 유형 */
    searchType?: SearchType;
    /** 게시판 카테고리  */
    categoryNo?: number;
    /** 조회일 시작일(yyyy-MM-dd, default: 3개월) */
    startYmd?: string;
    /** 조회일 종료일(yyyy-MM-dd, default: 오늘) */
    endYmd?: string;
    /** 답글도 리스트에 같이 조회할지 여부 (false: 답글 미포함(default), true: 답글 포함) */
    withReplied?: boolean;
    /** 최신 순 정렬 여부 */
    direction?: OrderDirectionType;
    /** 본인이 작성한 글만 조회 여부(false: 전체 조회(default), true: 본인 글만 조회) */
    isMine?: boolean;
}

export interface ImagesType {
    /** 원본 파일명 (최대 길이 100자, 업로드 파일 최대 개수: 10) */
    originalFileName: string;
    /** 업로드 된 파일명 (최대 길이 500자, 업로드 파일 최대 개수: 10) */
    uploadedFileName: string;
}

export interface PostArticleParams {
    images?: ImagesType[];
    /** 비회원 글쓰기용 비밀번호 */
    password?: string;
    /** 게시글 제목 */
    articleTitle: string;
    /** 상위 게시글 번호 */
    parentBoardArticleNo?: number;
    /** 게시글 내용 */
    articleContent?: string;
    /** 카테고리 번호 */
    boardCategoryNo?: number;
    /** 비밀글 여부 (false: 공개글, true: 비밀글)  */
    secreted: boolean;
    /** 검색용 게시글 태그 (nullable) */
    postSearchTags: string[];
    /** 대표 이미지 (최대 길이 500자) */
    thumbnailUrl?: string;
    /** 태그목록 */
    tags?: string[];
    /** 비회원 작성자. 생략하면 '비회원'으로 노출. */
    guestName?: string;
}

export interface WriteInquiry {
    originalFileName?: string[];
    inquiryTitle?: string;
    answerEmailSendYn?: boolean;
    uploadedFileName?: string[];
    orderNo?: string;
    captcha?: string;
    inquiryTypeNo?: number;
    answerSmsSendYn?: boolean;
    inquiryContent?: string;
    email?: string;
    productNo?: number | string;
}

export interface InquiryConfigResponses {
    displayType: DisplayType;
    imageDisplayType: ImageDisplayType;
    used: boolean;
    name: string;
    description: string;
    memberPostingUsed: boolean;
    guestPostingUsed: boolean;
    secretPostingUsed: boolean;
    replyUsed: boolean;
    attachmentUsed: boolean;
    smsUsed: boolean;
    emailUsed: boolean;
    answerSmsTemplateUsed: boolean;
    answerMailTemplateUsed: boolean;
}

export type DisplayType = 'LIST' | 'CARD' | 'REPLY' | 'INQUIRY';

export type PostDirection = 'DESC' | 'ASC' | 'RECOMMEND_COUNT' | 'READ_COUNT';

export type ModifierType = 'MEMBER' | 'ADMIN' | 'GUEST' | 'DEVELOPER';

export interface DetailInquiryResponses {
    inquiryNo: number;
    orderNo: string;
    productNo: number;
    productName: string;
    inquiryTitle: string;
    inquiryContent: string;
    answerSmsSend: boolean;
    answerEmailSend: boolean;
    registerNo: number;
    registerYmdt: string;
    inquiryStatus: InquiryStatusType;
    inquiryType: InquiryType;
    answer: Answer;
    imageUrls: string[];
    originalImageUrls: string[];
    issuerName: string;
}

export interface InquiryType {
    inquiryTypeNo: number;
    inquiryTypeName: string;
    inquiryTypeDescription: string;
}

export interface Answer {
    answerNo: number;
    answerContent: string;
    files: File[];
    answerRegisterYmdt: string;
}

export interface File {
    originalFileName: string;
    uploadedFileName: string;
}

export interface UpdateInquiry
    extends Omit<
        WriteInquiry,
        'uploadedFileName' | 'originalFileName' | 'inquiryTypeNo'
    > {
    uploadedFileNames?: string[];
    originalFileNames?: string[];
}

export interface BoardCategory {
    categoryNo: number;
    label: string;
}

export interface BoardList {
    totalCount: number;
    items: BoardListItem[];
}

export interface BoardListItem {
    articleNo: number;
    attached: Attachment[];
    categoryLabel: string;
    categoryNo: number;
    imageUrl: string;
    modifierName: string;
    modifierNo: null;
    modifierType: null;
    modifyYmdt: null;
    notice: boolean;
    recommendCount: number;
    recommendable: boolean;
    registerName: string;
    registerNo: number;
    registerType: string;
    registerYmdt: Date;
    replied: boolean;
    repliedCnt: number;
    secreted: boolean;
    tags: string[];
    title: string;
    viewCnt: number;
}

export interface ReplyParams extends Paging {
    /** 페이지 번호 (default:1) */
    page: number;
    /** 본인이 해당 게시글을 추천했는지 여부(false: 본인 추천 포함x(default), true: 본인 추천 포함) */
    includeRecommended?: boolean;
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

export interface BoardDetailState {
    boardNo: string;
    articleNo: string;
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

export interface InquiriesResponse {
    totalCount: number;
    items: InquiryItem[];
}

export interface InquiryItem {
    inquiryNo: number;
    orderNo: string;
    productNo: number;
    productName: string;
    inquiryTitle: string;
    inquiryContent: string;
    answerSmsSend: boolean;
    answerEmailSend: boolean;
    registerNo: number;
    registerYmdt: string;
    inquiryStatus: InquiryStatusType;
    inquiryType: InquiryType;
    answer: Answer;
    imageUrls: any[];
    originalImageUrls: any[];
    issuerName: string;
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

export interface Answer {
    answerNo: number;
    answerContent: string;
    answerRegisterYmdt: string;
}

export interface GetAccumulationListParams extends Paging, SearchDate {
    accumulationReason?: AccumulationReasonType;
    direction?: OrderDirectionType;
}

export interface GetAccumulationListResponse {
    /** 회원 번호 */
    memberNo: number;
    /** 적립 총액 */
    totalAmt: number;
    /** 전체 카운트 */
    totalCount: number;
    items: AccumulationHistory[];
}

export interface AccumulationHistory {
    /** 만료일 */
    expireYmdt: string;
    /** 주문번호 */
    orderNo: string;
    /** 적립금 번호 */
    accumulationNo: number;
    /** 맵핑 키(외부 적립금 사용 시에만 사용함) */
    mappingKey: string;
    /** 잔여 적립금 */
    accumulationRestAmt: number;
    /** 적립사유 코드 */
    accumulationReserveReason: AccumulationReserveReasonType;
    /** 적립사유 코드 표시명 */
    accumulationReserveReasonDisplay: string;
    /** 시작일 */
    startYmdt: string;
    /** 적립사유 상세 */
    reasonDetail: string;
    /** 적립금 총액 */
    totalAvailableAmt: number;
    /** 적립 지급/차감 구분 코드 */
    accumulationStatusGroupType: AccumulationStatusGroupType;
    /** 적립금액 */
    accumulationAmt: number;
    /** 적립상태 코드 */
    accumulationStatus: AccumulationStatusType;
    /** 등록일 */
    registerYmdt: string;
}

export interface GetAccumulationSummaryResponse {
    /** 사용가능한 총 적립금액 */
    totalAvailableAmt: number;
    /** 만료조회 총 적립금액 */
    totalExpireAmt: number;
}

export interface ReportArticleData {
    reportReasonType: ProductInquiryReportType;
    content: string;
}
