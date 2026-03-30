import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { ErrorMessage } from '@/components/ui/form';
import InputField from '@/components/ui/input/field';
import FieldContainer from '@/components/ui/input/FieldContainer';
import { useLocale } from '@/hooks/utils';

const SignupFormName = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { register } = useFormContext();

    const { errors } = useFormState({
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
                        isError={!!errors.memberName}
                    />
                    <ErrorMessage name='memberName' />
                </>
            )}
            {isJapan && (
                <>
                    <FieldContainer gridRatio={[1, 1]}>
                        <InputField
                            {...register('lastName')}
                            placeholder={t('성을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            isError={!!errors.lastName}
                        />
                        <InputField
                            {...register('firstName')}
                            placeholder={t('이름을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            isError={!!errors.firstName}
                        />
                    </FieldContainer>

                    <ErrorMessage name='lastName' />
                    <ErrorMessage name='firstName' />
                </>
            )}
            {!isKorean && !isJapan && (
                <>
                    <FieldContainer gridRatio={[1, 1]}>
                        <InputField
                            {...register('firstName')}
                            placeholder={t('이름을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            isError={!!errors.firstName}
                        />
                        <InputField
                            {...register('lastName')}
                            placeholder={t('성을 입력해 주세요.')}
                            type='text'
                            readOnly={disabled}
                            isError={!!errors.lastName}
                        />
                    </FieldContainer>

                    <ErrorMessage name='firstName' />
                    <ErrorMessage name='lastName' />
                </>
            )}
        </WithMemberJoinConfig>
    );
};

export default SignupFormName;
