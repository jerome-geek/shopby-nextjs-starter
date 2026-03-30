import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { ErrorMessage } from '@/components/ui/form';
import InputField from '@/components/ui/input/field';
import FieldContainer from '@/components/ui/input/FieldContainer';
import Select from '@/components/ui/select';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import EmailAuthentication from '@/components/signup/form/email/email-authentication';

const SignupFormEmail = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { control, setValue } = useFormContext();

    const {
        errors: { email: emailError, isDuplicateEmail: isDuplicateEmailError },
    } = useFormState({
        name: ['email', 'isDuplicateEmail'],
    });

    const [isDuplicated, setIsDuplicated] = useState(true);

    useEffect(() => {
        if (isDuplicated) {
            setValue('isDuplicateEmail', true);
        }
    }, [isDuplicated, setValue]);

    const emailDomainRef = useRef<HTMLInputElement>(null);

    return (
        <WithMemberJoinConfig name='email' label={t('이메일')}>
            <Controller
                name='email'
                control={control}
                render={({ field: { onChange, ref, value } }) => {
                    const [emailId = '', emailDomain = ''] = (
                        value || ''
                    ).split('@');

                    return (
                        <FieldContainer>
                            <FieldContainer
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <InputField
                                    value={emailId}
                                    ref={ref}
                                    onChange={(e) => {
                                        onChange(
                                            `${e.target.value}@${emailDomain}`,
                                        );
                                        setIsDuplicated(true);
                                    }}
                                    placeholder={t('이메일을 입력해 주세요.')}
                                    readOnly={disabled}
                                    isError={
                                        !!emailError || !!isDuplicateEmailError
                                    }
                                />
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.4rem',
                                    }}
                                >
                                    @
                                </span>
                                <InputField
                                    ref={emailDomainRef}
                                    value={emailDomain}
                                    readOnly={disabled}
                                    onChange={(e) => {
                                        onChange(
                                            `${emailId}@${e.target.value}`,
                                        );
                                        setIsDuplicated(true);
                                    }}
                                    isError={
                                        !!emailError || !!isDuplicateEmailError
                                    }
                                />
                            </FieldContainer>

                            {!disabled && (
                                <Select
                                    isSearchable
                                    placeholder={t('직접입력')}
                                    options={EMAIL_DOMAIN_LIST}
                                    formatOptionLabel={(option) =>
                                        t(option.label)
                                    }
                                    onChange={(item) => {
                                        if (!item) {
                                            return;
                                        }

                                        if (item.value === '') {
                                            emailDomainRef.current?.focus();
                                        }

                                        onChange(`${emailId}@${item.value}`);
                                        setIsDuplicated(true);
                                    }}
                                />
                            )}
                        </FieldContainer>
                    );
                }}
            />
            <ErrorMessage name='email' />
            <ErrorMessage name='isDuplicateEmail' />

            <EmailAuthentication setIsDuplicated={setIsDuplicated} />
        </WithMemberJoinConfig>
    );
};

export default SignupFormEmail;
