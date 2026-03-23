import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from './ErrorMessage.css';

interface ErrorMessageProps {
    name: string;
}

export default function ErrorMessage({ name }: ErrorMessageProps) {
    const { t } = useTranslation();

    const {
        formState: { errors },
    } = useFormContext();

    return (
        <RHFErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
                <p className={styles.errorMessage}>{t(message)}</p>
            )}
        />
    );
}
