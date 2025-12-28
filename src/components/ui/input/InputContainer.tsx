import { css, cx } from '@/styled-system/css';
import React from 'react';

type InputContainerProps = React.HTMLAttributes<HTMLDivElement>;

const InputContainer = ({
    children,
    className,
    ...props
}: InputContainerProps) => {
    return (
        <div
            {...props}
            className={cx(
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                })
            )}
        >
            {children}
        </div>
    );
};

export default InputContainer;
