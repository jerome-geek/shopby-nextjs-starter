import React, { ReactNode, forwardRef } from 'react';
import { flexRecipe, FlexVariants } from '@/styles/layout.css';
import { clsx } from 'clsx';

type FlexProps = React.HTMLAttributes<HTMLDivElement> &
    FlexVariants & {
        children: ReactNode;
    };

export const Row = forwardRef<HTMLDivElement, FlexProps>(
    ({ children, direction, align, justify, wrap, gap, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    flexRecipe({ direction: direction || 'row', align, justify, wrap, gap }),
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);

Row.displayName = 'Row';

export const Column = forwardRef<HTMLDivElement, FlexProps>(
    ({ children, direction, align, justify, wrap, gap, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    flexRecipe({ direction: direction || 'column', align, justify, wrap, gap }),
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);

Column.displayName = 'Column';
