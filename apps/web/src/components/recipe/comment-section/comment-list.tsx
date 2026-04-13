import { useTranslation } from 'react-i18next';

import { CommentItem } from '@/components/recipe/comment-section/comment-item';
import * as styles from '@/components/recipe/comment-section/index.css';
import { useRecipeCommentMutation } from '@/hooks/mutations';
import { useRecipeCommentList } from '@/hooks/suspenseQuery/shop/comment';
import { useToast } from '@/hooks/ui/useToast';
import { useDialog } from '@/hooks/utils';

interface CommentListProps {
    recipeSno: number;
}

// TODO: 페이징 처리 어떻게 할지
export const CommentList = ({ recipeSno }: CommentListProps) => {
    const { t } = useTranslation();

    const { addToast } = useToast();
    const { openAsyncDialog } = useDialog();

    const { data: recipeCommentListData } = useRecipeCommentList({
        params: {
            contentType: 'BOARD',
            contentSno: recipeSno,
        },
    });

    const commentList = recipeCommentListData.data || [];

    const { removeComment } = useRecipeCommentMutation();
    const handleDelete = async (commentSno: number) => {
        const isConfirmed = await openAsyncDialog({
            message: t('댓글을 삭제하시겠습니까?'),
            type: 'confirm',
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
        } catch (error) {
            addToast({
                message: t('댓글 삭제에 실패했습니다.'),
                variant: 'error',
            });
        }
    };

    return (
        <>
            <h3 className={styles.commentTitle}>
                {t('댓글')}
                <span className={styles.commentCount}>
                    {recipeCommentListData.count}
                </span>
            </h3>
            <ul className={styles.commentList}>
                {commentList.map((comment) => (
                    <li key={comment.sno}>
                        <CommentItem
                            comment={comment}
                            onDelete={handleDelete}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
