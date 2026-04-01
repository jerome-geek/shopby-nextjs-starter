import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/ui/form/error-message/index.css';

interface ErrorMessageProps {
    name: string;
    errorMessage?: string;
}

export default function ErrorMessage({
    name,
    errorMessage: errorMessageProps,
}: ErrorMessageProps) {
    const { t } = useTranslation();

    const { control } = useFormContext();
    const { errors } = useFormState({ control, name });

    const errorMessage = errors?.[name]?.message ?? '';

    const isError = !!errorMessage || !!errorMessageProps;

    return (
        isError && (
            <p className={styles.errorMessage}>
                {t(
                    errorMessageProps ||
                        (typeof errorMessage === 'string' ? errorMessage : ''),
                )}
            </p>
        )
    );
}
