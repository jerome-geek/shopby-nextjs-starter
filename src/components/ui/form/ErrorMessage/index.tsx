import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

interface Props {
    name: string;
}

const ErrorMessage = ({ name }: Props) => {
    const t = useTranslations();
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
};

export default ErrorMessage;
