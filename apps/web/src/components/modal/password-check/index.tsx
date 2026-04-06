import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DefaultModalLayoutProps, ModalLayout } from '@/components/layout';
import { InputLabel } from '@/components/ui';
import { Button } from '@/components/ui/button';
import InputContainer from '@/components/ui/input/container';
import { ErrorMessage } from '@hookform/error-message';
import Field from '@/components/ui/input/field';
import { CheckPasswordData } from '@/models/member/profile';

export interface PasswordCheckOverlayProps {
    onConfirm: (password: string) => Promise<boolean>;
}

interface PasswordCheckModalProps
    extends DefaultModalLayoutProps,
        PasswordCheckOverlayProps {}

export const PasswordCheckModal = (props: PasswordCheckModalProps) => {
    const { onConfirm, close, ...layoutProps } = props;

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckPasswordData>({
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const result = await Promise.resolve(onConfirm(data.password));

            if (result === false) {
                return;
            }
        } catch {
            return;
        }

        close();
    });

    return (
        <ModalLayout
            {...layoutProps}
            close={close}
            title={t('비밀번호 인증')}
            size='medium'
            footerButtonList={[
                <Button
                    key='password-cancel-button'
                    frame='outlined'
                    variant='primary'
                    type='button'
                    onClick={close}
                >
                    {t('취소')}
                </Button>,
                <Button
                    key='password-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='password-check-form'
                >
                    {t('확인')}
                </Button>,
            ]}
        >
            <form id='password-check-form' onSubmit={onSubmit}>
                <InputContainer>
                    <InputLabel isRequired>{t('비밀번호')}</InputLabel>

                    <Field
                        type='password'
                        placeholder={t(
                            '작성 시 설정한 비밀번호를 입력해주세요.',
                        )}
                        {...register('password', {
                            required: t('비밀번호를 입력해 주세요.'),
                        })}
                    />

                    <ErrorMessage name='password' errors={errors} />
                </InputContainer>
            </form>
        </ModalLayout>
    );
};
