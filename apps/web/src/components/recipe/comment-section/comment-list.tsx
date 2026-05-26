import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

import { CommentItem } from '@/components/recipe/comment-section/comment-item';
import * as styles from '@/components/recipe/comment-section/index.css';
import PagingV2 from '@/components/ui/paging-v2';
import { useRecipeCommentMutation } from '@/hooks/mutations';
import { useRecipeCommentList } from '@/hooks/suspenseQuery/shop/comment';
import { useToast } from '@/hooks/ui/useToast';
import { useDialog } from '@/hooks/utils';

interface CommentListProps {
    recipeSno: number;
    scrollToComments: () => void;
}

const PAGE_SIZE = 10;

export const CommentList = ({
    recipeSno,
    scrollToComments,
}: CommentListProps) => {
    const { t } = useTranslation();

    const { addToast } = useToast();
    const { openAsyncDialog } = useDialog();

    const [isPending, startTransition] = useTransition();

    const [page, setPage] = useState(1);

    const { data: recipeCommentListData } = useRecipeCommentList({
        params: {
            contentType: 'BOARD',
            contentSno: recipeSno,
            page,
            take: PAGE_SIZE,
        },
    });

    const commentList = recipeCommentListData.data || [];

    const { removeComment } = useRecipeCommentMutation();

    const handleDelete = async (commentSno: number) => {
        const isConfirmed = await openAsyncDialog({
            type: 'confirm',
            message: t('댓글을 삭제하시겠습니까?'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isConfirmed) {
            return;
        }

        try {
            await removeComment.mutateAsync({
                commentSno,
                contentType: 'BOARD',
                contentSno: recipeSno,
            });
            addToast({
                message: t('댓글이 삭제되었습니다.'),
                variant: 'success',
            });
        } catch {
            addToast({
                message: t('댓글 삭제에 실패했습니다.'),
                variant: 'error',
            });
        }
    };

    const handlePageClick = (nextPage: number) => {
        startTransition(() => {
            scrollToComments();
            setPage(nextPage);
        });
    };

    return (
        <>
            <h3 className={styles.commentTitle}>
                {t('댓글')}
                <span className={styles.commentCount}>
                    {recipeCommentListData.count}
                </span>
            </h3>
            <ul
                className={styles.commentList}
                style={{
                    opacity: isPending ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                }}
            >
                {commentList.map((comment) => (
                    <li key={comment.sno}>
                        <CommentItem
                            comment={comment}
                            onDelete={handleDelete}
                        />
                    </li>
                ))}
                <PagingV2
                    type='default'
                    currentPage={page}
                    totalCount={recipeCommentListData?.count ?? 0}
                    pageSize={PAGE_SIZE}
                    onPageClick={handlePageClick}
                />
            </ul>
        </>
    );
};
