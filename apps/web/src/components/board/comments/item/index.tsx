import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/board/comments/item/index.css';
import TextArea from '@/components/ui/input/TextArea';
import { Row } from '@/components/ui/layout/flex';
import { BOARD_REPLY_MAX_LENGTH } from '@/const/board';
import { useBoardReplyMutation } from '@/hooks/mutations';
import { useBoardConfig } from '@/hooks/query/manage/board';
import { useProfile } from '@/hooks/query/member/profile';
import { useDialog } from '@/hooks/utils';
import { AuthorityConfigType } from '@/models';
import { ReplyList, UpdateArticleData } from '@/models/manage/board';

const CommentItem = ({
    reply,
    boardNo,
    articleNo,
}: {
    reply: ReplyList;
    boardNo: string;
    articleNo: number;
}) => {
    const { t } = useTranslation();

    const { openDialog, openAsyncDialog } = useDialog();

    const [isEditing, setIsEditing] = useState(false);

    const { update: updateReplyMutation, delete: deleteReplyMutation } =
        useBoardReplyMutation({
            articleNo,
        });

    const { register, handleSubmit, watch, formState } = useForm<{
        content: string;
    }>({
        defaultValues: {
            content: reply.content,
        },
    });

    const editContent = watch('content');

    const { data: profileData } = useProfile();

    const { data: boardConfigData } = useBoardConfig();

    const currentBoardConfig = useMemo(() => {
        if (!boardConfigData?.boardConfigs) {
            return null;
        }
        if (!boardNo) {
            return null;
        }

        return boardConfigData.boardConfigs.find(
            (config) => config.boardId === boardNo,
        );
    }, [boardConfigData, boardNo]);

    const isMyComment =
        profileData?.memberNo !== undefined &&
        reply.registerNo === profileData?.memberNo;

    const getWriterDisplayName = useCallback(
        (reply: ReplyList): string => {
            const displayType: AuthorityConfigType =
                currentBoardConfig?.writerDisplayType ?? 'MEMBER_NAME';

            switch (displayType) {
                case 'MEMBER_ID':
                    return reply.memberId || reply.registerName;
                case 'MEMBER_NICKNAME':
                    return reply.memberNickname;
                case 'MEMBER_EMAIL':
                    return reply.memberEmail;
                case 'MEMBER_NAME':
                default:
                    return reply.registerName;
            }
        },
        [currentBoardConfig?.writerDisplayType],
    );

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleDeleteClick = async () => {
        const confirmed = await openAsyncDialog<boolean>({
            type: 'confirm',
            message: t('댓글을 삭제하시겠습니까?'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!confirmed) {
            return;
        }

        try {
            await deleteReplyMutation.mutateAsync({
                boardNo,
                articleNo: reply.articleNo,
            });

            openDialog({ message: t('댓글이 삭제되었습니다.') });
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            const updateData: UpdateArticleData = {
                articleTitle:
                    data.content.length > 50
                        ? data.content.slice(0, 50)
                        : data.content,
                articleContent: data.content,
                secreted: reply.secreted ?? false,
                postSearchTags:
                    reply.tags?.filter(
                        (tag): tag is string => typeof tag === 'string',
                    ) || [],
                ...(reply.categoryNo && { boardCategoryNo: reply.categoryNo }),
            };

            await updateReplyMutation.mutateAsync({
                boardNo,
                articleNo: reply.articleNo,
                data: updateData,
            });

            openDialog({
                message: t('댓글이 수정되었습니다.'),
            });

            setIsEditing(false);
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        }
    });

    return (
        <li className={styles.commentListItem}>
            {isEditing ? (
                <form className={styles.commentContainer} onSubmit={onSubmit}>
                    <TextArea
                        placeholder='댓글을 입력해주세요.'
                        {...register('content', {
                            maxLength: BOARD_REPLY_MAX_LENGTH,
                        })}
                        maxLength={BOARD_REPLY_MAX_LENGTH}
                    />
                    <Row gap={'sm'}>
                        <button
                            type='submit'
                            className={styles.registerButton}
                            disabled={
                                formState.isSubmitting || !editContent.trim()
                            }
                        >
                            수정
                        </button>
                        <button
                            type='button'
                            className={styles.registerButton}
                            onClick={toggleEdit}
                            disabled={formState.isSubmitting}
                        >
                            취소
                        </button>
                    </Row>
                </form>
            ) : (
                <>
                    <div className={styles.commentItemHeader}>
                        <Row gap={'sm'}>
                            <strong className={styles.registerName}>
                                {getWriterDisplayName(reply)}
                            </strong>
                            <span className={styles.date}>
                                {dayjs(reply.registerYmdt).format(
                                    'YYYY.MM.DD HH:MM',
                                )}
                            </span>
                        </Row>

                        {isMyComment && !isEditing && (
                            <Row gap={'xs'}>
                                <button
                                    className={styles.headerButton}
                                    onClick={toggleEdit}
                                >
                                    수정
                                </button>
                                <button
                                    className={styles.headerButton}
                                    onClick={handleDeleteClick}
                                >
                                    삭제
                                </button>
                            </Row>
                        )}
                    </div>
                    <p className={styles.content}>{reply.content}</p>
                </>
            )}
        </li>
    );
};

export default CommentItem;
