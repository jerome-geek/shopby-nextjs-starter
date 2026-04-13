import { button } from '@/components/ui/button/style.css';
import { SolidButtonProps } from '@/components/ui/button/types';

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

