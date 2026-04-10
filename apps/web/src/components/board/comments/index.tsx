import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/board/comments/index.css';
import CommentItem from '@/components/board/comments/item';
import { TextArea } from '@/components/ui/input';
import Paging from '@/components/ui/paging';
import { BOARD_PAGINATION, BOARD_REPLY_MAX_LENGTH } from '@/const/board';
import { useBoardReplyMutation } from '@/hooks/mutations';
import { useBoardReplyList } from '@/hooks/query/manage/board';
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

    const { openLoginDialog, openDialog } = useDialog();

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

    const { handleSubmit, reset, register } = useForm<CommentFormValues>({
        defaultValues: {
            content: '',
        },
    });

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

            openDialog({
                message: t('댓글이 등록되었습니다.'),
            });

            reset();
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    });

    return (
        <div className={styles.container}>
            <strong className={styles.CommentsTitle}>
                댓글
                <span className={styles.CommentsCount}>{` ${totalCount}`}</span>
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

            <Paging
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
                <TextArea
                    placeholder='댓글을 입력해주세요.'
                    {...register('content', {
                        maxLength: BOARD_REPLY_MAX_LENGTH,
                    })}
                    maxLength={BOARD_REPLY_MAX_LENGTH}
                />
                <button type='submit' className={styles.registerButton}>
                    등록하기
                </button>
            </form>
        </div>
    );
};

export default Comments;
