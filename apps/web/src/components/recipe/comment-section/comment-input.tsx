import { each, join, map, pipe, toArray } from '@fxts/core';
import { Image as ImageIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/comment-section/index.css';
import { RecipePreviewImage } from '@/components/recipe/preview-image';
import { TextArea } from '@/components/ui/input';
import { useCommonMutation, useRecipeCommentMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useCustomDialog } from '@/hooks/ui';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import useFileUpload from '@/hooks/utils/useFileUpload';
import { isAxiosError } from 'axios';

interface CommentInputProps {
    recipeSno: number;
}

export const CommentInput = ({ recipeSno }: CommentInputProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { addToast } = useToast();
    const { openLoginDialog, openImageDetail } = useCustomDialog();

    const [commentText, setCommentText] = useState('');

    const {
        uploadFile,
        uploadFileHandler,
        deleteUploadFileImage,
        setUploadFile,
    } = useFileUpload({
        maxLength: 5,
        maxSize: 12 * 1024 * 1024,
    });

    const { createComment } = useRecipeCommentMutation();

    const { upload } = useCommonMutation();

    const { data: profileData } = useProfile();

    const handleTextAreaClick = () => {
        if (!isLogin) {
            openLoginDialog();
        }
    };

    const previewUrls = useMemo(() => {
        return pipe(
            uploadFile,
            map((file) => URL.createObjectURL(file)),
            toArray,
        );
    }, [uploadFile]);

    useEffect(() => {
        return () => {
            each((url) => URL.revokeObjectURL(url), previewUrls);
        };
    }, [previewUrls]);

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

        if (!profileData) {
            return;
        }

        try {
            let attachment = '';

            // 1. 이미지 업로드 필요 시 먼저 수행 (최대 5개, '|' 구분자로 결합)
            if (uploadFile.length > 0) {
                const uploadResults = await Promise.all(
                    uploadFile.map((file) => {
                        const formData = new FormData();
                        formData.append('file', file);
                        return upload.mutateAsync(formData);
                    }),
                );
                attachment = pipe(
                    uploadResults,
                    map((res) => res.data.filePath),
                    join('|'),
                );
            }

            // 2. 댓글 등록 수행
            await createComment.mutateAsync({
                data: {
                    contentType: 'BOARD',
                    contentSno: recipeSno,
                    comment: commentText,
                    memberId: profileData.memberId,
                    memberNo: profileData.memberNo,
                    attachment,
                },
            });

            // 3. 전체 성공 시 UI 초기화 및 토스트 출력
            setCommentText('');
            setUploadFile([]);
            addToast({
                message: t('댓글이 등록되었습니다.'),
                variant: 'success',
            });
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            const message = isAxiosError(error)
                ? (error.response?.data.message ??
                  t(
                      '댓글 등록에 실패했습니다.<br/>잠시 후 다시 시도해 주세요.',
                  ))
                : t(
                      '댓글 등록에 실패했습니다.<br/>잠시 후 다시 시도해 주세요.',
                  );

            // TODO: 업로드 혹은 댓글 등록 실패 시
            addToast({
                message,
                variant: 'error',
            });
        }
    };

    return (
        <div className={styles.commentInputArea}>
            {previewUrls.length > 0 && (
                <ul className={styles.commentImages}>
                    {previewUrls.map((url, index) => (
                        <li
                            key={url}
                            className={styles.commentImageItem}
                            onClick={() => openImageDetail(url)}
                            style={{ cursor: 'pointer' }}
                        >
                            <RecipePreviewImage
                                sno={index}
                                url={url}
                                onDeleteButtonClick={() =>
                                    deleteUploadFileImage(
                                        uploadFile[index].name!,
                                    )
                                }
                            />
                        </li>
                    ))}
                </ul>
            )}
            <TextArea
                className={styles.commentTextArea}
                placeholder={
                    isLogin
                        ? t('댓글을 남겨주세요.')
                        : t('로그인 후 이용 가능합니다.')
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onClick={handleTextAreaClick}
                readOnly={!isLogin}
            />

            <div className={styles.commentToolbar}>
                <label
                    className={styles.attachButton}
                    style={{
                        cursor: isLogin ? 'pointer' : 'not-allowed',
                        opacity: isLogin ? 1 : 0.5,
                    }}
                >
                    <input
                        type='file'
                        accept='image/*'
                        style={{ display: 'none' }}
                        onChange={uploadFileHandler}
                        disabled={!isLogin}
                    />
                    <ImageIcon size={18} /> {t('사진')}
                </label>
                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={
                        !isLogin ||
                        createComment.isPending ||
                        upload.isPending ||
                        commentText === ''
                    }
                >
                    {t('등록하기')}
                </button>
            </div>
        </div>
    );
};
