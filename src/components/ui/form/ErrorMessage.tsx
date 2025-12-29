import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

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
                <p
                    className={css({
                        color: token('colors.red'),
                        fontSize: { base: '1.2rem', md: '1.4rem' },
                        fontWeight: 'medium',
                    })}
                >
                    {t(message)}
                </p>
            )}
        />
    );
}
