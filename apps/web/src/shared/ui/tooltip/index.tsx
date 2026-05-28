import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';

import * as styles from '@/shared/ui/tooltip/index.css';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

export const Tooltip = ({
    children,
    content,
    side = 'top',
    align = 'center',
}: TooltipProps) => {
    return (
        <TooltipPrimitive.Root delayDuration={200}>
            <TooltipPrimitive.Trigger asChild>
                {children}
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                    className={styles.tooltipContent}
                    side={side}
                    align={align}
                    sideOffset={8}
                >
                    {content}
                    <TooltipPrimitive.Arrow className={styles.tooltipArrow} />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
};
