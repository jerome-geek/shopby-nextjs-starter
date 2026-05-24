import { filter, pipe, reduce } from '@fxts/core';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/shared/components/form/error-message/index.css';

const getErrorMessage = (error: unknown): string | undefined => {
    if (!error) {
        return undefined;
    }

    if (typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: unknown }).message;

        if (typeof message === 'string') {
            return message;
        }
    }

    if (Array.isArray(error)) {
        for (const entry of error) {
            const message = getErrorMessage(entry);

            if (message) {
                return message;
            }
        }
    }

    if (typeof error === 'object') {
        for (const value of Object.values(error as Record<string, unknown>)) {
            const message = getErrorMessage(value);

            if (message) {
                return message;
            }
        }
    }

    return undefined;
};

export const ErrorMessage = ({ name }: { name: string }) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const { errors } = useFormState({ control, name });

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

    const errorMessage = getErrorMessage(error);

    if (!errorMessage) {
        return null;
    }

    return <p className={styles.errorMessage}>{t(errorMessage)}</p>;
};
