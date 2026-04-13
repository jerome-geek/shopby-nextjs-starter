import clsx from 'clsx';

import { ReactComponent as EyeOffIcon } from '@/icons/eye-off.svg?react';
import { ReactComponent as EyeSmallIcon } from '@/icons/eye-small.svg?react';

export interface DisplayVisibilityBadgeProps {
    isVisible: boolean;
    visibleLabel?: string;
    hiddenLabel?: string;
    showHiddenIcon?: boolean;
    className?: string;
}

const baseClass =
    'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium';

export const DisplayVisibilityBadge = ({
    isVisible,
    visibleLabel = '노출',
    hiddenLabel = '비노출',
    showHiddenIcon = true,
    className,
}: DisplayVisibilityBadgeProps) => {
    if (isVisible) {
        return (
            <span
                className={clsx(
                    baseClass,
                    'bg-[#dcfce7] text-[#016630]',
                    className,
                )}
            >
                <EyeSmallIcon className='h-3 w-3 shrink-0 text-[#016630]' />
                {visibleLabel}
            </span>
        );
    }

    return (
        <span
            className={clsx(
                baseClass,
                'bg-[#f3f4f6] text-[#1e2939]',
                className,
            )}
        >
            {showHiddenIcon ? (
                <EyeOffIcon className='h-3 w-3 shrink-0 text-[#1e2939]' />
            ) : null}
            {hiddenLabel}
        </span>
    );
};
