import React from 'react';
import * as styles from './TextArea.css';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: React.Ref<HTMLTextAreaElement>;
}

export default function TextArea({ className, ...props }: TextAreaProps) {
    return (
        <textarea
            className={`${styles.textArea} ${className || ''}`}
            {...props}
        />
    );
}
