import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Seo from '@/components/common/seo';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import upload from '@/api/storage/image';
import { Button } from '@/components/ui';
import FileUpload from '@/components/ui/file-upload';
import {
    InputCheckbox,
    InputContainer,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { Column, Row } from '@/components/ui/layout/flex';
import useBoardMutation from '@/hooks/mutations/useBoardMutation';
import {
    useBoardArticle,
    useBoardCategoryList,
} from '@/hooks/query/manage/board';
import { useTermList } from '@/hooks/query/manage/terms';
import { useProfile } from '@/hooks/query/member/profile';
import useBoardConfig from '@/hooks/suspenseQuery/manage/board/useBoardConfig';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import { UploadFileBlob } from '@/hooks/utils/useFileUpload';
import type { ImagesType } from '@/models/manage';
import type { PostArticleParams } from '@/models/manage/board';
import * as styles from '@/pages/boards/[boardId]/write/index.css';
import {
    articleWriteSchema,
    ArticleWriteSchemaType,
} from '@/schema/article.schema';
import { ErrorMessage, TextArea } from '@/shared/components/form';

interface CategoryOption {
    label: string;
    value: number;
}

const ArticleWritePage = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();

    const router = useRouter();

    const boardNo = router.query.boardId as string;

    const articleNo = router.query.articleNo;

    const isModify = !!articleNo;

    const isLogin = useAuth();

    const { data: profileData } = useProfile();

    const { data: termData } = useTermList({
        searchParams: {
            termsTypes: ['PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE'],
        },
    });

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

    const fieldVisibility = {
        isVisiblePassword: isLogin === false,
        isVisibleTerm:
            !isLogin &&
            termData?.pi_collection_and_use_for_guest_on_article?.used,
        isVisibleAttachment: currentBoardConfig?.attachmentUsed,
        isVisibleSecret: currentBoardConfig?.secretPostingUsed,
        isVisibleCategory: currentBoardConfig?.categoryUsed,
        isVisibleThumbnail: currentBoardConfig?.thumbnailUsed,
    };

    const { data: categoryData } = useBoardCategoryList({
        boardNo: boardNo || '0',
        options: {
            enabled: !!boardNo,
        },
    });

    const { data: articleData } = useBoardArticle({
        boardNo: boardNo || '0',
        articleNo: Number(articleNo) || 0,
        options: {
            enabled: isModify,
        },
    });

    const articleWriteSchemaResolver = articleWriteSchema({
        isLogin: !!isLogin,
        isTermRequired: !!fieldVisibility.isVisibleTerm,
        isCategoryRequired: !!fieldVisibility.isVisibleCategory,
    });

    const categoryOptions = useMemo<CategoryOption[]>(() => {
        if (!categoryData) {
            return [];
        }

        return categoryData.map((category) => ({
            label: category.label,
            value: category.categoryNo,
        }));
    }, [categoryData]);

    const emptyArticleWriteDefaults = useMemo<ArticleWriteSchemaType>(
        () => ({
            writerName: '',
            password: '',
            boardCategoryNo: undefined,
            articleTitle: '',
            articleContent: '',
            thumbnailUrl: undefined,
            images: [],
            secreted: false,
            agreeTerm: false,
        }),
        [],
    );

    const articleWriteValuesFromData = useMemo(():
        | ArticleWriteSchemaType
        | undefined => {
        if (!articleData) {
            return undefined;
        }

        return {
            writerName: isLogin
                ? (profileData?.memberName ?? articleData.registerName ?? '')
                : (articleData.registerName ?? ''),
            password: '',
            boardCategoryNo: articleData.categoryNo ?? undefined,
            articleTitle: articleData.title ?? '',
            articleContent: articleData.content ?? '',
            thumbnailUrl: articleData.imageUrl || undefined,
            images: (articleData.attachments ?? []).map(
                (a) => a.downloadFileUrl,
            ),
            secreted: articleData.secreted ?? false,
            agreeTerm: !!fieldVisibility.isVisibleTerm,
        };
    }, [articleData, isLogin, fieldVisibility.isVisibleTerm, profileData]);

    const methods = useForm<ArticleWriteSchemaType>({
        resolver: zodResolver(articleWriteSchemaResolver),
        defaultValues: emptyArticleWriteDefaults,
        values: isModify ? articleWriteValuesFromData : undefined,
    });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
        if (isModify) {
            return;
        }

        reset({
            writerName: profileData?.memberName ?? '',
            password: '',
            boardCategoryNo: undefined,
            articleTitle: '',
            articleContent: '',
            thumbnailUrl: undefined,
            images: [],
            secreted: false,
            agreeTerm: false,
        });
    }, [isModify, profileData, reset]);

    const onThumbnailFileListChange = useCallback(
        (fileList: (string | UploadFileBlob)[]) => {
            const first = fileList[0];
            if (!first) {
                setValue('thumbnailUrl', undefined, { shouldValidate: true });
                return;
            }
            setValue(
                'thumbnailUrl',
                typeof first === 'string' ? first : (first as File),
                { shouldValidate: true },
            );
        },
        [setValue],
    );

    const onImagesFileListChange = useCallback(
        (fileList: (string | UploadFileBlob)[]) => {
            setValue(
                'images',
                fileList.length === 0
                    ? []
                    : fileList.map((f) =>
                          typeof f === 'string' ? f : (f as File),
                      ),
                { shouldValidate: true },
            );
        },
        [setValue],
    );

    const { register: registerMutate, update: updateMutate } =
        useBoardMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const uploadImageFile = async (file: File) => {
                const formData = new FormData();
                formData.append('file', file);
                const { data: imageData } = await upload.uploadImage({
                    data: formData,
                });
                return imageData;
            };

            let thumbnailUrlStr: string | undefined;
            if (data.thumbnailUrl) {
                if (data.thumbnailUrl instanceof File) {
                    const imageData = await uploadImageFile(data.thumbnailUrl);
                    thumbnailUrlStr = imageData.imageUrl;
                } else {
                    thumbnailUrlStr = data.thumbnailUrl;
                }
            }

            let imagesPayload: ImagesType[] | undefined;
            if (data.images?.length) {
                imagesPayload = await Promise.all(
                    data.images.map(async (item) => {
                        if (item instanceof File) {
                            const imageData = await uploadImageFile(item);
                            return {
                                originalFileName: imageData.originalFileName,
                                uploadedFileName: imageData.imageUrl,
                            };
                        }
                        return {
                            originalFileName:
                                item.split('/').pop()?.split('?')[0] ?? item,
                            uploadedFileName: item,
                        };
                    }),
                );
            }

            const submitData: PostArticleParams = {
                articleTitle: data.articleTitle,
                articleContent: data.articleContent,
                secreted: data.secreted,
                postSearchTags: null,
                boardCategoryNo: data.boardCategoryNo,
                ...(!isLogin && {
                    guestName: data.writerName,
                    password: data.password,
                }),
                ...(thumbnailUrlStr && { thumbnailUrl: thumbnailUrlStr }),
                ...(imagesPayload?.length && { images: imagesPayload }),
            };

            if (isModify) {
                await updateMutate.mutateAsync({
                    boardNo,
                    articleNo: Number(articleNo),
                    data: submitData,
                });

                addToast({
                    message: t('게시글이 수정되었습니다.'),
                });
            } else {
                await registerMutate.mutateAsync({
                    boardNo,
                    data: submitData,
                });

                addToast({
                    message: t('게시글이 등록되었습니다.'),
                });
            }

            router.push(`/boards/${boardNo}`);
        } catch (error) {
            if (isAxiosError(error)) {
                addToast({
                    message:
                        error.response?.data?.message ??
                        t('이미지 업로드에 실패했습니다.'),
                });
                return;
            }
            throw error;
        }
    });

    return (
        <FormProvider {...methods}>
            <Seo title={isModify ? '게시글 수정' : '게시글 작성'} noindex />
            <Column gap='lg' className={styles.page}>
                {!isMobile && (
                    <h1 className={styles.pageTitle}>
                        {t(`${isModify ? '게시글 수정' : '게시글 작성'}`)}
                    </h1>
                )}

                <div className={styles.container}>
                    <form
                        id='article-write-form'
                        onSubmit={onSubmit}
                        className={styles.form}
                    >
                        <InputFieldContainer>
                            <InputLabel isRequired>작성자</InputLabel>
                            <InputField
                                readOnly={(isLogin || isModify) ?? false}
                                {...register('writerName')}
                                type='text'
                                data-error={!!errors.writerName}
                            />
                            <ErrorMessage name='writerName' />
                        </InputFieldContainer>

                        {fieldVisibility.isVisiblePassword && (
                            <InputContainer>
                                <InputLabel isRequired>비밀번호</InputLabel>
                                <InputField
                                    {...register('password')}
                                    type='password'
                                    data-error={!!errors.password}
                                />
                                <ErrorMessage name='password' />
                            </InputContainer>
                        )}

                        {fieldVisibility.isVisibleCategory && (
                            <InputContainer>
                                <InputLabel isRequired>카테고리</InputLabel>
                                <Controller
                                    control={control}
                                    name='boardCategoryNo'
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={categoryOptions}
                                            placeholder='카테고리를 선택해 주세요.'
                                            value={
                                                categoryOptions.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value,
                                                ) ?? null
                                            }
                                            onChange={(option) =>
                                                field.onChange(option?.value)
                                            }
                                        />
                                    )}
                                />
                                <ErrorMessage name='boardCategoryNo' />
                            </InputContainer>
                        )}

                        <InputFieldContainer>
                            <InputLabel isRequired>제목</InputLabel>
                            <InputField
                                {...register('articleTitle')}
                                type='text'
                                data-error={!!errors.articleTitle}
                            />
                            <ErrorMessage name='articleTitle' />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputLabel isRequired>내용</InputLabel>
                            <TextArea
                                {...register('articleContent')}
                                data-error={!!errors.articleContent}
                            />
                            <ErrorMessage name='articleContent' />
                        </InputFieldContainer>

                        {fieldVisibility.isVisibleThumbnail && (
                            <InputContainer>
                                <InputLabel>대표 이미지</InputLabel>
                                <Column gap='8px'>
                                    <FileUpload
                                        key={
                                            isModify
                                                ? articleData
                                                    ? `thumb-${articleData.articleNo}`
                                                    : 'thumb-loading'
                                                : 'thumb-new'
                                        }
                                        initialFileList={
                                            isModify && articleData?.imageUrl
                                                ? [articleData.imageUrl]
                                                : []
                                        }
                                        setFileList={onThumbnailFileListChange}
                                        maxLength={1}
                                    />
                                    <ErrorMessage name='thumbnailUrl' />
                                    <p
                                        className={
                                            styles.imageUploadDescription
                                        }
                                    >
                                        - 업로드 용량은 5MB 이하로만 가능합니다.
                                    </p>
                                </Column>
                            </InputContainer>
                        )}

                        {fieldVisibility.isVisibleAttachment && (
                            <InputContainer>
                                <InputLabel>첨부 이미지</InputLabel>
                                <Column gap='8px'>
                                    <FileUpload
                                        key={
                                            isModify
                                                ? articleData
                                                    ? `img-${articleData.articleNo}`
                                                    : 'img-loading'
                                                : 'img-new'
                                        }
                                        initialFileList={
                                            articleData?.attachments?.map(
                                                (a) => a.downloadFileUrl,
                                            ) ?? []
                                        }
                                        setFileList={onImagesFileListChange}
                                        maxLength={10}
                                    />
                                    <ErrorMessage name='images' />
                                    <p
                                        className={
                                            styles.imageUploadDescription
                                        }
                                    >
                                        - 업로드 용량은 5MB 이하로만 가능합니다.
                                    </p>
                                </Column>
                            </InputContainer>
                        )}

                        {fieldVisibility.isVisibleSecret && (
                            <label className={styles.label}>
                                <Controller
                                    name='secreted'
                                    control={control}
                                    render={({ field }) => (
                                        <InputCheckbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <span>비밀글 설정</span>
                            </label>
                        )}

                        {fieldVisibility.isVisibleTerm && (
                            <Column gap='8px'>
                                <label className={styles.label}>
                                    <Controller
                                        name='agreeTerm'
                                        control={control}
                                        render={({ field }) => (
                                            <InputCheckbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <span>
                                        비회원 글작성에 대한 개인정보 수집 및
                                        이용동의(필수)
                                    </span>
                                </label>
                                <ErrorMessage name='agreeTerm' />

                                <div
                                    className={styles.termContents}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            termData
                                                ?.pi_collection_and_use_for_guest_on_article
                                                .contents ?? '',
                                    }}
                                />
                            </Column>
                        )}
                    </form>
                </div>

                <Row
                    justify='center'
                    gap='8px'
                    className={styles.buttonContainer}
                >
                    <Button
                        frame='outlined'
                        variant='secondary'
                        type='button'
                        onClick={() => router.back()}
                    >
                        뒤로가기
                    </Button>
                    <Button
                        frame='solid'
                        variant='primary'
                        type='submit'
                        form='article-write-form'
                        disabled={isSubmitting}
                    >
                        {t(`${isModify ? '수정' : '등록'}하기`)}
                    </Button>
                </Row>
            </Column>
        </FormProvider>
    );
};

export default ArticleWritePage;
