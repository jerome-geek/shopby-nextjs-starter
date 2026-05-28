import { useEffect, useRef, useState } from 'react';
import {
    Controller,
    useFormContext,
    useFormState,
    useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import EmailAuthentication from '@/components/signup/form/email/email-authentication';
import { InputField, InputFieldContainer, Select } from '@/shared/ui/input';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import { ErrorMessage } from '@/shared/components/form';

const SignupFormEmail = ({
    disabled,
    isDefaultDuplicated = true,
}: {
    disabled?: boolean;
    isDefaultDuplicated?: boolean;
}) => {
    const { t } = useTranslation();

    const { control, setValue } = useFormContext();

    const isModifyEmailWatch = useWatch({
        control,
        name: 'isModifyEmail',
    });

    const {
        errors: { email: emailError, isDuplicateEmail: isDuplicateEmailError },
    } = useFormState({
        name: ['email', 'isDuplicateEmail'],
    });

    const [isDuplicated, setIsDuplicated] = useState(isDefaultDuplicated);

    useEffect(() => {
        if (isDuplicated) {
            setValue('isDuplicateEmail', true);
        }
    }, [isDuplicated, setValue]);

    const emailDomainRef = useRef<HTMLInputElement>(null);

    const isDisabled = disabled && !isModifyEmailWatch;

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
                        <InputFieldContainer>
                            <InputFieldContainer
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <InputField
                                    value={emailId}
                                    ref={ref}
                                    onChange={(e) => {
                                        const [id, domain] =
                                            e.target.value.split('@');
                                        onChange(
                                            `${id}@${domain || emailDomain}`,
                                        );
                                        setIsDuplicated(true);
                                    }}
                                    placeholder={t('이메일을 입력해 주세요.')}
                                    readOnly={isDisabled}
                                    data-error={
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
                                    readOnly={isDisabled}
                                    onChange={(e) => {
                                        onChange(
                                            `${emailId}@${e.target.value}`,
                                        );
                                        setIsDuplicated(true);
                                    }}
                                    data-error={
                                        !!emailError || !!isDuplicateEmailError
                                    }
                                />
                            </InputFieldContainer>

                            {!isDisabled && (
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
                        </InputFieldContainer>
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
