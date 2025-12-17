import { button } from '@/components/Button/style';
import { SolidButtonProps } from '@/components/Button/types';

const SolidButton = ({ children, ...props }: SolidButtonProps) => {
    return (
        <button {...props} className={button({ visual: props.variant })}>
            {children}
        </button>
    );
};

export default SolidButton;
