import React from 'react';

import * as styles from '@/components/ui/input/container/index.css';

type InputContainerProps = React.HTMLAttributes<HTMLDivElement>;

const InputContainer = ({
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

export default InputContainer;
