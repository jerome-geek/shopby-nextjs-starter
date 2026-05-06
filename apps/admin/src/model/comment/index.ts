import { PageParams, PageResponse } from '@/model/common';

export interface GetCommentsParams extends PageParams {
    keyword?: string;
    recipeSno?: number;
    memberNo?: number;
}

export interface Comment {
    sno: number;
    recipeAuthorName: string | null;
    recipeSno: number;
    recipeTitle: string;
    attachment?: string;
    comment: string;
    isDeleted: boolean;
    memberId: string;
    memberName: string;
    memberNo: number;
    parentSno: number | null;
    regDt: string;
    updateDt: string;
}

export type GetCommentsResponse = PageResponse<Comment>;

export interface GetCommentBlacklistParams extends PageParams {
    keyword?: string;
}

export interface BlackMember {
    memberId: string;
    memberName: string;
    memberNo: number;
    memo: string;
    regDt: string;
    updateDt: string;
}

export type GetCommentBlacklistResponse = PageResponse<BlackMember>;

export interface AddCommentBlacklistBody {
    memberNo: number;
    memberId?: string;
    memberName?: string;
    memo: string;
}
