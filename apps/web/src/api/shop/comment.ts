import { geekRequest } from '@/api/core/geekRequest';

export type CommentContentType = 'MAGAZINE' | 'BOARD';

export interface CommentInsertDto {
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
}

const comment = {
    /** 댓글 생성 */
    create: (data: CommentInsertDto) => {
        return geekRequest<CommentResponse>({
            method: 'POST',
            url: '/shop/app/comment',
            data,
        });
    },

    /** 댓글 목록 조회 (필요 시 확장) */
    getList: (params: { contentType: CommentContentType; contentSno: number; page?: number; size?: number }) => {
        return geekRequest<{ items: CommentResponse[]; totalCount: number }>({
            method: 'GET',
            url: '/shop/app/comment',
            params,
        });
    },

    /** 댓글 수정 (필요 시 확장) */
    update: (commentSno: number, data: Partial<CommentInsertDto>) => {
        return geekRequest<CommentResponse>({
            method: 'PATCH',
            url: `/shop/app/comment/${commentSno}`,
            data,
        });
    },

    /** 댓글 삭제 (필요 시 확장) */
    remove: (commentSno: number) => {
        return geekRequest({
            method: 'DELETE',
            url: `/shop/app/comment/${commentSno}`,
        });
    },
};

export default comment;
