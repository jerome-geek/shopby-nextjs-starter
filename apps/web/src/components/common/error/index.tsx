import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import * as styles from '@/components/common/error/index.css';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input';
import { Column, Row } from '@/components/ui/layout/flex';
import { BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE } from '@/const/board';
import { ErrorMessage } from '@/shared/components/form';

interface GuestPasswordFormValues {
    password: string;
}

interface ErrorProps {
    errorCode?: string;
    errorMessage?: string;
    onSubmitGuestPassword?: (password: string) => Promise<boolean>;
}

export const Error = ({
    errorCode,
    errorMessage,
    onSubmitGuestPassword,
}: ErrorProps) => {
    const router = useRouter();

    const methods = useForm<GuestPasswordFormValues>({
        defaultValues: {
            password: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const handleSubmitGuestPassword = handleSubmit(async (data) => {
        if (!onSubmitGuestPassword) {
            return;
        }

        await onSubmitGuestPassword(data.password);
    });

    if (errorCode === BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE) {
        return (
            <div className={styles.container}>
                <p className={styles.guestDescription}>
                    비밀번호로 접근 가능한 게시글입니다.
                </p>
                <FormProvider {...methods}>
                    <form
                        className={styles.guestPasswordForm}
                        onSubmit={handleSubmitGuestPassword}
                    >
                        <Column gap='sm' align='start'>
                            <InputField
                                type='password'
                                placeholder='작성 시 설정한 비밀번호를 입력해주세요.'
                                {...register('password', {
                                    required: '비밀번호를 입력해 주세요.',
                                })}
                                data-error={!!errors.password}
                            />
                            <ErrorMessage name='password' />
                        </Column>

                        <Row justify='center' gap='sm'>
                            <Button
                                frame='outlined'
                                type='button'
                                onClick={() => router.back()}
                            >
                                뒤로가기
                            </Button>
                            <Button
                                frame='solid'
                                variant='primary'
                                type='submit'
                                disabled={isSubmitting}
                                data-error={!!errors.password}
                            >
                                비밀번호 입력
                            </Button>
                        </Row>
                    </form>
                </FormProvider>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>안내드립니다.</h1>
            <p className={styles.description}>{errorMessage}</p>
            {errorCode && (
                <p className={styles.errorCode}>에러 코드 : {errorCode}</p>
            )}
            <Button
                frame='solid'
                variant='primary'
                onClick={() => router.push('/')}
            >
                홈으로 돌아가기
            </Button>
        </div>
    );
};
