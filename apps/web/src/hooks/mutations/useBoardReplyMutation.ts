import { useMutation, useQueryClient } from '@tanstack/react-query';
import { istype AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { useDialog } from '@/hooks/utils';
import {
    DeleteArticleData,
    PostArticleParams,
    UpdateArticleData,
} from '@/models/manage/board';

const useBoardReplyMutation = ({ articleNo }: { articleNo: number }) => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const queryClient = useQueryClient();

    const invalidateRepliesForArticle = (boardNo: string) => {
        const prefix = [...boardKeys.replies(), boardNo, articleNo];
        queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey;
                if (!Array.isArray(key) || key.length < prefix.length) {
                    return false;
                }
                return prefix.every((segment, index) => key[index] === segment);
            },
            refetchType: 'all',
        });
    };

    const onErrorHandler = (error: Error) => {
        openDialog({
            message: t(
                isAxiosError(error)
                    ? error.response?.data.message
                    : t('알 수 없는 오류가 발생했습니다.'),
            ),
        });
    };

    return {
        register: useMutation({
            mutationFn: async ({
                boardNo,
                data,
            }: {
                boardNo: string;
                data: PostArticleParams;
            }) => {
                await board.writeArticle(boardNo, data);
            },
            onSuccess: (_, { boardNo }) => {
                invalidateRepliesForArticle(boardNo);
            },
            onError: onErrorHandler,
        }),

        update: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo: replyArticleNo,
                data,
            }: {
                boardNo: string;
                articleNo: number;
                data: UpdateArticleData;
            }) => {
                await board.updateArticle(boardNo, replyArticleNo, data);
            },
            onSuccess: (_, { boardNo }) => {
                invalidateRepliesForArticle(boardNo);
            },
            onError: onErrorHandler,
        }),

        delete: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo: replyArticleNo,
                data,
            }: {
                boardNo: string;
                articleNo: number;
                data?: DeleteArticleData;
            }) => {
                await board.deleteArticle(boardNo, replyArticleNo, data);
            },
            onSuccess: (_, { boardNo }) => {
                invalidateRepliesForArticle(boardNo);
            },
            onError: onErrorHandler,
        }),
    };
};

export default useBoardReplyMutation;
