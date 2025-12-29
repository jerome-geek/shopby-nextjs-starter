import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from '@/components/ui/form/ErrorMessage';
import InputField from '@/components/ui/input/field';
import Select from '@/components/ui/Select';
import { EMAIL_DOMAIN_LIST } from '@/const/form';
import { css } from '@/styled-system/css';

export default function Email() {
    const { t } = useTranslation();

    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                })}
            >
                <InputField
                // readOnly={isEmailFieldDisabled}
                // value={emailId}
                // onChange={(e) => {
                //     setValue('email', `${e.target.value}@${emailDomain}`);
                // }}
                />

                <span
                    className={css({
                        fontSize: { base: '1.2rem', md: '1.4rem' },
                    })}
                >
                    @
                </span>

                <InputField
                // readOnly={isEmailFieldDisabled}
                // ref={emailDomainRef}
                // value={emailDomain}
                // onChange={(e) => {
                //     setValue('email', `${emailId}@${e.target.value}`);
                // }}
                />
            </div>
            <Select
                isSearchable
                // menuIsOpen
                // isDisabled={isEmailFieldDisabled}
                placeholder={t('직접입력')}
                options={EMAIL_DOMAIN_LIST}
                formatOptionLabel={(option) => t(option.label)}
                onChange={(item) => {
                    console.log('🚀 ~ EmailForm ~ item:', item);
                    if (!item) {
                        return;
                    }
                    // if (item.value === '') {
                    //     emailDomainRef.current?.focus();
                    // }
                    // setValue('email', `${emailId}@${item?.value}`);
                }}
            />
            <ErrorMessage name="email" />
        </div>
    );
}
