import { useMutation, useQueryClient } from '@tanstack/react-query';

import { comment } from '@/api/shop';
import { commentKeys } from '@/hooks/queryKeys';
import {
    CreateCommentRequest,
    UpdateCommentRequest,
} from '@/models/shop/comment';

const useRecipeCommentMutation = () => {
    const queryClient = useQueryClient();

    return {
        /** 댓글 생성 */
        createComment: useMutation({
            mutationFn: async ({ data }: { data: CreateCommentRequest }) =>
                await comment.create(data),
            onSuccess: (_, { data }) => {
                queryClient.invalidateQueries({
                    queryKey: commentKeys.list({
                        contentType: data.contentType,
                        contentSno: data.contentSno,
                    }),
                });
            },
        }),

        /** 댓글 수정 */
        updateComment: useMutation({
            mutationFn: async ({
                commentSno,
                data,
            }: {
                commentSno: number;
                data: UpdateCommentRequest;
            }) => await comment.update(commentSno, data),
            onSuccess: (res) => {
                queryClient.invalidateQueries({
                    queryKey: commentKeys.list({
                        contentType: res.data.contentType as any,
                        contentSno: res.data.contentSno,
                    }),
                });
            },
        }),

        /** 댓글 삭제 */
        removeComment: useMutation({
            mutationFn: async ({
                commentSno,
                contentType,
                contentSno,
            }: {
                commentSno: number;
                contentType: string;
                contentSno: number;
            }) => {
                await comment.remove(commentSno);
                return { contentType, contentSno };
            },
            onSuccess: ({ contentType, contentSno }) => {
                queryClient.invalidateQueries({
                    queryKey: commentKeys.list({
                        contentType: contentType as any,
                        contentSno,
                    }),
                });
            },
        }),
    };
};

export default useRecipeCommentMutation;
