import { cva } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import type { VariantProps } from 'class-variance-authority';

const labelStyles = cva({
    base: {
        position: 'relative',
        alignSelf: 'flex-start',
        textStyle: 'body1.regular',
        display: 'flex',
        gap: { base: '8px' },
    },
    variants: {
        isRequired: {
            true: {
                _after: {
                    content: "''",
                    backgroundColor: token('colors.red'),
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    right: '-6px',
                    top: '0',
                },
            },
            false: {
                _after: {
                    content: 'none',
                },
            },
        },
        isCheckbox: {
            true: {
                fontWeight: '400',
                color: token('colors.gray80'),
            },
        },
    },
    defaultVariants: {
        isRequired: false,
        isCheckbox: false,
    },
});

interface InputLabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelStyles> {}

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
