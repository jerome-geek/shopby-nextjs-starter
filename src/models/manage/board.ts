import {
    ArticleRegisterType,
    AuthorityConfigType,
    BoardAuthorityType,
    BoardDisplayType,
    DisplayStatusType,
    ImageDisplayType,
    OrderDirectionType,
    ProductInquiryReportType,
} from '@/models';
import {
    BoardCategory,
    DisplayType,
    ImagesType,
    ModifierType,
    PostDirection,
    SearchType,
} from '@/models/manage';

interface ProductBoardConfig {
    /** 게시판 리스트 이미지 유형 */
    imageDisplayType: ImageDisplayType;
    replyUsed: boolean;
    displayType: DisplayType;
    reviewAccumulation: {
        normalReview: {
            /** 텍스트 리뷰 지급 적립금 */
            amount: number;
            /** 텍스트 리뷰 지급 조건 (글자 수) */
            contentLength: number;
        };
        /** 상품후기 적립금 관련 설정 여부 (false: 후기 적립금 미설정, true: 후기 적립금 설정) */
        use: boolean;
        photoReview: {
            /** 포토 리뷰 지급 적립금 */
            amount: number;
            /** 포토 리뷰 지급 조건 (글자 수) */
            contentLength: number;
        };
    };
    /** 비회원 작성가능 여부 (false: 비회원 작성 불가능, true: 비회원 작성가능) */
    guestPostingUsed: boolean;
    /** 첨부파일 사용 여부 (false: 첨부파일 미사용, true: 첨부파일 사용) */
    attachmentUsed: boolean;
    /** 게시판 이름 */
    name: string;
    /** 비밀글 작성가능 여부 (false: 비밀글 작성 불가능, true: 비밀글 작성가능) */
    secretPostingUsed: boolean;
    /** 회원 작성가능 여부 (false: 회원 작성 불가능, true: 회원 작성가능) */
    memberPostingUsed: boolean;
    /** 사용여부 (false: 미사용, true: 사용) */
    used: boolean;
}

type ProductInquiryConfig = Omit<ProductBoardConfig, 'reviewAccumulation'>;

export interface BoardConfigs {
    /** 답글작성 가능 여부 (false: 답글 작성 불가능, true: 답글 작성가능) */
    replyUsed: boolean;
    /** 썸네일 여부 (false: 썸네일 미존재, true: 썸네일 존재) */
    thumbnailUsed: boolean;
    /** 작성자 표시방법 (nullable) */
    writerDisplayType: AuthorityConfigType;
    /** 비회원 작성가능 여부 (false: 비회원 작성 불가능, true: 비회원 작성가능) */
    guestPostingUsed: boolean;
    /** 사용여부 (false: 미사용, true: 사용) */
    used: boolean;
    /** 회원 작성가능 여부 (false: 회원 작성 불가능, true: 회원 작성가능) */
    memberPostingUsed: boolean;
    /** 게시판 리스트 이미지 유형 */
    imageDisplayType: ImageDisplayType;
    /** 게시판 유형 */
    displayType: BoardDisplayType;
    /** 카테고리 사용 여부 (false: 카테고리 미사용, true: 카테고리 사용) */
    categoryUsed: boolean;
    /** 첨부파일 사용 여부 (false: 첨부파일 미사용, true: 첨부파일 사용) */
    attachmentUsed: boolean;
    /** 게시판 이름 */
    name: string;
    /** 비밀글 작성가능 여부 (false: 비밀글 작성 불가능, true: 비밀글 작성가능) */
    secretPostingUsed: boolean;
    /** 게시판 ID */
    boardId: string;
    categories: {
        /** 카테고리 번호 */
        categoryNo: number;
        /** 카테고리 이름 */
        label: string;
    }[];
    /** 게시판 권한 설정 */
    authorityConfig: AuthorityConfig;
    /** 게시판 순서 */
    order: number;
    /** 게시판 번호 */
    boardNo: number;
}

export interface AuthorityConfig {
    /** 게시판 읽기 권한 설정 (nullable) */
    boardReadConfig: Nullable<BoardAuthority>;
    /** 게시글 읽기 권한 설정 (nullable) */
    postReadConfig: Nullable<BoardAuthority>;
    /** 게시글 쓰기 권한 설정 (nullable) */
    postWriteConfig: Nullable<BoardAuthority>;
    /** 답글 읽기 권한 설정 (nullable) */
    replyPostReadConfig: Nullable<BoardAuthority>;
    /** 답글 쓰기 권한 설정 (nullable) */
    replyPostWriteConfig: Nullable<BoardAuthority>;
}

/** 게시판 권한 설정 */
export interface BoardAuthority {
    /** 권한 타입 */
    type: BoardAuthorityType;
    /** 회원 그룹번호 (nullable) */
    groupNos: number[];
    /** 회원 등급번호 (nullable) */
    gradeNos: number[];
}

interface InquiryConfig extends ProductInquiryConfig {
    /** 게시판 설명 */
    description: string;
    /** 답변완료 Email 템플릿 사용 여부 (false: 템플릿 미사용, true: 템플릿 사용) */
    answerMailTemplateUsed: boolean;
    /** 답변완료 SMS 템플릿 사용 여부 (false: 템플릿 미사용, true: 템플릿 사용) */
    answerSmsTemplateUsed: boolean;
    /** Email 사용 여부 (false: Email 미사용, true: Email 사용) */
    emailUsed: boolean;
    /** SMS 사용 여부 (false: SMS 미사용, true: SMS 사용) */
    smsUsed: boolean;
}

export interface GetBoardConfigResponse {
    /** 상품 후기 게시판 설정 (샵바이 프로인 경우만 값이 있음) */
    productReviewConfig: ProductBoardConfig;
    /** 상품 문의 게시판 설정 */
    productInquiryConfig: ProductInquiryConfig;
    /** 일반 게시판 설정 */
    boardConfigs: BoardConfigs[];
    /** 1:1문의 게시판 설정 */
    inquiryConfig: InquiryConfig;
}

export interface GetPostListParams {
    /** 페이지 번호 (default:1) */
    page: number;
    /** 한 페이지당 노출 수 (default:10) */
    pageSize: number;
}

export interface GetPostListData {
    /** 비밀글 조회 여부(null: 공개+비밀 게시글 전체 조회(default), false: 공개 게시글만 조회, true: 비밀 게시글만 조회) (nullable) */
    isSecreted?: boolean;
    /** 본인이 스크랩한 게시글만 조회 여부(false: 전체 조회(default), true: 스크랩한 게시글만 조회) (nullable) */
    myScrapedOnly?: boolean;
    /** 검색유형 (ALL: 전체, TITLE: 제목, CONTENT: 내용, WRITER: 작성자) (nullable) */
    searchType?: string;
    /** 게시판 번호 Or 게시판 Id (nullable) */
    boardNoOrId?: string;
    /** 조회일 종료일(yyyy-MM-dd HH:mm:ss) (nullable) */
    endYmdt?: string;
    /** 차단된 게시글 스킵 여부(false: 차단된 게시글을 포함하여 조회(default), true: 차단된 게시글을 제외하고 조회 ) (nullable) */
    skipBlinded?: boolean;
    /** 본인이 추천한 게시글만 조회 여부(false: 전체 조회(default), true: 추천한 게시글만 조회) (nullable) */
    myRecommendOnly?: boolean;
    /** 조회일 시작일(yyyy-MM-dd HH:mm:ss) (nullable) */
    startYmdt?: string;
    /** 회원 번호 (nullable) */
    memberNos?: number[];
    /** 게시판 카테고리 (nullable) */
    categoryNo?: number;
    /** 본인이 작성한 글만 조회 여부(false: 전체 조회(default), true: 본인 글만 조회) (nullable) */
    isMine?: boolean;
    /** 검색어 (nullable) */
    keyword?: string;
    /** 공지글 조회 여부(null: 공지+일반 게시글 전체 조회(default), false: 일반 게시글만 조회, true: 공지글만 조회 (nullable) */
    isNoticed?: boolean;
    /** 게시글 검색용 태그 (nullable) */
    postSearchTags?: (string | number)[];
    /** 회원 그룹번호 (nullable) */
    memberGroupNo?: number;
    /** 정렬방식(DESC: 최신 순(default), ASC: 오래된 순, RECOMMEND_COUNT: 추천수 많은 순, READ_COUNT: 조회수 많은 순) (nullable) */
    direction?: PostDirection;
}

export interface PostItem {
    /** 최종 수정일 (nullable) */
    modifyYmdt: Nullable<string>;
    /** 카테고리 명 (nullable) */
    categoryLabel: Nullable<string>;
    /** 최초 등록자 타입 (MEMBER: 회원, ADMIN: 운영자, GUEST: 비회원, DEVELOPER: 워크스페이스 운영자(셀러어드민 이용자)) (nullable) */
    registerType: Nullable<string>;
    /** 게시글 신고 누적 횟수 */
    reportedCnt: number;
    /** 제목 (nullable) */
    title: Nullable<string>;
    /** 최종 수정자 타입 (MEMBER: 회원, ADMIN: 운영자, GUEST: 비회원, DEVELOPER: 워크스페이스 운영자(셀러어드민 이용자)) (nullable) */
    modifierType: ModifierType;
    /** 최초 등록자 번호 (nullable) */
    registerNo?: number;
    /** 조회수 */
    viewCnt: number;
    /** 이미지 URL (nullable) */
    imageUrl: Nullable<string>;
    /** 본인의(회원) 게시글 신고 여부 */
    reported: boolean;
    /** 카테고리 번호 (nullable) */
    categoryNo: number;
    // TO CHECK: API 문서에 나와있지 않음
    parentArticle: PostItem;
    /** 수정가능 여부 (false: 수정 불가능, true: 수정 가능) */
    modifiable: boolean;
    /** 최초 등록일 (nullable) */
    registerYmdt: Nullable<string>;
    /** 검색용 게시글 태그 */
    postSearchTags: string[];
    /** 게시판 번호 */
    boardNo: number;
    /** 본인의(회원) 스크랩 여부 */
    scraped: boolean;
    /** 최종 수정자 번호 (nullable) */
    modifierNo: Nullable<number>;
    /** 공지글 여부 (false: 일반글, true: 공지글) */
    noticed: boolean;
    /** 비밀글 여부 (false: 공개글, true: 비밀글) */
    secreted: boolean;
    /** 추천 수 */
    recommendedCnt: number;
    /** 태그 */
    tags: (string | number)[];
    /** 본인의(회원) 추천 여부 */
    recommended: boolean;
    /** 게시글 번호 */
    postNo: number;
    /** 해당 게시글에 답글 개수 */
    repliedCnt: number;
    /** 첨부파일 존재 여부 */
    attached: boolean;
    /** 최종 수정자명 (nullable) */
    modifierName: Nullable<string>;
    /** 최초 등록자명 (nullable) */
    registerName: Nullable<string>;
    /** 게시글 전시 상태 (전시중: DISPLAY, 차단: BLIND) */
    displayStatusType: DisplayStatusType;
    /** 회원 그룹번호 (nullable) */
    memberGroupNo: Nullable<number>;
}

export type GetPostListResponse = ItemList<PostItem>;

export interface GetArticleListParams extends Paging {
    /** 검색어 */
    keyword?: string;
    /** 검색 유형 */
    searchType?: SearchType;
    /** 게시판 카테고리 */
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
    /** 본인이 추천한 게시글만 조회 여부(false: 전체 조회(default), true: 추천한 게시글만 조회) */
    myRecommendOnly?: boolean;
    /** 본인이 해당 게시글을 추천했는지 여부(false: 본인 추천 포함x(default), true: 본인 추천 포함) */
    includeRecommended?: boolean;
    /** 공지글 조회 여부(null: 공지+일반 게시글 전체 조회(default), false: 일반 게시글만 조회, true: 공지글만 조회 */
    isNoticed?: boolean;
    /** (개발중) 비밀글 조회 여부(null: 공개+비밀 게시글 전체 조회(default), false: 공개 게시글만 조회, true: 비밀 게시글만 조회) */
    isSecreted?: boolean;
}

export type GetArticleListResponse = ItemList<ArticleInfo>;

export interface ArticleInfo {
    /** 답글 여부 (false: 답글 미존재, true: 답글 존재) */
    replied: boolean;
    /** 최종 수정일 (nullable) */
    modifyYmdt: Nullable<string>;
    /** 카테고리 명 */
    categoryLabel: string;
    /** 최초 등록자 타입 */
    registerType: ArticleRegisterType;
    /** 제 */
    title: string;
    /** 수정자 타입 (nullable) */
    modifierType: Nullable<ArticleRegisterType>;
    /** 내 */
    content: string;
    /** 게시글 번호 */
    articleNo: number;
    /** 최초 등록자 번호 (nullable) */
    registerNo: Nullable<number>;
    /** 조회수 */
    viewCnt: number;
    /** 이미지 URL */
    imageUrl: string;
    /** 게시글 신고 여부 */
    reported: boolean;
    /** 카테고리 번호 */
    categoryNo: Nullable<number>;
    /** 수정 가능 여부 */
    modifiable: boolean;
    /** 회원 아이디 */
    memberId: string;
    /** 공지 여부 (false: 일반글, true: 공지글) */
    notice: boolean;
    /** 최초 등록일 */
    registerYmdt: string;
    /** 수정자 번호 (nullable) */
    modifierNo: Nullable<number>;
    /** 비밀글 여부 (false: 공개글, true: 비밀글) */
    secreted: boolean;
    /** 답글 존재 여부(ture: 답글 존재, false: 답글 없음) */
    hasReplies: boolean;
    /** 해당 게시글 본인 추천 여부 */
    recommended: boolean;
    /** 회원 이메일 */
    memberEmail: string;
    /** 태그 */
    tags: string[];
    /** 답글 수 */
    repliedCnt: number;
    /** 추천수 */
    recommendCount: number;
    /** 파일 첨부 여부 (false: 첨부파일 미존재, true: 첨부파일 존재) */
    attached: boolean;
    /** 게시글 신고 누적 횟수 */
    reportCount: number;
    /** 최종 수정자명 (nullable) */
    modifierName: Nullable<string>;
    /** 회원 닉네임 */
    memberNickname: string;
    /**  최초 등록자명 */
    registerName: string;
    /** 게시글 전시 상태 (전시중: DISPLAY, 차단: BLIND) */
    displayStatusType: DisplayStatusType;
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
    articleContent: string;
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

export type GetCategoriesResponse = BoardCategory[];

export interface GetArticleParams {
    /** 비회원 글 확인용 비밀번호 */
    password?: string;
    /** 답글도 리스트에 같이 조회할지 여부 (false: 답글 미포함, true: 답글 포함(default)) */
    withReplied?: boolean;
}

export interface GetArticleResponse {
    /** 첨부파일 목록 */
    attachments: {
        /** 원본 파일명 */
        fileName: string;
        /** 서버에 저장된 파일명 (downloadFileUrl과 동일한 값) */
        uploadedFileName: string;
        /** 다운로드 URL (uploadedFileName과 동일한 값) */
        downloadFileUrl: string;
    }[];
    /** 최종 수정일 */
    modifyYmdt: Nullable<string>;
    /** 카테고리 명 */
    categoryLabel: Nullable<string>;
    /** 최초 등록자 타입 */
    registerType: ArticleRegisterType;
    /** 제목 */
    title: Nullable<string>;
    /** 최종 수정자 타입 (nullable) */
    modifierType: ArticleRegisterType;
    /** 본문 */
    content: Nullable<string>;
    /** 게시글 번호 */
    articleNo: number;
    /** 답글 리스트 */
    childArticles: GetArticleResponse[];
    /** 최초 등록자 번호(nullable) */
    registerNo: Nullable<number>;
    /** 조회수 */
    viewCnt: number;
    /** 이미지 URL */
    imageUrl: string;
    /** 게시글 신고 여부 */
    reported: boolean;
    /** 카테고리 번호 */
    categoryNo: Nullable<number>;
    /** 부모 게시글 */
    parentArticle: GetArticleResponse;
    /** 수정가능 여부 (false: 수정 불가능, true: 수정 가능) */
    modifiable: boolean;
    /** 공지글 여부 (false: 일반글, true: 공지글) */
    notice: boolean;
    /** 작성자 아이디 */
    memberId: Nullable<string>;
    /** 최초 등록일 */
    registerYmdt: string;
    /** 추천가능여부 */
    recommendable: boolean;
    /** 최종 수정자 번호 (nullable) */
    modifierNo: Nullable<number>;
    /** 비밀글 여부 (false: 공개글, true: 비밀글) */
    secreted: Nullable<boolean>;
    /** 태그 */
    tags: (boolean | string | number)[];
    /** 최초 등록자 소속명 */
    registerGroupNames: Nullable<string>;
    /** 추천 수 */
    recommendCount: number;
    /** 게시글 신고 누적 횟수 */
    reportCount: number;
    /** 최종 수정자명 */
    modifierName: Nullable<string>;
    /** 회원 닉네임 */
    memberNickname: string;
    /** 최초 등록자명 */
    registerName: string;
    /** 게시글 전시 상태 (전시중: DISPLAY, 차단: BLIND) */
    displayStatusType: DisplayStatusType;
}

export type UpdateArticleData = Omit<PostArticleParams, 'parentBoardArticleNo'>;

export interface GetArticleV2Params {
    /** 비회원 글 확인용 비밀번호 */
    password?: string;
}

export interface GetArticleV2Response
    extends Omit<
        GetArticleResponse,
        | 'reportCount'
        | 'recommendCount'
        | 'notice'
        | 'memberId'
        | 'memberNickname'
    > {
    /** 게시글 신고 누적 횟수 */
    reportedCnt: GetArticleResponse['reportCount'];
    /** 추천 수 */
    recommendedCnt: GetArticleResponse['recommendCount'];
    /** 답글 작성 가능 여부 */
    replyEnabled: boolean;
    /** 회원 그룹번호 (nullable) */
    memberGroupNo: Nullable<number>;
    /** 공지글 여부 */
    noticed: GetArticleResponse['notice'];
}

export interface DeleteArticleData {
    /** 비회원용 게시글 작성 비밀번호 (nullable) */
    password?: string;
}

export interface GetRepliesByBoardNoParams extends Pick<Paging, 'pageSize'> {
    /** 페이지 번호 (default:1) */
    page: number;
    /** 본인이 해당 게시글을 추천했는지 여부(false: 본인 추천 포함x(default), true: 본인 추천 포함) */
    includeRecommended?: boolean;
    /** 정렬방식(ASC: 오래된 순, DESC: 최신 순, RECOMMEND_COUNT: 추천수 많은 순, READ_COUNT: 조회수 많은 순) */
    direction?: PostDirection;
}

export interface ReplyList extends ArticleInfo {
    /** 회원 아이디 */
    memberId: string;
    /** 해당 게시글 본인 추천 여부 */
    recommended: boolean;
    /** 게시글 신고 누적 횟수 */
    reportCount: number;
    /** 게시글 전시 상태 (전시중: DISPLAY, 차단: BLIND) */
    displayStatusType: DisplayStatusType;
}

export type GetRepliesByBoardNoResponse = ItemList<ReplyList>;

export interface ReportArticleData {
    /** 신고사유(저작권 침해: COPYRIGHT, 비방: SLANDER, ETC: 기타사유) */
    reportReasonType: ProductInquiryReportType;
    /** 신고 내용 */
    content: string;
}

export interface DownloadFileParams {
    /** 업로드한 파일이름 */
    uploadedFileName: string;
}

export type GetRepliesByBoardNoV2Params = Omit<
    GetRepliesByBoardNoParams,
    'includeRecommended'
>;

export type GetRepliesByBoardNoV2Response = ItemList<ReplyListItem>;

export interface ReplyListItem
    extends Omit<
        ReplyList,
        | 'articleNo'
        | 'memberId'
        | 'content'
        | 'replied'
        | 'hasReplies'
        | 'recommendCount'
        | 'reportCount'
        | 'notice'
        | 'memberNickname'
        | 'memberEmail'
    > {
    /** 게시글 번호 */
    postNo: number;
    /** 게시판 번호 */
    boardNo: number;
    /** 부모 게시글 (nullable) */
    parentArticle: Nullable<Record<string, any>>;
    /** 본인의(회원) 스크랩 여부 */
    scraped: boolean;
    /** 검색용 게시글 태그 */
    postSearchTags?: string[];
    /** 최초 등록일 (nullable) */
    registerYmdt: string;
    /** 게시글 신고 누적 횟수 */
    reportedCnt: number;
    /** 추천 수 */
    recommendedCnt: number;
    /** 공지글 여부 (false: 일반글, true: 공지글) */
    noticed: boolean;
    /** 비밀글 여부 (false: 공개글, true: 비밀글) */
    secreted: boolean;
    /** 회원 그룹번호 (nullable) */
    memberGroupNo?: number;
}
