import { Image as ImageIcon } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import * as styles from '@/components/recipe/RecipeCommentSection/index.css';
import { useRecipeCommentMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useSuspenseCommentList } from '@/hooks/suspenseQuery/shop/comment';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface RecipeCommentSectionProps {
    recipeSno: number;
}

// TODO: suspense, errorboundary추가
export const RecipeCommentSection = ({
    recipeSno,
}: RecipeCommentSectionProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();
    const { addToast } = useToast();
    const [commentText, setCommentText] = React.useState('');

    // 댓글 목록 조회 (Suspense)
    const { data: commentData } = useSuspenseCommentList({
        params: {
            contentType: 'BOARD',
            contentSno: recipeSno,
        },
    });
    console.log('🚀 ~ RecipeCommentSection ~ commentData:', commentData);

    // 프로필 정보 (로그인 시에만 Suspense로 가져옴)
    // useAuth가 true일 때만 useProfile을 호출하거나 하는 처리가 필요할 수 있음
    // 여기서는 간단히 useProfile을 조건부로 호출하기 어렵기에 (Suspense 규칙상)
    // 상위에서 처리하거나, useProfile 내부에서 처리가 되어있어야 함.
    // 일단 로그인 상태일 때만 프로필 정보를 참조한다고 가정.
    const { data: profile } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });

    const { createComment, removeComment } = useRecipeCommentMutation();

    const handleSubmit = async () => {
        if (!isLogin) {
            addToast({
                message: t('로그인 후 이용 가능합니다.'),
                variant: 'error',
            });
            return;
        }

        if (!commentText.trim()) {
            addToast({
                message: t('댓글 내용을 입력해주세요.'),
                variant: 'error',
            });
            return;
        }

        if (!profile) return;

        try {
            await createComment.mutateAsync({
                data: {
                    contentType: 'BOARD',
                    contentSno: recipeSno,
                    comment: commentText,
                    memberId: profile.memberId,
                    memberNo: profile.memberNo,
                },
            });
            setCommentText('');
            addToast({
                message: t('댓글이 등록되었습니다.'),
                variant: 'success',
            });
        } catch (error) {
            addToast({
                message: t('댓글 등록에 실패했습니다.'),
                variant: 'error',
            });
        }
    };

    const handleDelete = async (commentSno: number) => {
        if (!window.confirm(t('댓글을 삭제하시겠습니까?'))) return;

        try {
            await removeComment.mutateAsync({
                commentSno,
                contentType: 'MAGAZINE',
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
        <section className={styles.commentSection}>
            <h2 className={styles.commentTitle}>
                {t('댓글')} {commentData.count}
            </h2>
            <ul className={styles.commentList}>
                {commentData?.data?.map((comment) => (
                    <li key={comment.sno}>
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
                                {isLogin &&
                                    profile?.memberNo === comment.memberNo && (
                                        <button
                                            className={styles.commentReportBtn}
                                            onClick={() =>
                                                handleDelete(comment.sno)
                                            }
                                        >
                                            {t('삭제')}
                                        </button>
                                    )}
                            </header>
                            <p className={styles.commentText}>
                                {comment.comment}
                            </p>
                            {comment.attachment && (
                                <div className={styles.commentImages}>
                                    <img
                                        src={comment.attachment}
                                        alt='comment attachment'
                                        className={styles.commentImage}
                                    />
                                </div>
                            )}
                        </article>
                    </li>
                ))}
            </ul>

            <div className={styles.commentInputArea}>
                <textarea
                    className={styles.commentTextArea}
                    placeholder={
                        isLogin
                            ? t('댓글을 남겨주세요.')
                            : t('로그인 후 이용 가능합니다.')
                    }
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    readOnly={!isLogin}
                />
                <div className={styles.commentToolbar}>
                    <button className={styles.attachButton} disabled={!isLogin}>
                        <ImageIcon size={18} /> {t('사진')}
                    </button>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!isLogin || createComment.isPending}
                    >
                        {t('등록하기')}
                    </button>
                </div>
            </div>
        </section>
    );
};
