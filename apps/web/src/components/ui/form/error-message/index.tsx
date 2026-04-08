import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { errorMessage } from '@/components/ui/form/error-message/index.css';

const ErrorMessage = ({ name }: { name: string }) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const { errors } = useFormState({ control, name });

    return (
        <RHFErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
                <p className={errorMessage}>{t(message)}</p>
            )}
        />
    );
};

export default ErrorMessage;
