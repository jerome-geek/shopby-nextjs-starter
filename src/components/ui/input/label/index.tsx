import { css, cva } from '@/styled-system/css';
import type { VariantProps } from 'class-variance-authority';

const labelStyles = cva({
    base: {
        position: 'relative',
        alignSelf: 'flex-start',
        fontSize: { base: '1.2rem', md: '1.4rem' },
        fontWeight: 'bold',
    },
    variants: {
        isRequired: {
            true: {
                _after: {
                    content: "''",
                    backgroundColor: 'var(--color-main)',
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    right: '-8px',
                    top: { base: '4px', sm: '2px' },
                },
            },
            false: {
                _after: {
                    content: 'none',
                },
            },
        },
    },
    defaultVariants: {
        isRequired: false,
    },
});

interface InputLabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelStyles> {}

export const InputLabel = ({
    children,
    isRequired,
    ...props
}: InputLabelProps) => {
    return (
        <label className={labelStyles({ isRequired })} {...props}>
            {children}
        </label>
    );
};
