import { GetArticleListParams, GetArticleParams } from '@/models/manage/board';

const boardKeys = {
    all: ['boards'] as const,

    /** 게시판 설정 */
    config: () => [...boardKeys.all, 'config'] as const,

    categories: () => [...boardKeys.all, 'category'] as const,
    category: (boardNo: string) =>
        [...boardKeys.categories(), boardNo] as const,

    /** 게시글 리스트 */
    lists: () => [...boardKeys.all, 'list'] as const,
    list: (
        boardNo: string,
        memberNo?: number,
        searchParams?: GetArticleListParams,
    ) => [...boardKeys.lists(), boardNo, memberNo, searchParams] as const,
    infiniteList: (
        boardNo: string,
        memberNo?: number,
        searchParams?: GetArticleListParams,
    ) =>
        [
            ...boardKeys.lists(),
            'infinite',
            boardNo,
            memberNo,
            searchParams,
        ] as const,

    /** 게시글 상세 */
    details: () => [...boardKeys.all, 'detail'] as const,
    detail: (
        boardNo: string,
        articleNo: number,
        memberNo?: number,
        searchParams?: GetArticleParams,
    ) =>
        [
            ...boardKeys.details(),
            boardNo,
            articleNo,
            memberNo,
            searchParams,
        ] as const,

    /** 게시글 답글 리스트 */
    replies: () => [...boardKeys.all, 'replies'] as const,
    reply: (boardNo: string, articleNo: number) =>
        [...boardKeys.replies(), boardNo, articleNo] as const,
};

export default boardKeys;
