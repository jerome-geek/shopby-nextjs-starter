import type React from 'react';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputContainerProps
    extends React.InputHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const InputContainer = ({ children, ...props }: InputContainerProps) => {
    return (
        <div
            {...props}
            className={clsx(
                twMerge('flex flex-col gap-1.5 relative', props.className),
            )}
        >
            {children}
        </div>
    );
};

export default InputContainer;
