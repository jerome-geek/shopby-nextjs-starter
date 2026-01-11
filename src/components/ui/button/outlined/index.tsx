import { outlinedButton } from '@/components/ui/button/style';
import { OutlinedButtonProps } from '@/components/ui/button/types';
import { cx } from '@/styled-system/css';

const OutlinedButton = ({
    children,
    className,
    ...props
}: OutlinedButtonProps) => {
    return (
        <button
            {...props}
            className={cx(outlinedButton({ visual: props.variant }), className)}
        >
            {children}
        </button>
    );
};

export default OutlinedButton;
