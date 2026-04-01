import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { errorMessage } from '@/components/ui/form/error-message/index.css';

const ErrorMessage = ({ name }: { name: string }) => {
    const { t } = useTranslation();
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <RHFErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
                <span className={errorMessage}>{t(message)}</span>
            )}
        />
    );
};

export default ErrorMessage;
