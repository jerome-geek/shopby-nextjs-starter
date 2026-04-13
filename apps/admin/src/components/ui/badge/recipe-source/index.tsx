import clsx from 'clsx';

import { ReactComponent as InstagramSimpleIcon } from '@/icons/instagram-simple.svg?react';
import { ReactComponent as YoutubeSimpleIcon } from '@/icons/youtube-simple.svg?react';

export interface RecipeSourceBadgeProps {
    source: string;
    showIcon?: boolean;
    className?: string;
}

type ResolvedSource = 'youtube' | 'instagram';

const resolveSource = (source: string): ResolvedSource | null => {
    const key = source.trim().toUpperCase();
    if (key === 'YOUTUBE') {
        return 'youtube';
    }
    if (key === 'INSTAGRAM') {
        return 'instagram';
    }
    return null;
};

const baseClass =
    'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium';

export const RecipeSourceBadge = ({
    source,
    showIcon = false,
    className,
}: RecipeSourceBadgeProps) => {
    const resolved = resolveSource(source);
    if (resolved === null) {
        return null;
    }

    if (resolved === 'youtube') {
        return (
            <span
                className={clsx(
                    baseClass,
                    'bg-[#ffe2e2] text-[#9f0712]',
                    className,
                )}
            >
                {showIcon ? (
                    <YoutubeSimpleIcon className='h-3 w-3 shrink-0' />
                ) : null}
                YouTube
            </span>
        );
    }

    return (
        <span
            className={clsx(
                baseClass,
                'bg-[#fce7f3] text-[#a3004c]',
                className,
            )}
        >
            {showIcon ? (
                <InstagramSimpleIcon className='h-3 w-3 shrink-0' />
            ) : null}
            Instagram
        </span>
    );
};
