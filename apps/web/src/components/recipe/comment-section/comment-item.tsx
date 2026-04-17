import dayjs from '@/utils/dayjs';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/comment-section/index.css';
import { RecipePreviewImage } from '@/components/recipe/preview-image';
import { useProfile } from '@/hooks/query/member/profile';
import { useCustomDialog } from '@/hooks/ui';
import type { CommentResponse } from '@/models/shop/comment';

interface CommentItemProps {
    comment: CommentResponse;
    onDelete: (sno: number) => void;
}

export const CommentItem = ({ comment, onDelete }: CommentItemProps) => {
    const { t } = useTranslation();
    const { data: profileData } = useProfile();
    const { openImageDetail } = useCustomDialog();

    const isAuthor = profileData?.memberNo === comment.memberNo;

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
                <ul className={styles.commentImages}>
                    {images.map((url, index) => (
                        <li
                            key={`recipe-comment-${comment.sno}-${index}`}
                            className={styles.commentImageItem}
                        >
                            <RecipePreviewImage
                                sno={index}
                                url={url}
                                onClick={() => openImageDetail(url)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
};
