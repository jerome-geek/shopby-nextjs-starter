import type { GeekResponse } from '@/models/api/response';

export type CommentContentType = 'MAGAZINE' | 'BOARD' | 'RECIPE';

export interface CreateCommentRequest {
    /** 부모 댓글 번호 (답글인 경우 사용, 기본값 0) */
    parentSno?: number;
    /** 코멘트 적용 타입 (레시피는 MAGAZINE 사용) */
    contentType: CommentContentType;
    /** 레시피 등 타겟 콘텐츠 번호 */
    contentSno: number;
    /** 작성자 ID */
    memberId: string;
    /** 작성자 번호 */
    memberNo: number;
    /** 첨부 파일 (선택, 이미지 경로 등) */
    attachment?: string;
    /** 댓글 내용 */
    comment: string;
}

export interface UpdateCommentRequest {
    /** 댓글 내용 */
    comment: string;
    /** 첨부 파일 (선택, 이미지 경로 등) */
    attachment?: string;
}

export interface GetCommentsParams {
    contentType: CommentContentType;
    contentSno: number;
    page?: number;
    take?: number;
}

export interface CommentResponse {
    sno: number;
    regDt: string;
    updateDt: string;
    partnerSno: number;
    parentSno: number;
    contentType: string;
    contentSno: number;
    memberId: string;
    memberNo: number;
    comment: string;
    attachment?: string;
}

export type GetCommentsResponse = GeekResponse<CommentResponse>;
