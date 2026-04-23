import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/board/comments/index.css';
import CommentItem from '@/components/board/comments/item';
import { ErrorMessage } from '@/components/ui/form';
import { TextArea } from '@/components/ui/input';
import { Column } from '@/components/ui/layout/flex';
import PagingV2 from '@/components/ui/paging-v2';
import { BOARD_PAGINATION, BOARD_REPLY_MAX_LENGTH } from '@/const/board';
import { useBoardReplyMutation } from '@/hooks/mutations';
import { useBoardReplyList } from '@/hooks/query/manage/board';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';

interface CommentsProps {
    boardNo: string;
    articleNo: number;
    categoryNo?: number;
}

interface CommentFormValues {
    content: string;
}

const Comments = ({ boardNo, articleNo, categoryNo }: CommentsProps) => {
    const { t } = useTranslation();

    const { openLoginDialog } = useDialog();

    const { addToast } = useToast();

    const isLogin = useAuth();

    const [searchParams, setSearchParams] = useState({
        page: BOARD_PAGINATION.REPLY.DEFAULT_PAGE_NUMBER,
        pageSize: BOARD_PAGINATION.REPLY.DEFAULT_PAGE_SIZE,
    });

    const { data: boardReplyListData } = useBoardReplyList({
        boardNo,
        articleNo,
        searchParams: {
            page: Number(searchParams.page),
            pageSize: Number(searchParams.pageSize),
        },
    });

    const totalCount = boardReplyListData?.totalCount || 0;

    const { register: registerReplyMutation } = useBoardReplyMutation({
        articleNo,
    });

    const methods = useForm<CommentFormValues>({
        defaultValues: {
            content: '',
        },
    });

    const {
        handleSubmit,
        reset,
        register,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = handleSubmit(async (data: CommentFormValues) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        try {
            await registerReplyMutation.mutateAsync({
                boardNo,
                data: {
                    articleTitle: data.content.slice(0, 50),
                    articleContent: data.content,
                    parentBoardArticleNo: articleNo,
                    secreted: false,
                    postSearchTags: [],
                    ...(categoryNo && { boardCategoryNo: categoryNo }),
                },
            });

            addToast({
                message: t('댓글이 등록되었습니다.'),
            });

            reset();
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    });

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <strong className={styles.commentsTitle}>
                    댓글
                    <span
                        className={styles.commentsCount}
                    >{` ${totalCount}`}</span>
                </strong>

                {totalCount > 0 && (
                    <ul className={styles.commentList}>
                        {boardReplyListData?.items.map((reply, index) => (
                            <CommentItem
                                key={`${reply.articleNo}-${index}`}
                                reply={reply}
                                boardNo={boardNo}
                                articleNo={articleNo}
                            />
                        ))}
                    </ul>
                )}

                <PagingV2
                    type='default'
                    currentPage={Number(searchParams.page)}
                    totalCount={boardReplyListData?.totalCount ?? 0}
                    pageSize={Number(searchParams.pageSize)}
                    onPageClick={(nextPage) =>
                        setSearchParams((prev) => ({
                            ...prev,
                            page: String(nextPage),
                        }))
                    }
                />

                <form className={styles.commentContainer} onSubmit={onSubmit}>
                    <Column align='start' gap='sm' style={{ width: '100%' }}>
                        <TextArea
                            placeholder='댓글을 입력해주세요.'
                            {...register('content', {
                                maxLength: BOARD_REPLY_MAX_LENGTH,
                                validate: (value) =>
                                    value.trim().length >= 1 ||
                                    '댓글을 1글자 이상 입력해주세요.',
                            })}
                            maxLength={BOARD_REPLY_MAX_LENGTH}
                            data-error={!!errors.content}
                        />
                        <ErrorMessage name='content' />
                    </Column>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className={styles.registerButton}
                    >
                        등록하기
                    </button>
                </form>
            </div>
        </FormProvider>
    );
};

export default Comments;
