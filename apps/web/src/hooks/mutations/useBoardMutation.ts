import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { istype AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { useDialog } from '@/hooks/utils';
import {
    DeleteArticleData,
    PostArticleParams,
    ReportArticleData,
    UpdateArticleData,
} from '@/models/manage/board';

const useBoardMutation = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const queryClient = useQueryClient();
    const invalidate = () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [...boardKeys.all]);
            },
        });
    };

    /** V1 상세(useBoardArticle) + V2 상세(useBoardPost / postDetail) 모두 무효화 */
    const articleDetailInvalidate = (boardNo: string, articleNo: number) => {
        queryClient.invalidateQueries({
            queryKey: [...boardKeys.details(), boardNo, articleNo],
            refetchType: 'all',
        });
        queryClient.invalidateQueries({
            queryKey: [...boardKeys.details(), 'post', boardNo, articleNo],
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
            }) => await board.writeArticle(boardNo, data),
            onSuccess: () => {
                invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        update: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
                data,
            }: {
                boardNo: string;
                articleNo: number;
                data: UpdateArticleData;
            }) => await board.updateArticle(boardNo, articleNo, data),
            onSuccess: () => {
                invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        delete: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
                data,
            }: {
                boardNo: string;
                articleNo: number;
                data?: DeleteArticleData;
            }) => await board.deleteArticle(boardNo, articleNo, data),
            onSuccess: () => {
                invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        recommend: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
            }: {
                boardNo: string;
                articleNo: number;
            }) => {
                const res = await board.recommendArticle(boardNo, articleNo);

                return res;
            },
            onSuccess: (_, { boardNo, articleNo }) => {
                articleDetailInvalidate(boardNo, articleNo);
            },
            onError: onErrorHandler,
        }),

        cancelRecommend: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
            }: {
                boardNo: string;
                articleNo: number;
            }) => {
                const res = await board.cancelArticleRecommend(
                    boardNo,
                    articleNo,
                );

                return res;
            },
            onSuccess: (_, { boardNo, articleNo }) => {
                articleDetailInvalidate(boardNo, articleNo);
            },
            onError: onErrorHandler,
        }),

        report: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
                data,
            }: {
                boardNo: string;
                articleNo: number;
                data: ReportArticleData;
            }) => {
                await board.reportArticle(boardNo, articleNo, data);
            },
            onSuccess: (_, { boardNo, articleNo }) => {
                articleDetailInvalidate(boardNo, articleNo);
            },
            onError: onErrorHandler,
        }),

        cancelReport: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
            }: {
                boardNo: string;
                articleNo: number;
            }) => {
                await board.cancelReportArticle(boardNo, articleNo);
            },
            onSuccess: (_, { boardNo, articleNo }) => {
                articleDetailInvalidate(boardNo, articleNo);
            },
            onError: onErrorHandler,
        }),

        // 게시글 수정 가능 여부 확인
        checkEditable: useMutation({
            mutationFn: async ({
                boardNo,
                articleNo,
                data,
            }: {
                boardNo: string;
                articleNo: number;
                data?: DeleteArticleData; // 비회원 비밀번호 포함
            }) => {
                const res = await board.checkEditableArticle(
                    boardNo,
                    articleNo,
                    data,
                );

                if (res.status === 204) {
                    return true;
                }

                const payload = res.data;

                if (typeof payload === 'boolean') {
                    return payload;
                }
                if (payload?.editable !== undefined) {
                    return Boolean(payload.editable);
                }
                if (payload?.data !== undefined) {
                    return Boolean(payload.data);
                }

                return false;
            },
            onError: onErrorHandler,
        }),
    };
};

export default useBoardMutation;
