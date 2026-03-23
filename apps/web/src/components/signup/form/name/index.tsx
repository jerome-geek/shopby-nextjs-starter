import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';

import { Column, Row } from '@/components/ui/layout/flex';
import * as Input from '@/components/Common/Input';
import { WithMemberJoinConfig } from '@/components/HOC';
import { useLocale } from '@/hooks/utils';
import { CertificationCheckContext } from '@/context/certificationCheck';
import { ErrorMessage } from '@/components/ui/form';

const SignupFormName = () => {
    const { t } = useTranslation();

    const value = useContext(CertificationCheckContext);

    const isAuthenticationByPhone = value?.isAuthenticationByPhone;

    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext();

    const { isKorean } = useLocale();

    return (
        <WithMemberJoinConfig name="memberName" label={t('이름')}>
            {isKorean ? (
                <Input.FieldContainer>
                    <Input.Field
                        {...register('memberName')}
                        placeholder={t('이름을 입력해 주세요.')}
                        readOnly={
                            !!getValues('memberName') && isAuthenticationByPhone
                        }
                    />
                    <ErrorMessage name="memberName" />
                </Input.FieldContainer>
            ) : (
                <Column gap="6px" style={{ width: '100%' }}>
                    <Row gap="8px">
                        <Input.Field
                            {...register('firstName')}
                            placeholder={t('이름을 입력해주세요.')}
                        />
                        <Input.Field
                            {...register('lastName')}
                            placeholder={t('성을 입력해주세요.')}
                        />
                    </Row>
                    <ErrorMessage name="firstName" />
                    <ErrorMessage name="lastName" />
                </Column>
            )}
        </WithMemberJoinConfig>
    );
};

export default SignupFormName;
