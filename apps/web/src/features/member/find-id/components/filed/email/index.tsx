import { useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
    InputContainer,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/shared/ui/input';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import * as styles from '@/features/member/find-id/components/filed/email/index.css';
import { FindIdType } from '@/schema/profile.schema';
import { ErrorMessage } from '@/shared/components/form';

export const EmailField = () => {
    const { t } = useTranslation();

    const {
        control,
        formState: { errors },
    } = useFormContext<FindIdType>();

    const emailWatch = useWatch({ control, name: 'email' });
    const [emailId = '', emailDomain = ''] = (emailWatch || '').split('@');

    const emailDomainRef = useRef<HTMLInputElement>(null);

    return (
        <InputContainer>
            <InputLabel isRequired>{t('이메일')}</InputLabel>

            <Controller
                name='email'
                control={control}
                render={({ field: { onChange, ref } }) => (
                    <InputFieldContainer>
                        <div className={styles.emailRow}>
                            <InputField
                                type='text'
                                value={emailId}
                                ref={ref}
                                onChange={(e) =>
                                    onChange(`${e.target.value}@${emailDomain}`)
                                }
                                placeholder={t('이메일을 입력해 주세요.')}
                                data-error={!!errors.email}
                            />
                            <span className={styles.atSign}>@</span>
                            <InputField
                                ref={emailDomainRef}
                                type='text'
                                value={emailDomain}
                                onChange={(e) =>
                                    onChange(`${emailId}@${e.target.value}`)
                                }
                                data-error={!!errors.email}
                            />
                        </div>
                        <Select
                            isSearchable
                            placeholder={t('직접입력')}
                            options={EMAIL_DOMAIN_LIST}
                            formatOptionLabel={(option) => t(option.label)}
                            onChange={(item) => {
                                if (!item) {
                                    return;
                                }
                                if (item.value === '') {
                                    emailDomainRef.current?.focus();
                                }
                                onChange(`${emailId}@${item.value}`);
                            }}
                        />
                    </InputFieldContainer>
                )}
            />
            <ErrorMessage name='email' />
        </InputContainer>
    );
};
