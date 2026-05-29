import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/features/member/member-join-config-field';
import { InputField, InputFieldContainer } from '@/shared/ui/input';
import { useLocale } from '@/hooks/utils';
import { ErrorMessage } from '@/shared/components/form';

const SignupFormName = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { register } = useFormContext();

    const {
        errors: {
            memberName: memberNameError,
            lastName: lastNameError,
            firstName: firstNameError,
        },
    } = useFormState({
        name: ['memberName', 'lastName', 'firstName'],
    });

    const { isKorean, isJapan } = useLocale();

    return (
        <WithMemberJoinConfig name='memberName' label={t('이름')}>
            {isKorean && (
                <>
                    <InputField
                        {...register('memberName')}
                        placeholder={t('이름을 입력해 주세요.')}
                        type='text'
                        readOnly={disabled}
                        data-error={!!memberNameError}
                    />
                    <ErrorMessage name='memberName' />
                </>
            )}
            {isJapan && (
                <>
                    <InputFieldContainer gridRatio={[1, 1]}>
                        <InputField
                            {...register('lastName')}
                            placeholder={t('성을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            data-error={!!lastNameError}
                        />
                        <InputField
                            {...register('firstName')}
                            placeholder={t('이름을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            data-error={!!firstNameError}
                        />
                    </InputFieldContainer>

                    <ErrorMessage name='lastName' />
                    <ErrorMessage name='firstName' />
                </>
            )}
            {!isKorean && !isJapan && (
                <>
                    <InputFieldContainer gridRatio={[1, 1]}>
                        <InputField
                            {...register('firstName')}
                            placeholder={t('이름을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            data-error={!!firstNameError}
                        />
                        <InputField
                            {...register('lastName')}
                            placeholder={t('성을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            data-error={!!lastNameError}
                        />
                    </InputFieldContainer>

                    <ErrorMessage name='firstName' />
                    <ErrorMessage name='lastName' />
                </>
            )}
        </WithMemberJoinConfig>
    );
};

export default SignupFormName;
