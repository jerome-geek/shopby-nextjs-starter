import React from 'react';
import * as styles from './FieldContainer.css';

interface InputFieldContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    gridRatio?: number[];
}

const InputFieldContainer = ({
    children,
    gridRatio = [],
    className,
    ...props
}: InputFieldContainerProps) => {
    return (
        <div
            {...props}
            className={`${styles.fieldContainer} ${className || ''}`}
            style={{
                display: gridRatio.length > 0 ? 'grid' : 'flex',
                gridTemplateColumns: gridRatio
                    .map((ratio) => `${ratio}fr`)
                    .join(' '),
                ...props.style,
            }}
        >
            {children}
        </div>
    );
};

export default InputFieldContainer;
