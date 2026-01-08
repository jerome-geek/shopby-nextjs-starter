'use client';

import { usePathname } from 'next/navigation';

import { PATHS } from '@/const/paths';
import { css } from '@/styled-system/css';

type DeepValue<T> = T extends string
    ? T
    : T extends object
      ? DeepValue<T[keyof T]>
      : never;

type MyPageSectionUrls =
    | DeepValue<typeof PATHS.MYPAGE>
    | DeepValue<typeof PATHS.SUPPORT>;

interface MyPageTitleProps {
    titleMap: Partial<Record<MyPageSectionUrls, string>>;
}

export default function MyPageTitle({ titleMap }: MyPageTitleProps) {
    const pathname = usePathname();

    const currentPath = pathname as MyPageSectionUrls;

    const title =
        titleMap[currentPath] ||
        Object.entries(titleMap).find(([url]) =>
            pathname.startsWith(url),
        )?.[1] ||
        '';

    if (!title) return null;

    return (
        <div
            className={css({
                paddingBottom: '20px',
                marginBottom: '40px',
                borderBottom: '2px solid',
                borderColor: 'neutral.900',
                display: { base: 'none', md: 'block' },
            })}
        >
            <h2
                className={css({
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'neutral.900',
                })}
            >
                {title}
            </h2>
        </div>
    );
}
