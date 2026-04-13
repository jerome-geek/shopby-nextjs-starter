import dayjs from '@/utils/dayjs';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/comment-section/index.css';
import { useProfile } from '@/hooks/query/member/profile';
import { useAuth } from '@/hooks/useAuth';
import { CommentResponse } from '@/models/shop/comment';

interface CommentItemProps {
    comment: CommentResponse;
    onDelete: (sno: number) => void;
}

export const CommentItem = ({ comment, onDelete }: CommentItemProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();
    const { data: profile } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });

    const isAuthor = isLogin && profile?.memberNo === comment.memberNo;

    const images = comment.attachment ? comment.attachment.split('|') : [];

    return (
        <article className={styles.commentItem}>
            <header className={styles.commentHeader}>
                <div className={styles.commentAuthorInfo}>
                    <span className={styles.commentAuthor}>
                        {comment.memberId}
                    </span>
                    <time
                        className={styles.commentDate}
                        dateTime={comment.regDt}
                    >
                        {dayjs(comment.regDt).fromNow()}
                    </time>
                </div>
                {isAuthor && (
                    <button
                        className={styles.commentReportBtn}
                        onClick={() => onDelete(comment.sno)}
                    >
                        {t('삭제')}
                    </button>
                )}
            </header>
            <p className={styles.commentText}>{comment.comment}</p>
            {images.length > 0 && (
                <div className={styles.commentImages}>
                    {images.map((url, index) => (
                        <img
                            key={`${comment.sno}-${index}`}
                            src={url}
                            alt={`comment attachment ${index}`}
                            className={styles.commentImage}
                        />
                    ))}
                </div>
            )}
        </article>
    );
};
