import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from '@/components/ui/form/ErrorMessage';
import InputField from '@/components/ui/input/field';
import { css } from '@/styled-system/css';

export default function Mobile() {
    const { t } = useTranslation();

    const {
        register,
        getValues,
        control,
        formState: { errors },
    } = useFormContext();

    const mobileNo = getValues('mobileNo');

    // TODO: 본인인증 연동 이후에 해당 값 변경
    const isAuthenticationByPhone = true;

    return (
        <div>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                })}
            >
                {isAuthenticationByPhone ? (
                    <>
                        <InputField
                            readOnly
                            inputMode="numeric"
                            value={mobileNo?.slice(0, 3) ?? ''}
                            tabIndex={-1}
                        />
                        <InputField
                            readOnly
                            inputMode="numeric"
                            value={mobileNo?.slice(3, 7) ?? ''}
                            tabIndex={-1}
                        />
                        <InputField
                            readOnly
                            inputMode="numeric"
                            value={mobileNo?.slice(7, 11) ?? ''}
                            tabIndex={-1}
                        />
                    </>
                ) : (
                    <div>
                        <InputField
                            inputMode="numeric"
                            {...register('mobileNo')}
                        />
                        <ErrorMessage name="mobileCountryCode" />
                        <ErrorMessage name="mobileNo" />
                    </div>
                )}
            </div>
            <ErrorMessage name="mobileNo" />
        </div>
    );
}
