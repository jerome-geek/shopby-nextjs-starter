import { GetCommentsParams } from '@/models/shop/comment';

const commentKeys = {
    all: ['comment'] as const,

    lists: () => [...commentKeys.all, 'list'] as const,
    list: (params: GetCommentsParams) => [...commentKeys.lists(), params] as const,

    details: () => [...commentKeys.all, 'detail'] as const,
    detail: (sno: number) => [...commentKeys.details(), sno] as const,
};

export default commentKeys;
