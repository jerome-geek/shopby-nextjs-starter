import { includes } from '@fxts/core';
import clsx from 'clsx';

import * as styles from '@/shared/ui/input/field/index.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
}

const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

export const InputField = ({
    onKeyDown,
    ref,
    className,
    ...props
}: InputFieldProps) => {
    const { inputMode, maxLength } = props;

    return (
        <input
            ref={ref}
            autoComplete='off'
            {...props}
            className={clsx(styles.inputField, className)}
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

                onKeyDown?.(e);
            }}
        />
    );
};
