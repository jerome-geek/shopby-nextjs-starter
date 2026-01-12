import React from 'react';

import { css, cx } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: React.Ref<HTMLTextAreaElement>;
}

export default function TextArea({ className, ...props }: TextAreaProps) {
    return (
        <textarea
            className={cx(
                css({
                    border: `1px solid ${token('colors.gray50')}`,
                    borderRadius: '8px',
                    padding: '12px',
                    textStyle: 'body2.regular',
                    color: token('colors.gray80'),
                    resize: 'none',
                    minHeight: '150px',
                    _placeholder: {
                        textStyle: 'body1.regular',
                        color: token('colors.gray60'),
                    },
                }),
                className,
            )}
            {...props}
        />
    );
}
