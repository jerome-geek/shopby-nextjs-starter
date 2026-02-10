import React from 'react';
import * as styles from './FieldContainer.css';

type InputFieldContainerProps = React.HTMLAttributes<HTMLDivElement>;

const InputFieldContainer = ({
    children,
    className,
    ...props
}: InputFieldContainerProps) => {
    return (
        <div
            {...props}
            className={`${styles.fieldContainer} ${className || ''}`}
        >
            {children}
        </div>
    );
};

export default InputFieldContainer;
