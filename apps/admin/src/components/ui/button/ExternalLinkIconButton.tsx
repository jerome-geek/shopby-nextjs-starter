import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { ReactComponent as ExternalLinkIcon } from '@/icons/external-link.svg?react';

export type ExternalLinkIconButtonProps = Omit<
    ComponentPropsWithoutRef<'button'>,
    'children'
>;

const baseClassName =
    'flex h-9 w-9 items-center justify-center rounded-lg text-[#6a7282] transition-colors hover:bg-[#f3f4f6] hover:text-[#101828]';

export const ExternalLinkIconButton = ({
    type = 'button',
    className,
    'aria-label': ariaLabel = '외부 링크',
    ...rest
}: ExternalLinkIconButtonProps) => {
    return (
        <button
            type={type}
            className={clsx(baseClassName, className)}
            aria-label={ariaLabel}
            {...rest}
        >
            <ExternalLinkIcon className='h-4 w-4 shrink-0' aria-hidden />
        </button>
    );
};
