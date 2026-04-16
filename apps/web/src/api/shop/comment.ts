import type { AxiosRequestConfig } from 'axios';

import { geekRequest } from '@/api/core/geekRequest';
import type {
    CommentResponse,
    CreateCommentRequest,
    GetCommentsParams,
    GetCommentsResponse,
    UpdateCommentRequest,
} from '@/models/shop/comment';

const comment = {
    /**
     * 댓글 생성
     *  - 레시피, 매거진 등 타겟 콘텐츠에 댓글을 작성합니다
     */
    create: (data: CreateCommentRequest, options?: AxiosRequestConfig) => {
        return geekRequest<CommentResponse>({
            method: 'POST',
            url: '/shop/app/comment',
            data,
            ...options,
        });
    },

    /**
     * 댓글 목록 조회
     *  - 특정 콘텐츠의 댓글 목록을 페이징하여 조회합니다
     */
    getList: (params: GetCommentsParams, options?: AxiosRequestConfig) => {
        return geekRequest<GetCommentsResponse>({
            method: 'GET',
            url: '/shop/app/comment',
            params,
            ...options,
        });
    },

    /**
     * 댓글 수정
     *  - 작성한 댓글 내용을 수정합니다
     */
    update: (
        commentSno: number,
        data: UpdateCommentRequest,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<CommentResponse>({
            method: 'PATCH',
            url: `/shop/app/comment/${commentSno}`,
            data,
            ...options,
        });
    },

    /**
     * 댓글 삭제
     *  - 댓글을 삭제합니다
     */
    remove: (commentSno: number, options?: AxiosRequestConfig) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/app/comment/${commentSno}`,
            ...options,
        });
    },
};

export default comment;
