import React from 'react';
import clsx from 'clsx';

import * as styles from '@/shared/ui/input/field-container/index.css';

interface InputFieldContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    gridRatio?: number[];
}

export const InputFieldContainer = ({
    children,
    gridRatio = [],
    className,
    ...props
}: InputFieldContainerProps) => {
    return (
        <div
            {...props}
            className={clsx(styles.fieldContainer, className)}
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
