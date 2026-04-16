import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';

import {
    BottomSheetLayout,
    DefaultModalLayoutProps,
} from '@/components/layout';
import { PasswordCheckOverlayProps } from '@/components/modal/password-check';
import { Button } from '@/components/ui/button';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
} from '@/components/ui/input';
import type { CheckPasswordData } from '@/models/member/profile';

interface PasswordCheckBottomSheetProps
    extends DefaultModalLayoutProps, PasswordCheckOverlayProps {}

export const PasswordCheckBottomSheet = (
    props: PasswordCheckBottomSheetProps,
) => {
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
        <BottomSheetLayout
            {...layoutProps}
            close={close}
            title={t('비밀번호 인증')}
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
                    form='password-check-bottom-sheet-form'
                >
                    {t('확인')}
                </Button>,
            ]}
        >
            <form
                id='password-check-bottom-sheet-form'
                onSubmit={onSubmit}
                data-lenis-prevent
            >
                <InputFieldContainer>
                    <InputLabel isRequired>{t('비밀번호')}</InputLabel>

                    <InputField
                        type='password'
                        placeholder={t(
                            '작성 시 설정한 비밀번호를 입력해주세요.',
                        )}
                        {...register('password', {
                            required: t('비밀번호를 입력해 주세요.'),
                        })}
                    />

                    <ErrorMessage name='password' errors={errors} />
                </InputFieldContainer>
            </form>
        </BottomSheetLayout>
    );
};
