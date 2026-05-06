import { useMutation } from '@tanstack/react-query';

import { comment } from '@/api/comment';
import { AddCommentBlacklistBody } from '@/model/comment';

const useCommentMutation = () => {
    return {
        deleteCommentBlacklist: useMutation({
            mutationFn: async (memberNo: number) =>
                await comment.deleteCommentBlacklist(memberNo),
        }),
        addCommentBlacklist: useMutation({
            mutationFn: async (data: AddCommentBlacklistBody) =>
                await comment.addCommentBlacklist(data),
        }),
    };
};

export default useCommentMutation;
