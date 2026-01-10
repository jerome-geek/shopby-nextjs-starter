import { outlinedButton } from '@/components/ui/button/style';
import { OutlinedButtonProps } from '@/components/ui/button/types';

const OutlinedButton = ({ children, ...props }: OutlinedButtonProps) => {
    return (
        <button
            {...props}
            className={outlinedButton({ visual: props.variant })}
        >
            {children}
        </button>
    );
};

export default OutlinedButton;
