import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/mypage/coupons/overlay/coupon-register/content/index.css';
import { InputContainer, InputField } from '@/shared/ui/input';
import { useCouponMutation } from '@/hooks/mutations';
import { useToast } from '@/hooks/ui';
import { ErrorMessage } from '@/shared/components/form';

export const CouponRegister = () => {
    const { t } = useTranslation();

    const { addToast } = useToast();

    const methods = useForm({
        defaultValues: {
            promotionCode: '',
        },
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const {
        issueByPromotionCode: {
            mutate: issueByPromotionCodeMutate,
            isPending: isIssueByPromotionCodePending,
        },
    } = useCouponMutation();

    const onSubmit = handleSubmit(async ({ promotionCode }) => {
        issueByPromotionCodeMutate(
            { promotionCode },
            {
                onSuccess: (response) => {
                    if (response?.data?.couponIssueNo) {
                        addToast({
                            message: '쿠폰이 발급되었습니다',
                        });
                        overlay.closeAll();
                        return;
                    }
                },
                onError: (error) => {
                    addToast({
                        message: isAxiosError(error)
                            ? error.response?.data.message
                            : '알 수 없는 오류가 발생했습니다.',
                        variant: 'error',
                    });
                },
            },
        );
    });

    useEffect(() => {
        const submitButton = document.getElementById(
            'coupon-register-submit-button',
        ) as HTMLButtonElement;

        if (!submitButton) {
            return;
        }

        submitButton.disabled = isIssueByPromotionCodePending;
    }, [isIssueByPromotionCodePending]);

    return (
        <FormProvider {...methods}>
            <form
                className={styles.form}
                onSubmit={onSubmit}
                id='coupon-register-form'
            >
                <InputContainer>
                    <InputField
                        id='promotionCode'
                        placeholder={t('쿠폰 번호를 입력해주세요.')}
                        {...register('promotionCode', {
                            required: t('쿠폰 번호를 입력해주세요.'),
                        })}
                        data-error={!!errors.promotionCode}
                    />

                    <ErrorMessage name='promotionCode' />

                    <p className={styles.description}>
                        {t('소지하신 쿠폰에 기재된 인증번호를 입력해 주세요.')}
                    </p>
                </InputContainer>
            </form>
        </FormProvider>
    );
};
