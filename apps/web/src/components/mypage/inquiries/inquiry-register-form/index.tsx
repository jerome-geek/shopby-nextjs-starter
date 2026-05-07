import { find, isEmpty, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import upload from '@/api/storage/image';
import * as formStyles from '@/components/mypage/common/mypage-form/index.css';
import * as styles from '@/components/mypage/inquiries/inquiry-register-form/index.css';
import { InquiryTypeList } from '@/components/mypage/inquiries/inquiry-type-list';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import { ErrorMessage } from '@/components/ui/form';
import {
    InputCheckbox,
    InputContainer,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
    TextArea,
} from '@/components/ui/input';
import { EMAIL_DOMAIN_LIST, PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import { PATHS } from '@/const/paths';
import { useInquiryMutation } from '@/hooks/mutations';
import { useInquiry, useInquiryConfig } from '@/hooks/query/manage/inquiry';
import { useProfile } from '@/hooks/query/member/profile';
import { useToast } from '@/hooks/ui';
import { useDialog, useGlobal } from '@/hooks/utils';
import type { UploadFileBlob } from '@/hooks/utils/useFileUpload';
import type { UpdateInquiryData } from '@/models/manage/inquiry';
import {
    registerInquirySchema,
    type RegisterInquirySchemaType,
} from '@/schema/inquiry.schema';

export interface InquiryRegisterFormProps {
    inquiryNo?: number;
}

export const InquiryRegisterForm = ({
    inquiryNo = 0,
}: InquiryRegisterFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isKorean } = useGlobal();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const isModify = inquiryNo > 0;

    const emailDomainRef = useRef<HTMLInputElement>(null);

    const { data: inquiryConfigData } = useInquiryConfig();
    const { data: profileData } = useProfile();
    const { data: inquiryData, isFetched: isInquiryFetched } = useInquiry({
        inquiryNo,
        options: { enabled: isModify },
    });

    const {
        register: { mutate: registerInquiryMutate },
        update: { mutate: updateInquiryMutate },
    } = useInquiryMutation();

    const isAttachmentAvailable = !!inquiryConfigData?.attachmentUsed;
    const isEmailDisabled = !!profileData?.email;
    const isMobileNoDisabled = !!profileData?.mobileNo;

    const [contentPlaceholder, setContentPlaceholder] = useState('');
    const [uploadFileList, setUploadFileList] = useState<
        (string | UploadFileBlob)[]
    >([]);

    const onTypeDescriptionChange = useCallback((description: string) => {
        setContentPlaceholder(description.trim());
    }, []);

    const methods = useForm<RegisterInquirySchemaType>({
        resolver: zodResolver(registerInquirySchema),
        defaultValues: {
            inquiryTypeNo: 0,
            answerEmailSendYn: true,
            answerSmsSendYn: true,
            email: '',
            mobileNo: {
                prefix: isKorean ? PHONE_PREFIX_NUMBER_LIST[0]!.value : '',
                middle: '',
                suffix: '',
            },
            inquiryTitle: '',
            inquiryContent: '',
        },
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = methods;

    useEffect(() => {
        if (!profileData) {
            return;
        }

        const profileSettingData = {
            email: profileData.email ?? '',
            mobileNo: isKorean
                ? {
                      prefix:
                          profileData.mobileNo?.slice(0, 3) ??
                          PHONE_PREFIX_NUMBER_LIST[0]!.value,
                      middle: profileData.mobileNo?.slice(3, 7) ?? '',
                      suffix: profileData.mobileNo?.slice(7, 11) ?? '',
                  }
                : {
                      prefix: profileData.mobileNo ?? '',
                      middle: '',
                      suffix: '',
                  },
        };

        if (!isModify) {
            reset(
                (prev) => ({
                    ...prev,
                    ...profileSettingData,
                }),
                {
                    keepFieldsRef: true,
                },
            );
            return;
        }

        if (!inquiryData) {
            return;
        }

        reset(
            (prev) => ({
                ...prev,
                ...profileSettingData,
                inquiryTypeNo: inquiryData.inquiryType.inquiryTypeNo,
                inquiryTitle: inquiryData.inquiryTitle,
                inquiryContent: inquiryData.inquiryContent,
                answerEmailSendYn: inquiryData.answerEmailSend,
                answerSmsSendYn: inquiryData.answerSmsSend,
                originalFileName: inquiryData?.originalImageUrls ?? [],
                uploadedFileName: inquiryData?.imageUrls ?? [],
            }),
            {
                keepFieldsRef: true,
            },
        );
    }, [isModify, inquiryData, reset, profileData, isKorean]);

    const buildMobileNo = (data: RegisterInquirySchemaType) => {
        if (isKorean) {
            return `${data.mobileNo.prefix}${data.mobileNo.middle}${data.mobileNo.suffix}`;
        }

        return data.mobileNo.prefix;
    };

    const onSubmit = handleSubmit(async (data) => {
        const isConfirmed = await openAsyncDialog({
            type: 'confirm',
            message: `1:1 문의를 ${isModify ? '수정' : '등록'}하시겠습니까?`,
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isConfirmed) {
            return;
        }

        let uploadedImageList: string[] = [];

        if (!isEmpty(uploadFileList)) {
            const response = await Promise.all(
                uploadFileList.map((image) => {
                    if (typeof image === 'string') {
                        return Promise.resolve({
                            data: { imageUrl: image },
                        });
                    }

                    const formData = new FormData();
                    formData.append('file', image as Blob);

                    return upload.uploadImage({ data: formData });
                }),
            );

            uploadedImageList = pipe(
                response,
                map((res) => res.data.imageUrl),
                toArray,
            );
        }

        const originalFileName = uploadFileList.map((file) => {
            if (typeof file === 'string') {
                const fileIndex = data.uploadedFileName?.findIndex(
                    (url) => url === file,
                );

                if (fileIndex) {
                    return data.originalFileName?.[fileIndex] ?? '';
                }

                return file;
            }

            return file.name || '';
        });

        if (isModify) {
            const patchData: UpdateInquiryData = {
                inquiryTitle: data.inquiryTitle,
                inquiryContent: data.inquiryContent,
                answerEmailSendYn: data.answerEmailSendYn,
                answerSmsSendYn: data.answerSmsSendYn,
                originalFileName,
                uploadedFileName: uploadedImageList,
            };

            // TODO: (patch) api 사용해도 첨부파일 삭제 안 되는 현상 있음 샵바이 확인 후 로직 수정 필요
            updateInquiryMutate(
                {
                    inquiryNo,
                    data: patchData,
                },
                {
                    onSuccess: () => {
                        addToast({
                            message: t('1:1 문의가 수정되었습니다.'),
                        });
                        router.push(PATHS.MYPAGE.INQUIRIES.MAIN);
                    },
                },
            );

            return;
        }

        const parsed = registerInquirySchema.parse(data);

        registerInquiryMutate(
            {
                data: {
                    ...parsed,
                    mobileNo: buildMobileNo(parsed),
                    originalFileName,
                    uploadedFileName: uploadedImageList,
                },
            },
            {
                onSuccess: () => {
                    addToast({
                        message: t('1:1 문의가 등록되었습니다.'),
                    });
                    router.push(PATHS.MYPAGE.INQUIRIES.MAIN);
                },
            },
        );
    });

    const contentHint = contentPlaceholder || t('내용을 입력해 주세요.');

    return (
        <FormProvider {...methods}>
            <form className={formStyles.form} onSubmit={onSubmit}>
                <div className={formStyles.content}>
                    <InputContainer>
                        <InputLabel isRequired>{t('문의 유형')}</InputLabel>
                        <InquiryTypeList
                            disabled={isModify}
                            onTypeDescriptionChange={onTypeDescriptionChange}
                        />
                        <ErrorMessage name='inquiryTypeNo' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('이메일 주소')}</InputLabel>

                        <Controller
                            name='email'
                            control={control}
                            render={({
                                field: { onChange, value, ...rest },
                            }) => {
                                const [id = '', domain = ''] =
                                    value?.split('@') ?? [];

                                return (
                                    <InputFieldContainer {...rest}>
                                        <div className={styles.emailRow}>
                                            <InputField
                                                className={styles.emailField}
                                                value={id}
                                                readOnly={isEmailDisabled}
                                                placeholder={t(
                                                    '이메일을 입력해주세요.',
                                                )}
                                                onChange={(e) => {
                                                    onChange(
                                                        `${e.target.value}@${domain}`,
                                                    );
                                                }}
                                                data-error={!!errors.email}
                                            />
                                            <span className={styles.emailAt}>
                                                @
                                            </span>
                                            <InputField
                                                className={styles.emailField}
                                                readOnly={isEmailDisabled}
                                                ref={emailDomainRef}
                                                value={domain}
                                                onChange={(e) => {
                                                    onChange(
                                                        `${id}@${e.target.value}`,
                                                    );
                                                }}
                                                data-error={!!errors.email}
                                            />
                                        </div>

                                        {!isEmailDisabled && (
                                            <Select
                                                isSearchable
                                                placeholder={t('직접 입력')}
                                                options={[...EMAIL_DOMAIN_LIST]}
                                                formatOptionLabel={(option) =>
                                                    t(option.label)
                                                }
                                                value={find(
                                                    (item) =>
                                                        item.value === domain,
                                                    EMAIL_DOMAIN_LIST,
                                                )}
                                                onChange={(item) => {
                                                    if (!item) {
                                                        return;
                                                    }

                                                    if (item.value === '') {
                                                        emailDomainRef.current?.focus();
                                                    }

                                                    onChange(
                                                        `${id}@${item.value}`,
                                                    );
                                                }}
                                            />
                                        )}
                                    </InputFieldContainer>
                                );
                            }}
                        />

                        <ErrorMessage name='email' />

                        <Controller
                            name='answerEmailSendYn'
                            control={control}
                            render={({
                                field: { onChange, value, ...rest },
                            }) => (
                                <label className={formStyles.checkboxLabel}>
                                    <InputCheckbox
                                        {...rest}
                                        checked={value}
                                        onCheckedChange={onChange}
                                    />
                                    <span>{t('답변알림 받기')}</span>
                                </label>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>{t('휴대전화번호')}</InputLabel>

                        {isKorean ? (
                            <InputFieldContainer gridRatio={[1, 1, 1]}>
                                <Controller
                                    control={control}
                                    name='mobileNo.prefix'
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Select
                                            isDisabled={isMobileNoDisabled}
                                            options={[
                                                ...PHONE_PREFIX_NUMBER_LIST,
                                            ]}
                                            value={find(
                                                (item) => item.value === value,
                                                PHONE_PREFIX_NUMBER_LIST,
                                            )}
                                            onChange={(selectedOption) => {
                                                if (selectedOption) {
                                                    onChange(
                                                        selectedOption.value,
                                                    );
                                                }
                                            }}
                                        />
                                    )}
                                />

                                <InputField
                                    type='text'
                                    inputMode='numeric'
                                    maxLength={4}
                                    readOnly={isMobileNoDisabled}
                                    {...register('mobileNo.middle')}
                                    data-error={!!errors.mobileNo}
                                />

                                <InputField
                                    type='text'
                                    inputMode='numeric'
                                    maxLength={4}
                                    readOnly={isMobileNoDisabled}
                                    {...register('mobileNo.suffix')}
                                    data-error={!!errors.mobileNo}
                                />
                            </InputFieldContainer>
                        ) : (
                            <InputFieldContainer>
                                <InputField
                                    type='text'
                                    readOnly={isMobileNoDisabled}
                                    placeholder={t('‘-’없이 입력해 주세요.')}
                                    {...register('mobileNo.prefix')}
                                    data-error={!!errors.mobileNo}
                                />
                            </InputFieldContainer>
                        )}

                        <ErrorMessage name='mobileNo' />

                        <Controller
                            name='answerSmsSendYn'
                            control={control}
                            render={({
                                field: { onChange, value, ...rest },
                            }) => (
                                <label className={formStyles.checkboxLabel}>
                                    <InputCheckbox
                                        {...rest}
                                        checked={value}
                                        onCheckedChange={onChange}
                                    />
                                    <span>{t('답변알림 받기')}</span>
                                </label>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('제목')}</InputLabel>
                        <InputField
                            placeholder={t('제목을 입력해 주세요.')}
                            {...register('inquiryTitle')}
                            maxLength={50}
                            data-error={!!errors.inquiryTitle}
                        />
                        <ErrorMessage name='inquiryTitle' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('내용')}</InputLabel>
                        <TextArea
                            className={styles.textArea}
                            placeholder={contentHint}
                            {...register('inquiryContent')}
                            data-lenis-prevent
                            maxLength={1000}
                            data-error={!!errors.inquiryContent}
                        />
                        <ErrorMessage name='inquiryContent' />
                    </InputContainer>

                    {isAttachmentAvailable &&
                        (!isModify || (isModify && isInquiryFetched)) && (
                            <InputContainer>
                                <InputLabel>{t('사진 첨부')}</InputLabel>
                                <FileUpload
                                    key={
                                        isModify
                                            ? `${inquiryNo}-${isInquiryFetched}`
                                            : 'register'
                                    }
                                    initialFileList={
                                        inquiryData?.imageUrls ?? []
                                    }
                                    setFileList={setUploadFileList}
                                />
                            </InputContainer>
                        )}
                </div>

                <div className={formStyles.actions}>
                    <Button
                        type='button'
                        frame='outlined'
                        variant='secondary'
                        className={formStyles.actionButton}
                        onClick={() => router.back()}
                    >
                        {t('돌아가기')}
                    </Button>
                    <Button
                        type='submit'
                        frame='solid'
                        variant='primary'
                        className={formStyles.actionButton}
                        disabled={isSubmitting}
                    >
                        {t(isModify ? '수정하기' : '등록하기')}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
