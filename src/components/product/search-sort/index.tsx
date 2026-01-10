'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { SORT_OPTIONS } from '@/const/product';
import { css } from '@/styled-system/css';
import { hstack } from '@/styled-system/patterns';
import useMediaQuery from '@/hooks/useMediaQuery';
import { SortIcon } from '@/components/icons/SortIcon';

export default function ProductSearchSort({ isMobile }: { isMobile: boolean }) {
    const isMobileView = useMediaQuery('(max-width: 767px)');
    const activeIsMobile = isMobileView ?? isMobile;

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedSortOption = useMemo(() => {
        return (
            SORT_OPTIONS.find(
                (option) =>
                    option.by === searchParams.get('by') &&
                    option.direction === searchParams.get('direction'),
            ) ?? SORT_OPTIONS[0]
        );
    }, [searchParams]);

    const handleSortClick = (sort: (typeof SORT_OPTIONS)[number]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('by', sort.by);
        params.set('direction', sort.direction);
        router.push(`${pathname}?${params.toString()}`);
    };

    return activeIsMobile ? (
        <button
            className={hstack({
                height: '32px',
                gap: '4px',
                textStyle: 'body1.regular',
                color: 'gray80',
            })}
        >
            <SortIcon />
            <span>{selectedSortOption.name}</span>
        </button>
    ) : (
        <div
            className={css({
                width: '100%',
                paddingBottom: '16px',
                borderBottom: '1px solid {colors.gray20}',
            })}
        >
            <ul
                className={hstack({
                    gap: '12px',
                    flexWrap: 'wrap',
                    justifyContent: 'end',
                })}
            >
                {SORT_OPTIONS.map((option) => (
                    <li key={option.id}>
                        <button
                            onClick={() => handleSortClick(option)}
                            className={css({
                                textStyle: 'headline2.medium',
                                color: 'gray60',
                                '&[aria-selected="true"]': {
                                    color: '{colors.black}',
                                },
                                whiteSpace: 'nowrap',
                            })}
                            aria-selected={selectedSortOption?.id === option.id}
                        >
                            <span>{option.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
