import { button } from '@/shared/ui/button/style.css';
import type { SolidButtonProps } from '@/shared/ui/button/types';

const SolidButton = ({
    children,
    variant,
    className,
    ...props
}: SolidButtonProps) => {
    return (
        <button
            type="button"
            className={`${button({ visual: variant })} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default SolidButton;

