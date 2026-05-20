import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { guestOrder } from '@/api/order';
import { AuthLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { InputContainer, InputField, InputLabel } from '@/components/ui/input';
import { PATHS } from '@/const/paths';
import useApiError from '@/hooks/useApiError';
import { NextPageWithLayout } from '@/pages/_app';
import {
    guestLoginFormSchema,
    GuestLoginFormSchemaType,
} from '@/schema/login.schema';
import { ErrorMessage } from '@/shared/components/form';
import * as styles from '@/styles/pages/login.css';
import { guestTokenCookie } from '@/utils/cookie';

const GuestLoginPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const { handleErrorDialog } = useApiError();

    const [isNavigating, setIsNavigating] = useState(false);

    const methods = useForm<GuestLoginFormSchemaType>({
        resolver: zodResolver(guestLoginFormSchema),
        defaultValues: {
            orderNo: '',
            password: '',
        },
    });
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async ({ orderNo, password }) => {
        try {
            setIsNavigating(true);

            const { data } = await guestOrder.issueOrderToken(orderNo, {
                password,
                orderRequestType: 'ALL',
            });

            const guestToken = data?.guestToken;

            if (guestToken) {
                guestTokenCookie.set(guestToken);

                router.push(`${PATHS.GUEST.ORDER.MAIN}/${orderNo}`);
                return;
            }

            setIsNavigating(false);
            throw new Error(t('로그인 실패하였습니다.'));
        } catch (error) {
            handleErrorDialog(error);
            setIsNavigating(false);
        }
    });

    return (
        <FormProvider {...methods}>
            {/* 주문 조회 폼 */}
            <div className={styles.container}>
                <div className={styles.loginFormSection}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <div className={styles.inputGroupContainer}>
                            {/* 주문번호 입력 */}
                            <InputContainer>
                                <InputLabel htmlFor='orderNo'>
                                    {t('주문번호')}
                                </InputLabel>
                                <InputField
                                    {...register('orderNo')}
                                    type='text'
                                    id='orderNo'
                                    placeholder={t('주문번호를 입력해 주세요')}
                                />
                                <ErrorMessage name='orderNo' />
                            </InputContainer>

                            {/* 비밀번호 입력 */}
                            <InputContainer>
                                <InputLabel htmlFor='password'>
                                    {t('비밀번호')}
                                </InputLabel>
                                <InputField
                                    {...register('password')}
                                    type='password'
                                    id='password'
                                    placeholder={t('비밀번호를 입력해 주세요')}
                                />
                                <ErrorMessage name='password' />
                            </InputContainer>
                        </div>

                        {/* 버튼 컨테이너 */}
                        <div className={styles.buttonContainer}>
                            <Button
                                type='submit'
                                frame='solid'
                                variant='primary'
                                disabled={isSubmitting || isNavigating}
                            >
                                <span>
                                    {isSubmitting || isNavigating
                                        ? t('주문 조회 중...')
                                        : t('주문 조회')}
                                </span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};

GuestLoginPage.getLayout = (page) => (
    <AuthLayout title='비회원 주문조회'>{page}</AuthLayout>
);

export default GuestLoginPage;
