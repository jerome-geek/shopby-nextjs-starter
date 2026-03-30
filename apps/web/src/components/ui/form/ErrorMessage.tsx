import { get, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from './ErrorMessage.css';

interface ErrorMessageProps {
    name: string;
}

export default function ErrorMessage({ name }: ErrorMessageProps) {
    const { t } = useTranslation();

    const { errors } = useFormState({ name });

    const errorMessage = get(errors, name)?.message ?? '';

    return (
        !!errorMessage && (
            <p className={styles.errorMessage}>
                {t(typeof errorMessage === 'string' ? errorMessage : '')}
            </p>
        )
    );
}
