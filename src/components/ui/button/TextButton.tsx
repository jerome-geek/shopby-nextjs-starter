import { textButtonStyle } from '@/components/ui/button/style';
import { TextButtonProps } from '@/components/ui/button/types';
import { cx } from '@/styled-system/css';

export default function TextButton({
    children,
    variant,
    className,
    ...props
}: TextButtonProps) {
    return (
        <button
            type='button'
            className={cx(textButtonStyle({ visual: variant }), className)}
            {...props}
        >
            {children}
        </button>
    );
}
