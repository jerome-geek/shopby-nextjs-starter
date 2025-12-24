import { button } from '@/components/ui/button/style';
import { SolidButtonProps } from '@/components/ui/button/types';

const SolidButton = ({ children, ...props }: SolidButtonProps) => {
    return (
        <button {...props} className={button({ visual: props.variant })}>
            {children}
        </button>
    );
};

export default SolidButton;
