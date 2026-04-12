import clsx from 'clsx';
import type { ButtonHTMLAttributes, Ref } from 'react';

export interface ToggleProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'onChange' | 'ref' | 'role' | 'type'
    > {
    ref?: Ref<HTMLButtonElement | null>;
    checked: boolean;
    onChange: (value: boolean) => void;
}

function Toggle({
    ref,
    checked,
    onChange,
    className,
    disabled,
    onClick,
    ...rest
}: ToggleProps) {
    return (
        <button
            ref={ref}
            type='button'
            role='switch'
            aria-checked={checked}
            disabled={disabled}
            {...rest}
            className={clsx(
                'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-hidden',
                disabled && 'cursor-not-allowed opacity-50',
                checked ? 'bg-[#ff6900]' : 'bg-[#d1d5db]',
                className,
            )}
            onClick={(e) => {
                onClick?.(e);
                if (e.defaultPrevented || disabled) return;
                onChange(!checked);
            }}
        >
            <span
                className={clsx(
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200',
                    checked ? 'translate-x-6' : 'translate-x-1',
                )}
            />
        </button>
    );
}

export default Toggle;
