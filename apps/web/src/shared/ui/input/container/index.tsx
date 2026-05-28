import React from 'react';

import * as styles from '@/shared/ui/input/container/index.css';

type InputContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const InputContainer = ({
    children,
    className,
    ...props
}: InputContainerProps) => {
    return (
        <div
            {...props}
            className={`${styles.inputContainer} ${className || ''}`}
        >
            {children}
        </div>
    );
};
