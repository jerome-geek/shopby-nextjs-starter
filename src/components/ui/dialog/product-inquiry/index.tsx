'use client';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import Link from 'next/link';

import DialogLayout, { DefaultDialogProps } from '@/components/layout/dialog';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/form';
import InputCheckbox from '@/components/ui/input/Checkbox';
import { InputLabel } from '@/components/ui/input/label';
import TextArea from '@/components/ui/input/TextArea';
import Select from '@/components/ui/Select';
import { GetMallResponse } from '@/models/admin/mall';
import { WriteProductInquiryData } from '@/models/display/productInquiry';
import { css } from '@/styled-system/css';
import { HStack, VStack } from '@/styled-system/jsx';
import { vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import { PATHS } from '@/const/paths';
import useDialog from '@/hooks/useDialog';
import { useProductInquiryMutation } from '@/hooks/mutations';
import useApiError from '@/hooks/useApiError';

interface ProductInquiryDialogProps extends DefaultDialogProps {
    title?: string;
    contents?: string;
    productNo?: number;
    inquiryNo?: number;
    inquiryTypeList: GetMallResponse['productInquiryType'];
}

export interface WriteProductInquiryProps extends WriteProductInquiryData {
    product?: {
        imgUrl: string;
        productName: string;
        price: number;
    };
}

export default function ProductInquiryDialog({
    title,
    contents,
    inquiryTypeList,
    productNo,
    inquiryNo,
    ...props
}: ProductInquiryDialogProps) {
    const { t } = useTranslation();

    const { openAsyncDialog } = useDialog();

    const isUpdate = !!inquiryNo;

    const methods = useForm<WriteProductInquiryProps>({
        defaultValues: {
            secreted: false,
        },
    });

    const {
        control,
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = methods;

    const { handleError } = useApiError();

    const {
        register: { mutate: registerMutate },
        update: { mutate: updateMutate },
    } = useProductInquiryMutation();

    const onSubmit = handleSubmit(async (data) => {
        console.log('🚀 ~ onSubmit ~ data:', data);
        const isAgree = await openAsyncDialog({
            message: isUpdate
                ? t('상품문의를 수정하시겠습니까?')
                : t('상품문의를 등록하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        if (isUpdate) {
            updateMutate(
                {
                    inquiryNo: inquiryNo || 0,
                    data: { ...data, title: data.title || '' },
                },
                {
                    onSuccess: async () => {
                        await openAsyncDialog({
                            message: t('상품문의가 수정되었습니다.'),
                        });
                    },
                },
            );
        } else {
            registerMutate(
                {
                    productNo: 132407476,
                    data: { ...data, title: data.title || '' },
                },
                {
                    onSuccess: async () => {
                        await openAsyncDialog({
                            message: t('상품문의가 등록되었습니다.'),
                        });
                    },
                    onError: (error) => {
                        handleError(error);
                    },
                },
            );
        }
    });

    return (
        <DialogLayout maxWidth={432} {...props}>
            <FormProvider {...methods}>
                <VStack
                    as='form'
                    gap='36px'
                    alignItems='stretch'
                    onSubmit={onSubmit}
                >
                    <VStack gap='24px' alignItems='stretch'>
                        <VStack gap='12px' alignItems='stretch'>
                            <p
                                className={css({
                                    textStyle: 'headline2.semibold',
                                })}
                            >
                                {t('문의 유형')}
                            </p>
                            <Controller
                                control={control}
                                name='type'
                                rules={{
                                    required:
                                        t('상품 문의 유형을 선택해 주세요.'),
                                }}
                                render={({
                                    field: { onChange, value, ...rest },
                                }) => (
                                    <Select
                                        {...rest}
                                        name='type'
                                        placeholder={t('유형을 선택해 주세요.')}
                                        options={inquiryTypeList}
                                        value={inquiryTypeList.find(
                                            (a) => a.value === value,
                                        )}
                                        onChange={(selectedOption) => {
                                            if (selectedOption) {
                                                onChange(selectedOption.value);
                                            }
                                        }}
                                    />
                                )}
                            />
                            <ErrorMessage name='type' />
                        </VStack>

                        <VStack alignItems='stretch' gap='12px'>
                            <p
                                className={css({
                                    textStyle: 'headline2.semibold',
                                })}
                            >
                                {t('문의 내용')}
                            </p>
                            <TextArea
                                placeholder={t('문의의 내용을 작성해 주세요.')}
                                {...register('content', {
                                    required: t('문의의 내용을 작성해 주세요.'),
                                })}
                            />
                        </VStack>

                        <HStack gap='8px'>
                            <Controller
                                control={control}
                                name='secreted'
                                render={({ field }) => {
                                    return (
                                        <InputCheckbox
                                            id='secreted'
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    );
                                }}
                            />
                            <InputLabel isCheckbox htmlFor='secreted'>
                                {t('비밀글로 등록하기')}
                            </InputLabel>
                        </HStack>

                        <hr
                            className={css({
                                border: `1px solid ${token('colors.gray20')}`,
                            })}
                        />

                        <VStack alignItems='stretch' gap='8px'>
                            <h6
                                className={css({
                                    textStyle: 'body2.semibold',
                                    color: token('colors.black'),
                                })}
                            >
                                {t('상품 문의 작성시 유의사항')}
                            </h6>
                            <ul
                                className={vstack({
                                    gap: '4px',
                                    alignItems: 'stretch',
                                    textStyle: 'body2.regular',
                                    color: token('colors.gray80'),
                                    paddingLeft: '16px',
                                    '&>li': { listStyleType: 'disc' },
                                })}
                            >
                                <li>
                                    <Trans
                                        i18nKey='결제 및 교환, 취소, 환불 문의는 <0>1:1문의</0>를 이용해 주세요.'
                                        defaults='결제 및 교환, 취소, 환불 문의는 <0>1:1문의</0>를 이용해 주세요.'
                                        components={[
                                            <Link
                                                key='inquiry-link'
                                                prefetch={false}
                                                className={css({
                                                    display: 'inline-block',
                                                    textDecoration: 'underline',
                                                    color: token(
                                                        'colors.black',
                                                    ),
                                                })}
                                                href={
                                                    PATHS.MYPAGE.INQUIRIES.MAIN
                                                }
                                            />,
                                        ]}
                                    />
                                </li>
                                <li>
                                    {t(
                                        '이메일, 전화번호, 이름 등의 개인 정보를 작성하였다면 비밀글로 등록해 주세요.',
                                    )}
                                </li>
                                <li>
                                    {t(
                                        '욕설 및 비방, 상품과 관련없는 내용이나 광고가 포함된 문의는 통보 없이 삭제될 수 있어요.',
                                    )}
                                </li>
                            </ul>
                        </VStack>
                    </VStack>

                    <Button type='submit' frame='solid' variant='primary'>
                        {t('문의하기')}
                    </Button>
                </VStack>
            </FormProvider>
        </DialogLayout>
    );
}
