import { Image as ImageIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/comment-section/index.css';
import { RecipePreviewImage } from '@/components/recipe/preview-image';
import { TextArea } from '@/components/ui/input';
import { useRecipeCommentMutation, useRecipeMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import useFileUpload from '@/hooks/utils/useFileUpload';

interface CommentInputProps {
    recipeSno: number;
}

export const CommentInput = ({ recipeSno }: CommentInputProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { addToast } = useToast();

    const [commentText, setCommentText] = useState('');

    const {
        uploadFile,
        uploadFileHandler,
        deleteUploadFileImage,
        setUploadFile,
    } = useFileUpload({
        maxLength: 1,
        maxSize: 12 * 1024 * 1024,
    });

    const { createComment } = useRecipeCommentMutation();

    const { upload } = useRecipeMutation();

    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });

    const previewUrl = useMemo(() => {
        if (uploadFile.length === 0) {
            return '';
        }
        return URL.createObjectURL(uploadFile[0]);
    }, [uploadFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

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

            // 1. 이미지 업로드 필요 시 먼저 수행
            if (uploadFile.length > 0) {
                const formData = new FormData();
                formData.append('file', uploadFile[0]);

                const uploadRes = await upload.mutateAsync(formData);
                attachment = uploadRes.data.filePath;
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
            // 업로드 혹은 댓글 등록 실패 시
            addToast({
                message: t('댓글 등록에 실패했습니다.'),
                variant: 'error',
            });
        }
    };

    return (
        <div className={styles.commentInputArea}>
            {previewUrl && (
                <div className={styles.commentImages}>
                    <RecipePreviewImage
                        sno={0}
                        url={previewUrl}
                        onDeleteButtonClick={() =>
                            deleteUploadFileImage(uploadFile[0].name!)
                        }
                    />
                </div>
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
