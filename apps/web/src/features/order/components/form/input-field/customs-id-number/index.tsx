import { ChevronRightIcon } from 'lucide-react';
import {
    type FieldValues,
    type Path,
    type UseFormRegister,
    useFormContext,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputField } from '@/shared/ui/input/field';
import { InputFieldContainer } from '@/shared/ui/input/field-container';
import { InputLabel } from '@/shared/ui/input/label';
import * as styles from '@/features/order/components/form/input-field/customs-id-number/index.css';
import { ErrorMessage } from '@/shared/components/form';

interface CustomsIdNumberFieldProps<TFieldValues extends FieldValues> {
    register: UseFormRegister<TFieldValues>;
    name: Path<TFieldValues>;
    isRequired?: boolean;
    isVisible?: boolean;
}

export const CustomsIdNumberField = <TFieldValues extends FieldValues>({
    register,
    name,
    isRequired = false,
    isVisible = true,
}: CustomsIdNumberFieldProps<TFieldValues>) => {
    const { t } = useTranslation();

    return (
        isVisible && (
            <>
                <InputFieldContainer>
                    <InputLabel isRequired={isRequired} htmlFor={name}>
                        {t('개인통관고유부호')}
                    </InputLabel>
                    <InputField
                        id={name}
                        placeholder={t('P로 시작하는 13자리')}
                        {...register(name)}
                    />
                    <a
                        href='https://unipass.customs.go.kr/csp/persIndex.do'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.customsIdNumberLink}
                    >
                        <span>{t('개인통관고유부호 발급 바로가기')}</span>
                        <ChevronRightIcon width='16px' />
                    </a>
                </InputFieldContainer>
                <OptionalErrorMessage name={name} />
            </>
        )
    );
};

const OptionalErrorMessage = ({ name }: { name: string }) => {
    try {
        useFormContext();
        return <ErrorMessage name={name} />;
    } catch {
        return null;
    }
};
