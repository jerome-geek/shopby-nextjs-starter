import { filter, pipe, reduce } from '@fxts/core';
import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/shared/components/form/error-message/index.css';

export const ErrorMessage = ({ name }: { name: string }) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const { errors } = useFormState({ control });

    const error = pipe(
        name.split(/[.[\]]+/),
        filter((v) => !!v),
        (keys) =>
            reduce(
                (acc, key) =>
                    (acc as Record<string, { message?: string }>)?.[key],
                errors as { message?: string },
                keys,
            ),
    );

    const isError = !!error;

    if (!isError) {
        return null;
    }

    return (
        <RHFErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
                <p className={styles.errorMessage}>{t(message)}</p>
            )}
        />
    );
};
