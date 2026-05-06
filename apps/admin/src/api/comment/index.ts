import { request } from '@/api/core/request';
import {
    AddCommentBlacklistBody,
    GetCommentBlacklistParams,
    GetCommentBlacklistResponse,
    GetCommentsParams,
    GetCommentsResponse,
} from '@/model/comment';

export const comment = {
    getCommentList: (params: GetCommentsParams) => {
        return request<GetCommentsResponse>({
            method: 'GET',
            url: '/admin/comment/comments',
            params,
        });
    },
    getCommentBlacklist: (params: GetCommentBlacklistParams) => {
        return request<GetCommentBlacklistResponse>({
            method: 'GET',
            url: '/admin/comment/blacklist',
            params,
        });
    },
    deleteCommentBlacklist: (memberNo: number) => {
        return request({
            method: 'DELETE',
            url: `/admin/comment/blacklist/${memberNo}`,
        });
    },
    addCommentBlacklist: (data: AddCommentBlacklistBody) => {
        return request({
            method: 'POST',
            url: '/admin/comment/blacklist',
            data,
        });
    },
};
