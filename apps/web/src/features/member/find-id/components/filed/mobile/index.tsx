import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ErrorMessage } from '@/components/ui/input';
import { InputContainer, InputField, InputLabel } from '@/components/ui/input';
import { FindIdType } from '@/schema/profile.schema';

export const MobileField = () => {
    const { t } = useTranslation();

    const {
        register,
        formState: { errors },
    } = useFormContext<FindIdType>();

    return (
        <InputContainer>
            <InputLabel isRequired>{t('가입 휴대폰번호')}</InputLabel>

            <InputField
                type='tel'
                inputMode='numeric'
                placeholder={t('휴대폰번호를 입력해 주세요.')}
                {...register('mobileNo')}
                data-error={!!errors.mobileNo}
            />
            <ErrorMessage name='mobileNo' />
        </InputContainer>
    );
};
