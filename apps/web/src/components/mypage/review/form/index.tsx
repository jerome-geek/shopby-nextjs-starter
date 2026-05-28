import { isEmpty, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import upload from '@/api/storage/image';
import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import ReviewStartIcon from '@/shared/ui/icons/ReviewStartIcon';
import * as formStyles from '@/components/mypage/common/mypage-form/index.css';
import OptionText from '@/components/mypage/common/option-text';
import * as styles from '@/components/mypage/review/form/index.css';
import { Button } from '@/shared/ui/button';
import FileUpload from '@/shared/ui/file-upload';
import { InputContainer, InputLabel } from '@/shared/ui/input';
import { ORDER_STATUS_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { useReviewMutation } from '@/hooks/mutations';
import {
    useProductReview,
    useReviewableProductList,
} from '@/hooks/query/display/review';
import { reviewKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import type { UploadFileBlob } from '@/hooks/utils/useFileUpload';
import {
    registerReviewSchema,
    updateReviewSchema,
    type RegisterReviewSchemaType,
    type UpdateReviewSchemaType,
} from '@/schema/review.schema';
import { ErrorMessage, TextArea } from '@/shared/components/form';

interface ReviewFormProps {
    reviewNo?: number;
    orderNo?: string;
}

export const ReviewForm = ({ reviewNo, orderNo }: ReviewFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();
    const queryClient = useQueryClient();

    const { handleErrorDialog } = useApiError();

    const isEdit = !!reviewNo;

    const productNo = Number(router.query.productNo) || 0;
    const optionNo = Number(router.query.optionNo) || 0;
    const orderOptionNo = Number(router.query.orderOptionNo) || 0;

    const methods = useForm<RegisterReviewSchemaType | UpdateReviewSchemaType>({
        resolver: zodResolver(
            isEdit ? updateReviewSchema : registerReviewSchema,
        ),
        defaultValues: isEdit
            ? {
                  tagValueNos: [],
                  urls: [],
                  rate: 5,
                  content: '',
              }
            : {
                  tagValueNos: [],
                  urls: [],
                  rate: 5,
                  optionNo,
                  orderOptionNo,
                  content: '',
              },
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
        if (isEdit) {
            return;
        }

        reset(
            (prev) => ({
                ...(prev as RegisterReviewSchemaType),
                optionNo,
                orderOptionNo,
            }),
            { keepFieldsRef: true },
        );
    }, [isEdit, optionNo, orderOptionNo, reset]);

    const { data: reviewableData, isLoading: isReviewableLoading } =
        useReviewableProductList({
            searchParams: {
                pageNumber: 1,
                pageSize: 20,
                hasTotalCount: true,
                productNo,
                orderNo,
            },
            options: { enabled: !!productNo && !isEdit },
        });

    const productInfo = useMemo(() => {
        if (isEmpty(reviewableData?.items)) {
            return null;
        }

        const findReviewItem =
            reviewableData?.items?.find(
                (item) =>
                    item.productNo === productNo &&
                    item.optionNo === optionNo &&
                    item.orderOptionNo === orderOptionNo,
            ) ?? null;

        return findReviewItem;
    }, [reviewableData, productNo, optionNo, orderOptionNo]);

    const { data: productReviewData, isLoading: isProductReviewLoading } =
        useProductReview({
            productNo,
            reviewNo: reviewNo ?? 0,
            options: { enabled: !!productNo && !!reviewNo && isEdit },
        });

    const [uploadFileList, setUploadFileList] = useState<
        (string | UploadFileBlob)[]
    >([]);

    useEffect(() => {
        if (!isEdit) {
            return;
        }

        if (!productReviewData) {
            return;
        }

        reset(
            () => ({
                tagValueNos: productReviewData.tagValueNos ?? [],
                urls: productReviewData.fileUrls ?? [],
                rate: productReviewData.rate ?? 5,
                content: productReviewData.content ?? '',
            }),
            { keepFieldsRef: true },
        );
    }, [isEdit, productReviewData, reset]);

    const { register: registerReview, modify: modifyReview } =
        useReviewMutation({
            productNo,
        });

    const submit = handleSubmit(async (raw) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: isEdit
                ? t('리뷰를 수정하시겠습니까?')
                : t('리뷰를 등록하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        let uploadedImageList: string[] = [];

        if (!isEmpty(uploadFileList)) {
            const response = await Promise.all(
                uploadFileList.map((image) => {
                    if (typeof image === 'string') {
                        return Promise.resolve({ data: { imageUrl: image } });
                    }
                    const formData = new FormData();
                    formData.append('file', image as Blob);
                    return upload.uploadImage({ data: formData });
                }),
            );

            uploadedImageList = pipe(
                response,
                map((a) => a.data.imageUrl),
                toArray,
            );
        }

        if (isEdit) {
            const parsed = updateReviewSchema.parse(raw);

            modifyReview.mutate(
                {
                    reviewNo: reviewNo ?? 0,
                    data: {
                        ...parsed,
                        tagValueNos: parsed.tagValueNos ?? [],
                        urls: uploadedImageList,
                    },
                },
                {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries({
                            queryKey: reviewKeys.all,
                            refetchType: 'all',
                        });

                        addToast({
                            message: t('리뷰를 수정하였습니다.'),
                        });

                        router.replace({
                            pathname: PATHS.MYPAGE.REVIEWS.DETAIL.replace(
                                '[reviewNo]',
                                String(reviewNo),
                            ),
                            query: { productNo: String(productNo) },
                        });
                    },
                    onError: (error) => handleErrorDialog(error),
                },
            );
            return;
        }

        const parsed = registerReviewSchema.parse(raw);

        registerReview.mutate(
            {
                data: {
                    ...parsed,
                    tagValueNos: parsed.tagValueNos ?? [],
                    urls: uploadedImageList,
                },
            },
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: reviewKeys.all,
                        refetchType: 'inactive',
                    });

                    addToast({
                        message: t('리뷰를 등록하였습니다.'),
                    });

                    router.replace({
                        pathname: PATHS.MYPAGE.REVIEWS.MAIN,
                        query: { reviewType: 'MY_REVIEW' },
                    });
                },
                onError: (error) => handleErrorDialog(error),
            },
        );
    });

    const reviewProduct = useMemo(() => {
        const reviewProduct = {
            imageUrl: isEdit
                ? (productReviewData?.imageUrl ?? '')
                : (productInfo?.imageUrl ?? ''),
            productName: isEdit
                ? (productReviewData?.productName ?? '')
                : (productInfo?.productName ?? ''),
            optionName: isEdit
                ? (productReviewData?.orderedOption?.optionName ?? '')
                : (productInfo?.optionName ?? ''),
            optionValue: isEdit
                ? (productReviewData?.orderedOption?.optionValue ?? '')
                : (productInfo?.optionValue ?? ''),
            inputs: isEdit
                ? (productReviewData?.orderedOption?.inputs ?? [])
                : (productInfo?.inputs ?? []),
            orderCnt: isEdit
                ? (productReviewData?.orderedOption?.orderCnt ?? 0)
                : (productInfo?.orderCnt ?? 0),
            orderStatusType: isEdit ? '' : (productInfo?.orderStatusType ?? ''),
        };

        if (!reviewProduct?.productName) {
            return null;
        }

        return (
            <div className={styles.productContainer}>
                <div className={styles.productImageWrap}>
                    <Link
                        href={PATHS.PRODUCTS.DETAIL.replace(
                            '[productNo]',
                            String(productNo),
                        )}
                        prefetch={false}
                    >
                        <img
                            src={reviewProduct.imageUrl}
                            alt={reviewProduct.productName}
                            className={styles.productImage}
                        />
                    </Link>
                </div>

                <div className={styles.productContent}>
                    {reviewProduct.orderStatusType && (
                        <span
                            className={
                                reviewProduct.orderStatusType === 'BUY_CONFIRM'
                                    ? styles.primaryStatus
                                    : styles.status
                            }
                        >
                            {t(
                                ORDER_STATUS_MAP[
                                    reviewProduct.orderStatusType as keyof typeof ORDER_STATUS_MAP
                                ] ?? reviewProduct.orderStatusType,
                            )}
                        </span>
                    )}

                    <p className={styles.productName}>
                        {reviewProduct.productName}
                    </p>

                    <OptionText
                        optionName={reviewProduct.optionName}
                        optionValue={reviewProduct.optionValue}
                        productName={reviewProduct.productName}
                        inputs={reviewProduct.inputs}
                        orderCnt={reviewProduct.orderCnt}
                    />
                </div>
            </div>
        );
    }, [isEdit, productReviewData, productInfo, productNo, t]);

    const isLoading = isEdit ? isProductReviewLoading : isReviewableLoading;

    return (
        <FormProvider {...methods}>
            <form className={formStyles.form} onSubmit={submit}>
                <div className={formStyles.content}>
                    <LoadingWrapper
                        isLoading={isLoading}
                        containerStyle={{ height: '97px' }}
                    >
                        {reviewProduct}
                    </LoadingWrapper>

                    <InputContainer>
                        <InputLabel isRequired>{t('평점')}</InputLabel>
                        <Controller
                            control={control}
                            name='rate'
                            render={({ field: { onChange, value } }) => (
                                <div className={styles.starRow}>
                                    {[1, 2, 3, 4, 5].map((n) => {
                                        const filled = (value as number) >= n;
                                        return (
                                            <button
                                                key={n}
                                                type='button'
                                                className={styles.starButton}
                                                onClick={() => onChange(n)}
                                            >
                                                <ReviewStartIcon
                                                    width={22}
                                                    height={22}
                                                    filled={filled}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        <ErrorMessage name='rate' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('내용')}</InputLabel>
                        <TextArea
                            placeholder={t('리뷰 내용을 입력해주세요.')}
                            maxLength={1000}
                            style={{ height: '220px' }}
                            data-lenis-prevent
                            {...register('content')}
                            data-error={!!errors.content}
                        />
                        <ErrorMessage name='content' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>{t('사진 첨부')}</InputLabel>
                        <FileUpload
                            initialFileList={
                                isEdit
                                    ? (productReviewData?.fileUrls ?? [])
                                    : []
                            }
                            setFileList={setUploadFileList}
                            maxLength={4}
                        />
                    </InputContainer>
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
                        disabled={
                            isSubmitting ||
                            registerReview.isPending ||
                            modifyReview.isPending
                        }
                    >
                        {isEdit ? t('수정하기') : t('등록하기')}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
