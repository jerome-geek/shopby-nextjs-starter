import { includes } from '@fxts/core';

import * as styles from '@/components/ui/input/field/index.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    isError?: boolean;
}

const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

const InputField = ({ children, isError, ...props }: InputFieldProps) => {
    const { inputMode, maxLength } = props;

    return (
        <input
            className={styles.inputField}
            data-error={!!isError}
            autoComplete='off'
            onKeyDown={(e) => {
                const isAllowedKey = includes(e.key, ALLOWED_KEYS);

                if (!/[0-9]/.test(e.key) && !isAllowedKey) {
                    if (inputMode === 'numeric') {
                        e.preventDefault();
                    }
                }

                if (inputMode === 'numeric' && maxLength) {
                    const target = e.target as HTMLInputElement;
                    if (target.value.length >= maxLength && !isAllowedKey) {
                        e.preventDefault();
                    }
                }
            }}
            {...props}
        >
            {children}
        </input>
    );
};

export default InputField;
