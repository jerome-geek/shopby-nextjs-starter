import { outlinedButton } from '@/shared/ui/button/style.css';
import type { OutlinedButtonProps } from '@/shared/ui/button/types';

const OutlinedButton = ({
    children,
    className,
    ...props
}: OutlinedButtonProps) => {
    return (
        <button
            {...props}
            className={`${outlinedButton({ visual: props.variant })} ${className || ''}`}
        >
            {children}
        </button>
    );
};

export default OutlinedButton;

