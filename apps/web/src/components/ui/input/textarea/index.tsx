import React from 'react';

import * as styles from '@/components/ui/input/textarea/index.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: React.Ref<HTMLTextAreaElement>;
}

export const TextArea = ({ className, ...props }: TextAreaProps) => {
    return (
        <textarea
            className={`${styles.textArea} ${className || ''}`}
            {...props}
        />
    );
};
