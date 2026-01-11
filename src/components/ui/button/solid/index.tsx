import { button } from '@/components/ui/button/style';
import { SolidButtonProps } from '@/components/ui/button/types';
import { cx } from '@/styled-system/css';

const SolidButton = ({
    children,
    variant,
    className,
    ...props
}: SolidButtonProps) => {
    return (
        <button
            type='button'
            className={cx(button({ visual: variant }), className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default SolidButton;
