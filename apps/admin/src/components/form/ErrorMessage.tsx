import {
    type Control,
    type FieldPath,
    type FieldValues,
    useFormState,
} from 'react-hook-form';

interface ErrorMessageProps<T extends FieldValues = FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    errorMessage?: string;
}

export default function ErrorMessage<T extends FieldValues = FieldValues>({
    name,
    control,
    errorMessage: errorMessageProps,
}: ErrorMessageProps<T>) {
    const { errors } = useFormState({ control, name });

    const errorMessage = errors?.[name]?.message ?? '';

    const isError = !!errorMessage || !!errorMessageProps;

    return (
        isError && (
            <p className='text-error-500 text-sm'>
                {errorMessageProps ||
                    (typeof errorMessage === 'string' ? errorMessage : '')}
            </p>
        )
    );
}
