import { textButtonStyle } from '@/components/ui/button/style.css';
import type { TextButtonProps } from '@/components/ui/button/types';

export default function TextButton({
    children,
    variant,
    className,
    ...props
}: TextButtonProps) {
    return (
        <button
            type="button"
            className={`${textButtonStyle({ visual: variant })} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}
