import React from 'react';

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    rows?: number;
    className?: string;
    success?: boolean;
    error?: boolean;
    hint?: string;
}

const TextArea: React.FC<TextareaProps> = ({
    rows = 3,
    className = '',
    success = false,
    error = false,
    hint,
    disabled = false,
    ...props
}) => {
    let textareaClasses = `w-full resize-y rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

    if (disabled) {
        textareaClasses += ` cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500 opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400`;
    } else if (error) {
        textareaClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:text-error-400 dark:focus:border-error-800`;
    } else if (success) {
        textareaClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:border-success-500 dark:text-success-400 dark:focus:border-success-800`;
    } else {
        textareaClasses += ` border-gray-300 bg-transparent text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return (
        <div className='relative'>
            <textarea rows={rows} className={textareaClasses} {...props} />
            {hint ? (
                <p
                    className={`mt-1.5 text-xs ${
                        error
                            ? 'text-error-500'
                            : success
                            ? 'text-success-500'
                            : 'text-gray-500'
                    }`}
                >
                    {hint}
                </p>
            ) : null}
        </div>
    );
};

export default TextArea;
