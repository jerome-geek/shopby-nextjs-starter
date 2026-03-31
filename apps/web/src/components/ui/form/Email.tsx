import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ErrorMessage } from '@/components/ui/form';
import InputField from '@/components/ui/input/field';
import Select from '@/components/ui/select';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import * as styles from '@/components/ui/form/Email.css';

export default function Email() {
    const { t } = useTranslation();
    const domainInputRef = useRef<HTMLInputElement>(null);
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name='email'
            render={({ field: { value = '', onChange, onBlur, ref } }) => {
                const [emailId = '', emailDomain = ''] = value.split('@');

                const handleIdChange = (
                    e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                    const newId = e.target.value;
                    onChange(`${newId}@${emailDomain}`);
                };

                const handleDomainChange = (
                    e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                    const newDomain = e.target.value;
                    onChange(`${emailId}@${newDomain}`);
                };

                return (
                    <div className={styles.container}>
                        <div className={styles.inputRow}>
                            <InputField
                                ref={ref}
                                value={emailId}
                                onChange={handleIdChange}
                                onBlur={onBlur}
                                placeholder={t('이메일 아이디')}
                            />

                            <span className={styles.atSign}>@</span>

                            <InputField
                                ref={domainInputRef}
                                value={emailDomain}
                                onChange={handleDomainChange}
                                onBlur={onBlur}
                                placeholder={t('도메인')}
                            />
                        </div>

                        <Select
                            isSearchable
                            placeholder={t('도메인 선택')}
                            options={EMAIL_DOMAIN_LIST}
                            formatOptionLabel={(option) => t(option.label)}
                            value={
                                EMAIL_DOMAIN_LIST.find(
                                    (opt) => opt.value === emailDomain,
                                ) || null
                            }
                            onChange={(item) => {
                                if (!item) return;

                                if (item.value === '') {
                                    onChange(`${emailId}@`);
                                    domainInputRef.current?.focus();
                                } else {
                                    onChange(`${emailId}@${item.value}`);
                                }
                            }}
                        />

                        <ErrorMessage name='email' />
                    </div>
                );
            }}
        />
    );
}
