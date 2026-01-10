import React from 'react';

import { css, cx } from '@/styled-system/css';

type InputFieldContainerProps = React.HTMLAttributes<HTMLDivElement>;

const InputFieldContainer = ({
    children,
    className,
    ...props
}: InputFieldContainerProps) => {
    return (
        <div
            {...props}
            className={cx(
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                }),
                className
            )}
        >
            {children}
        </div>
    );
};

export default InputFieldContainer;
