import { RecipeVariants } from '@vanilla-extract/recipes';

import { labelStyles } from '@/components/ui/input/label/index.css';

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
    RecipeVariants<typeof labelStyles> & {
        isRequired?: boolean;
        isCheckbox?: boolean;
    };

export const InputLabel = ({
    children,
    isRequired,
    isCheckbox,
    ...props
}: InputLabelProps) => {
    return (
        <label className={labelStyles({ isRequired, isCheckbox })} {...props}>
            {children}
        </label>
    );
};
