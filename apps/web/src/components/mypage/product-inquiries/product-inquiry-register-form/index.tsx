import { find, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ProductSelectBottomSheet } from '@/components/bottom-sheet/product-select';
import { CloseIcon } from '@/components/icons';
import { ProductSelectModal } from '@/components/modal/product-select';
import * as formStyles from '@/components/mypage/common/mypage-form/index.css';
import * as styles from '@/components/mypage/product-inquiries/product-inquiry-register-form/index.css';
import { Button } from '@/components/ui/button';
import {
    InputCheckbox,
    InputContainer,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import { PATHS } from '@/const/paths';
import { useProductInquiryMutation } from '@/hooks/mutations';
import { useMall } from '@/hooks/query/admin/mall';
import {
    useProductInquiry,
    useProductInquiryConfig,
} from '@/hooks/query/display/productInquiry';
import { useProfile } from '@/hooks/query/member/profile';
import { useToast } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import type {
    UpdateProductInquiryData,
    WriteProductInquiryData,
} from '@/models/display/productInquiry';
import type { SearchProductItem } from '@/models/product/product';
import {
    productInquiryFormSchema,
    type ProductInquiryFormSchemaType,
} from '@/schema/product-inquiry.schema';
import { ErrorMessage, TextArea } from '@/shared/components/form';

export interface ProductInquiryRegisterFormProps {
    inquiryNo?: number;
}

export const ProductInquiryRegisterForm = ({
    inquiryNo = 0,
}: ProductInquiryRegisterFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const { isMobile } = useResponsive();

    const isModify = inquiryNo > 0;

    const productNo = Number(router.query.productNo) || 0;

    const { data: mallData } = useMall();
    const { data: productInquiryConfigData } = useProductInquiryConfig();
    const { data: profileData } = useProfile();

    const { data: productInquiryData } = useProductInquiry({
        productNo,
        inquiryNo,
        options: { enabled: isModify },
    });

    const inquiryTypeList = useMemo(() => {
        if (!mallData) {
            return [];
        }

        return pipe(
            mallData.productInquiryType,
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
        setValue,
        formState: { isSubmitting, errors },
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
            }),
            {
                keepFieldsRef: true,
            },
        );
    }, [profileData, isModify, productInquiryData, reset]);

    const [productInfo, setProductInfo] = useState<SearchProductItem | null>(
        null,
    );

    const onProductSelect = (productInfo: SearchProductItem) => {
        setProductInfo(productInfo);
        setValue('productNo', productInfo.productNo, { shouldValidate: true });
    };

    const onProductReset = () => {
        setProductInfo(null);
        setValue('productNo', 0, { shouldValidate: true });
    };

    const productName = isModify
        ? productInquiryData?.productName
        : (productInfo?.productName ?? '');

    const imageUrl = isModify
        ? productInquiryData?.imageUrl
        : (productInfo?.listImageUrls?.[0] ?? '');

    const openProductSelect = () => {
        overlay.open((props) => {
            return isMobile ? (
                <ProductSelectBottomSheet
                    {...props}
                    setProductInfo={onProductSelect}
                />
            ) : (
                <ProductSelectModal
                    {...props}
                    setProductInfo={onProductSelect}
                />
            );
        });
    };

    const emailDomainRef = useRef<HTMLInputElement>(null);

    const {
        register: { mutate: registerProductInquiryMutate },
        update: { mutate: updateProductInquiryMutate },
    } = useProductInquiryMutation();

    const onSubmit = handleSubmit(async (data) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: `상품문의를 ${isModify ? '수정' : '등록'}하시겠습니까?`,
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        if (isModify) {
            const submitData = {
                type: data.type as UpdateProductInquiryData['type'],
                title: data.title,
                secreted: data.secreted,
                content: data.content,
                tagValueNos: data.tagValues,
            };

            updateProductInquiryMutate(
                { inquiryNo, data: submitData },
                {
                    onSuccess: () => {
                        addToast({ message: t('상품문의가 수정되었습니다.') });
                        router.push(PATHS.MYPAGE.PRODUCT_INQUIRIES.MAIN);
                    },
                },
            );

            return;
        }

        const submitData = {
            type: data.type as WriteProductInquiryData['type'],
            title: data.title,
            secreted: data.secreted,
            email: data.email,
            content: data.content,
            tagValueNos: data.tagValues,
            productNo: data.productNo,
        };

        registerProductInquiryMutate(
            {
                productNo: data.productNo,
                data: submitData,
            },
            {
                onSuccess: () => {
                    addToast({ message: t('상품문의가 등록되었습니다.') });
                    router.push(PATHS.MYPAGE.PRODUCT_INQUIRIES.MAIN);
                },
            },
        );
    });

    return (
        <FormProvider {...methods}>
            <form className={formStyles.form} onSubmit={onSubmit}>
                <div className={formStyles.content}>
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

                        {productName ? (
                            <div className={styles.productCard}>
                                <div className={styles.productThumb}>
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt=''
                                            className={styles.productThumbImg}
                                        />
                                    ) : null}
                                </div>

                                <div className={styles.productMeta}>
                                    <div className={styles.productName}>
                                        {productName}
                                    </div>

                                    {!isModify && (
                                        <button
                                            type='button'
                                            className={
                                                styles.productCloseButton
                                            }
                                            onClick={onProductReset}
                                        >
                                            <CloseIcon
                                                width={isMobile ? 12 : 16}
                                                height={isMobile ? 12 : 16}
                                            />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Button
                                type='button'
                                frame='solid'
                                variant='apple'
                                className={styles.selectButton}
                                onClick={openProductSelect}
                            >
                                {t('문의할 상품 선택하기')}
                            </Button>
                        )}

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
                            className={styles.textArea}
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
                                        <div className={styles.emailRow}>
                                            <InputField
                                                className={styles.emailField}
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
                                            <span className={styles.emailAt}>
                                                @
                                            </span>
                                            <InputField
                                                className={styles.emailField}
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
                                    <label className={formStyles.checkboxLabel}>
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
