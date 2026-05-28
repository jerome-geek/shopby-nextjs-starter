import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/board/comments/item/index.css';
import { Column, Row } from '@/shared/ui/layout/flex';
import { BOARD_REPLY_MAX_LENGTH } from '@/const/board';
import { useBoardReplyMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import useBoardConfig from '@/hooks/suspenseQuery/manage/board/useBoardConfig';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import type { AuthorityConfigType } from '@/models';
import type { ReplyList, UpdateArticleData } from '@/models/manage/board';
import { ErrorMessage, TextArea } from '@/shared/components/form';

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

    const { openAsyncDialog } = useDialog();

    const { addToast } = useToast();

    const [isEditing, setIsEditing] = useState(false);

    const { update: updateReplyMutation, delete: deleteReplyMutation } =
        useBoardReplyMutation({
            articleNo,
        });
    const methods = useForm<{
        content: string;
    }>({
        defaultValues: {
            content: reply.content,
        },
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    const { data: profileData } = useProfile();

    const { data: boardConfigData } = useBoardConfig();

    const currentBoardConfig = useMemo(() => {
        if (!boardNo) {
            return null;
        }

        return (
            boardConfigData.boardConfigs.find(
                (config) => config.boardId === boardNo,
            ) ?? null
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
                    return reply.memberId || reply.registerName || '회원';
                case 'MEMBER_NICKNAME':
                    return reply.memberNickname || '회원';
                case 'MEMBER_EMAIL':
                    return reply.memberEmail || '회원';
                case 'MEMBER_NAME':
                default:
                    return reply.registerName || '회원';
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

            addToast({
                message: t('댓글이 삭제되었습니다.'),
            });
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

            addToast({
                message: t('댓글이 수정되었습니다.'),
            });

            setIsEditing(false);
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        }
    });

    return (
        <FormProvider {...methods}>
            <li className={styles.commentListItem}>
                {isEditing ? (
                    <form
                        className={styles.commentContainer}
                        onSubmit={onSubmit}
                    >
                        <Column
                            align='start'
                            gap='sm'
                            style={{ width: '100%' }}
                        >
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
                        <Row gap={'sm'}>
                            <button
                                type='submit'
                                className={styles.registerButton}
                                disabled={isSubmitting}
                            >
                                수정
                            </button>
                            <button
                                type='button'
                                className={styles.registerButton}
                                onClick={toggleEdit}
                                disabled={isSubmitting}
                            >
                                취소
                            </button>
                        </Row>
                    </form>
                ) : (
                    <>
                        <div className={styles.commentItemHeader}>
                            <Row gap={'sm'} align='center'>
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
        </FormProvider>
    );
};

export default CommentItem;
