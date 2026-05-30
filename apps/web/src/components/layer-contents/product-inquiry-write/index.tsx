import { filter, find, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import * as styles from '@/components/layer-contents/product-inquiry-write/index.css';
import type { DefaultModalLayoutProps } from '@/shared/components/layout';
import * as inquiryFormStyles from '@/features/mypage/product-inquiries/register-form/index.css';
import {
    InputCheckbox,
    InputContainer,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/shared/ui/input';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import { useProductInquiryMutation } from '@/hooks/mutations';
import { useMall } from '@/hooks/query/admin/mall';
import {
    useProductInquiry,
    useProductInquiryConfig,
} from '@/hooks/query/display/productInquiry';
import { useProfile } from '@/hooks/query/member/profile';
import useProductDetail from '@/hooks/query/product/product/useProductDetail';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import type {
    UpdateProductInquiryData,
    WriteProductInquiryData,
} from '@/models/display/productInquiry';
import {
    productInquiryFormSchema,
    type ProductInquiryFormSchemaType,
} from '@/schema/product-inquiry.schema';
import { ErrorMessage, TextArea } from '@/shared/components/form';

interface ProductInquiryWriteProps extends DefaultModalLayoutProps {
    productNo: number;
    inquiryNo?: number;
}

export const ProductInquiryWrite = ({
    productNo,
    inquiryNo,
    close,
}: ProductInquiryWriteProps) => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const isModify = (inquiryNo ?? 0) > 0;

    const { data: mallData } = useMall();
    const { data: productInquiryConfigData } = useProductInquiryConfig();
    const { data: profileData } = useProfile();

    const { data: productInquiryData } = useProductInquiry({
        productNo,
        inquiryNo: inquiryNo ?? 0,
        options: {
            enabled: isModify,
        },
    });

    const {
        data: productDetailData,
        isLoading,
        isError,
    } = useProductDetail({
        productNo,
        options: {
            enabled: productNo > 0,
        },
    });

    const productSummary = useMemo(() => {
        if (!productDetailData) {
            return null;
        }

        const { baseInfo } = productDetailData;
        const imageUrl =
            pipe(
                baseInfo.imageUrlInfo,
                map((item) => item.url),
                toArray,
            )[0] ?? '';

        return {
            productNo: baseInfo.productNo,
            productName: baseInfo.productName,
            imageUrl,
        };
    }, [productDetailData]);

    const inquiryTypeList = useMemo(() => {
        if (!mallData) {
            return [];
        }

        return pipe(
            mallData.productInquiryType,
            filter((item) => item.value !== 'REFUND'),
            map((item) => ({
                ...item,
                label: t(item.label),
            })),
            toArray,
        );
    }, [mallData, t]);

    const methods = useForm<ProductInquiryFormSchemaType>({
        resolver: zodResolver(productInquiryFormSchema),
        defaultValues: {
            tagValues: [],
            secreted: false,
            title: '',
            content: '',
            email: '',
            productNo,
            type: '',
        },
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (!profileData) {
            return;
        }

        if (!isModify) {
            reset((prev) => ({ ...prev, email: profileData.email ?? '' }), {
                keepFieldsRef: true,
            });
            return;
        }

        if (!productInquiryData) {
            return;
        }

        reset(
            (prev) => ({
                ...prev,
                email: profileData.email ?? '',
                title: productInquiryData.title ?? '',
                content: productInquiryData.content ?? '',
                type: productInquiryData.type,
                productNo: productInquiryData.productNo,
                secreted: productInquiryData.secreted,
                tagValues: productInquiryData.tagValueNos ?? [],
            }),
            {
                keepFieldsRef: true,
            },
        );
    }, [profileData, isModify, productInquiryData, reset]);

    const emailDomainRef = useRef<HTMLInputElement>(null);

    const {
        register: { mutate: registerProductInquiryMutate },
        update: { mutate: updateProductInquiryMutate },
    } = useProductInquiryMutation();

    const onSubmit = handleSubmit(async (data) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: isModify
                ? t('상품문의를 수정하시겠습니까?')
                : t('상품문의를 등록하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        if (isModify) {
            const submitData: UpdateProductInquiryData = {
                type: data.type as UpdateProductInquiryData['type'],
                title: data.title,
                secreted: data.secreted,
                content: data.content,
                tagValueNos: data.tagValues,
            };

            updateProductInquiryMutate(
                {
                    inquiryNo: inquiryNo ?? 0,
                    data: submitData,
                },
                {
                    onSuccess: () => {
                        addToast({
                            message: t('상품문의가 수정되었습니다.'),
                            variant: 'success',
                        });
                        close();
                    },
                },
            );

            return;
        }

        const submitData: WriteProductInquiryData = {
            type: data.type as WriteProductInquiryData['type'],
            title: data.title,
            secreted: data.secreted,
            email: data.email,
            content: data.content,
            tagValueNos: data.tagValues,
            productNo,
        };

        registerProductInquiryMutate(
            {
                productNo,
                data: submitData,
            },
            {
                onSuccess: () => {
                    addToast({
                        message: t('상품문의가 등록되었습니다.'),
                        variant: 'success',
                    });
                    close();
                },
            },
        );
    });

    if (!productNo || isError) {
        return (
            <NoResult
                text={t('상품 정보를 불러올 수 없습니다.')}
                style={{ height: '200px' }}
            />
        );
    }

    return (
        <FormProvider {...methods}>
            <form
                id='product-inquiry-write-form'
                className={styles.form}
                onSubmit={onSubmit}
            >
                <div className={styles.content}>
                    {inquiryTypeList.length > 0 ? (
                        <InputContainer>
                            <InputLabel isRequired>{t('문의 유형')}</InputLabel>

                            <Controller
                                control={control}
                                name='type'
                                render={({ field: { onChange, value } }) => {
                                    const selected = find(
                                        (o) => o.value === value,
                                        inquiryTypeList,
                                    );

                                    return (
                                        <Select
                                            placeholder={t(
                                                '유형을 선택해 주세요.',
                                            )}
                                            options={inquiryTypeList}
                                            value={selected}
                                            onChange={(opt) => {
                                                if (!opt) {
                                                    return;
                                                }
                                                onChange(opt.value);
                                            }}
                                        />
                                    );
                                }}
                            />

                            <ErrorMessage name='type' />
                        </InputContainer>
                    ) : null}

                    <InputContainer>
                        <InputLabel isRequired>{t('문의 상품')}</InputLabel>

                        <LoadingWrapper
                            isLoading={isLoading}
                            containerStyle={{ height: '82px' }}
                        >
                            {productSummary && (
                                <div className={inquiryFormStyles.productCard}>
                                    <div
                                        className={
                                            inquiryFormStyles.productThumb
                                        }
                                    >
                                        {productSummary.imageUrl ? (
                                            <img
                                                src={productSummary.imageUrl}
                                                alt=''
                                                className={
                                                    inquiryFormStyles.productThumbImg
                                                }
                                            />
                                        ) : null}
                                    </div>
                                    <div
                                        className={
                                            inquiryFormStyles.productMeta
                                        }
                                    >
                                        <div
                                            className={
                                                inquiryFormStyles.productName
                                            }
                                        >
                                            {productSummary.productName}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </LoadingWrapper>

                        <ErrorMessage name='productNo' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('제목')}</InputLabel>
                        <InputField
                            placeholder={t('제목을 입력해 주세요.')}
                            maxLength={50}
                            {...register('title')}
                            data-error={!!errors.title}
                        />
                        <ErrorMessage name='title' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('내용')}</InputLabel>
                        <TextArea
                            className={inquiryFormStyles.textArea}
                            placeholder={t('내용을 입력해 주세요.')}
                            data-lenis-prevent
                            maxLength={1000}
                            {...register('content')}
                            data-error={!!errors.content}
                        />
                        <ErrorMessage name='content' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('이메일')}</InputLabel>

                        <Controller
                            name='email'
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                const [id = '', domain = ''] =
                                    value?.split('@') ?? [];

                                return (
                                    <InputFieldContainer>
                                        <div
                                            className={
                                                inquiryFormStyles.emailRow
                                            }
                                        >
                                            <InputField
                                                className={
                                                    inquiryFormStyles.emailField
                                                }
                                                readOnly={isModify}
                                                value={id}
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
                                            <span
                                                className={
                                                    inquiryFormStyles.emailAt
                                                }
                                            >
                                                @
                                            </span>
                                            <InputField
                                                className={
                                                    inquiryFormStyles.emailField
                                                }
                                                ref={emailDomainRef}
                                                readOnly={isModify}
                                                value={domain}
                                                onChange={(e) => {
                                                    onChange(
                                                        `${id}@${e.target.value}`,
                                                    );
                                                }}
                                                data-error={!!errors.email}
                                            />

                                            {!isModify ? (
                                                <Select
                                                    placeholder={t('직접 입력')}
                                                    options={EMAIL_DOMAIN_LIST}
                                                    value={find(
                                                        (o) =>
                                                            o.value === domain,
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
                                            ) : null}
                                        </div>
                                    </InputFieldContainer>
                                );
                            }}
                        />

                        <ErrorMessage name='email' />
                    </InputContainer>

                    {productInquiryConfigData?.secretUsable ? (
                        <InputContainer>
                            <InputLabel isRequired>{t('비밀글')}</InputLabel>

                            <Controller
                                control={control}
                                name='secreted'
                                render={({
                                    field: { onChange, value, ...rest },
                                }) => (
                                    <label className={styles.checkboxLabel}>
                                        <InputCheckbox
                                            {...rest}
                                            checked={value}
                                            onCheckedChange={onChange}
                                        />
                                        <span>{t('비밀글 설정')}</span>
                                    </label>
                                )}
                            />
                        </InputContainer>
                    ) : null}
                </div>

                <p className={styles.description}>
                    {productInquiryConfigData?.description}
                </p>
            </form>
        </FormProvider>
    );
};
