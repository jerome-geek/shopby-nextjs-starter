import { GetCommentBlacklistParams, GetCommentsParams } from '@/model/comment';

const commentKeys = {
    all: ['comment'] as const,

    lists: () => [...commentKeys.all, 'list'] as const,
    list: (params: GetCommentsParams) =>
        [...commentKeys.lists(), params] as const,

    blackLists: () => [...commentKeys.all, 'blacklist'] as const,
    blackList: (params: GetCommentBlacklistParams) =>
        [...commentKeys.blackLists(), params] as const,
};

export default commentKeys;
