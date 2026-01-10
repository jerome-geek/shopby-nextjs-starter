import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import {
    ReportArticleData,
    PostArticleParams,
    DeleteArticleData,
    DownloadFileParams,
    GetArticleListParams,
    GetArticleListResponse,
    GetArticleParams,
    GetArticleResponse,
    GetArticleV2Response,
    GetBoardConfigResponse,
    GetCategoriesResponse,
    GetPostListData,
    GetPostListParams,
    GetPostListResponse,
    GetRepliesByBoardNoParams,
    GetRepliesByBoardNoResponse,
    GetRepliesByBoardNoV2Params,
    GetRepliesByBoardNoV2Response,
    UpdateArticleData,
    GetArticleV2Params,
} from '@/models/manage/board';

const board = {
    /**
     * 게시판 설정 조회하기
     *  - 전체 게시판의 설정정보를 조회하는 API 입니다
     */
    getConfig: (options?: Options) => {
        return request.get<GetBoardConfigResponse>('boards/configurations', {
            ...options,
        });
    },

    /**
     * 게시글 리스트 조회하기(버전 2)
     *  - 특정 게시판(게시판 번호 기준) or 몰 단위의 게시글 리스트를 조회하는 API version2 입니다.
     *  - Request Body에 boardNoOrId값을 null 보낼 시 몰 단위로 게시글 리스트를 검색할 수 있습니다.
     */
    getPostList: (
        params?: GetPostListParams,
        data?: GetPostListData,
        options?: Options
    ) => {
        return request.post<GetPostListResponse>('boards/posts', {
            json: data,
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 게시글 리스트 조회하기
     *  - 특정 게시판(게시판 번호 기준)의 게시글 리스트를 조회하는 API 입니다
     */
    getArticleList: (
        boardNo: string,
        params?: GetArticleListParams,
        options?: Options
    ) => {
        return request.get<GetArticleListResponse>(
            `boards/${boardNo}/articles`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 게시글 작성하기
     *  - 게시글을 작성하는 API 입니다
     */
    writeArticle: (
        boardNo: string,
        data: PostArticleParams,
        options?: Options
    ) => {
        return request.post(`boards/${boardNo}/articles`, {
            json: data,
            ...options,
        });
    },

    /**
     * 게시판 카테고리 목록 조회하기
     *  - 특정 게시판(게시판 번호 기준)의 카테고리를 조회하는 API 입니다
     */
    getCategories: (boardNo: string, options?: Options) => {
        return request.get<GetCategoriesResponse>(
            `boards/${boardNo}/categories`,
            {
                ...options,
            }
        );
    },

    /**
     * 게시글 스크랩
     */
    scrapPost: (postNo: string, options?: Options) => {
        return request.post(`boards/post/scrap/${postNo}`, {
            ...options,
        });
    },

    /**
     * 게시글 스크랩 취소
     */
    cancelScrapPost: (postNo: string, options?: Options) => {
        return request.delete(`boards/post/scrap/${postNo}`, {
            ...options,
        });
    },

    /**
     * 게시글 상세 조회하기
     *  - 특정 게시글(게시글 번호 기준)을 상세 조회하는 API 입니다
     */
    getArticle: (
        boardNo: string,
        articleNo: number,
        params?: GetArticleParams,
        options?: Options
    ) => {
        return request.get<GetArticleResponse>(
            `boards/${boardNo}/articles/${articleNo}`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 게시글 수정하기
     *  - 특정 게시글(게시글 번호 기준)을 수정하는 API 입니다
     *  - 첨부파일은 최대 10개까지 업로드 가능합니다
     */
    updateArticle: (
        boardNo: string,
        articleNo: number,
        data?: UpdateArticleData,
        options?: Options
    ) => {
        return request.put(`boards/${boardNo}/articles/${articleNo}`, {
            json: data,
            ...options,
        });
    },

    /**
     * 게시글 삭제하기
     *  - 특정 게시글(게시글 번호 기준)을 삭제하는 API 입니다
     *  - 비회원으로 작성한 경우, 해당 게시글 작성 비밀번호를 전달해야 합니다
     */
    deleteArticle: (
        boardNo: string,
        articleNo: number,
        data?: DeleteArticleData,
        options?: Options
    ) => {
        return request.delete(`boards/${boardNo}/articles/${articleNo}`, {
            json: data,
            ...options,
        });
    },
    /**
     * 게시글 상세 조회하기(버전2)
     *  - 특정 게시글(게시글 번호 기준)을 상세 조회하는 Version2 API 입니다. 해당 api에서는 서비스 어드민의 게시판 권한 설정이 적용됩니다.
     *  - imageUrl은 게시글 작성하기 API의 thumbnailUrl과 동일합니다.
     *  - attachments는 게시글 작성하기 API의 images와 동일합니다.
     */
    getArticleV2: (
        boardNo: string,
        postNo: number,
        params?: GetArticleV2Params,
        options?: Options
    ) => {
        return request.get<GetArticleV2Response>(
            `boards/${boardNo}/posts/${postNo}`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 게시글 수정가능 여부 확인하기
     *  - 특정 게시글(게시글 번호 기준)의 수정가능 여부를 확인하는 API 입니다
     *  - 비회원으로 작성한 경우, 해당 게시글 작성 비밀번호를 전달해야 합니다
     */
    checkEditableArticle: (
        boardNo: string,
        articleNo: number,
        data?: DeleteArticleData,
        options?: Options
    ) => {
        return request.put(`boards/${boardNo}/articles/${articleNo}/editable`, {
            json: data,
            ...options,
        });
    },

    /**
     * 게시글 추천
     */
    recommendArticle: (
        boardNo: string,
        articleNo: number,
        options?: Options
    ) => {
        return request.post(
            `boards/${boardNo}/articles/${articleNo}/recommend`,
            {
                ...options,
            }
        );
    },
    /**
     * 게시글 추천 취소
     */
    cancelArticleRecommend: (
        boardNo: string,
        articleNo: number,
        options?: Options
    ) => {
        return request.delete(
            `boards/${boardNo}/articles/${articleNo}/recommend`,
            {
                ...options,
            }
        );
    },

    /**
     * 게시글 답글 리스트 조회하기
     *  - 특정 게시판(게시판 번호 기준)의 게시글 리스트를 조회하는 API 입니다.
     */
    getRepliesByBoardNo: (
        boardNo: string,
        articleNo: number,
        params?: GetRepliesByBoardNoParams,
        options?: Options
    ) => {
        return request.get<GetRepliesByBoardNoResponse>(
            `boards/${boardNo}/articles/${articleNo}/replies`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 게시글 신고하기
     *  - 특정 게시글을 신고하는 API 입니다.
     */
    reportArticle: (
        boardNo: string,
        articleNo: number,
        data: ReportArticleData,
        options?: Options
    ) => {
        return request.post(`boards/${boardNo}/articles/${articleNo}/report`, {
            json: data,
            ...options,
        });
    },

    /**
     *  게시글 신고 취소
     */
    cancelReportArticle: (
        boardNo: string,
        articleNo: number,
        options?: Options
    ) => {
        return request.delete(
            `boards/${boardNo}/articles/${articleNo}/report`,
            {
                ...options,
            }
        );
    },

    /**
     * 게시글 첨부파일 다운로드하기
     *  - 특정 게시글(게시글 번호 기준)의 첨부파일을 다운로드하는 API 입니다
     */
    downloadFile: (
        boardNo: string,
        postNo: number,
        params: DownloadFileParams,
        options?: Options
    ) => {
        return request.get(`boards/${boardNo}/posts/${postNo}/file`, {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 게시글 답글 리스트 조회하기(버전2)
     *  - 특정 게시판(게시판 번호 기준)의 게시글 리스트를 조회하는 API V2 입니다.
     */
    getRepliesByBoardNoV2: (
        boardNo: string,
        postNo: number,
        params?: GetRepliesByBoardNoV2Params,
        options?: Options
    ) => {
        return request.get<GetRepliesByBoardNoV2Response>(
            `boards/${boardNo}/posts/${postNo}/replies`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },
};

export default board;
