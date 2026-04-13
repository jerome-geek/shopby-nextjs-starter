import clsx from 'clsx';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';

export interface TablePaginationFooterProps {
    /** 전체 항목 수 */
    totalCount: number;
    /** 현재 페이지 (1부터) */
    page: number;
    /** 페이지당 개수 */
    pageSize: number;
    /** 마지막 페이지 (서버 응답과 일치시키려면 전달; 없으면 totalCount 기준으로 계산) */
    lastPage?: number;
    /**
     * 페이지 변경 핸들러 (전달하면 기본 쿼리스트링 업데이트를 오버라이드)
     * - 미전달 시 `pageSearchParam`을 사용해 URL 쿼리스트링을 갱신합니다.
     */
    onPageChange?: (page: number) => void;
    /** 기본 쿼리스트링 키 (기본: 'page') */
    pageSearchParam?: string;
    className?: string;
}

function buildPaginationItems(
    page: number,
    lastPage: number,
): (number | 'ellipsis')[] {
    if (lastPage < 5) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    // lastPage >= 5: 항상 1·lastPage는 고정하고, 가운데만 현재 주변으로 잘라 ellipsis가 생기게 함
    // (이전 로직은 lastPage가 작을 때 middle이 2~(last-1) 전체를 포함해 1~6이 한 줄로 나옴)
    const sibling = 1;
    let left = Math.max(2, page - sibling);
    let right = Math.min(lastPage - 1, page + sibling);

    if (page <= 2) {
        right = Math.min(lastPage - 1, 3);
    }

    if (page >= lastPage - 1) {
        left = Math.max(2, lastPage - 2);
    }

    const middlePages = Array.from(
        { length: Math.max(0, right - left + 1) },
        (_, index) => left + index,
    );

    return [
        1,
        ...(left > 2 ? (['ellipsis'] as const) : []),
        ...middlePages,
        ...(right < lastPage - 1 ? (['ellipsis'] as const) : []),
        lastPage,
    ];
}

const navButtonClass =
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50';

const pageButtonLayoutClass =
    'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors';

const TablePaginationFooter = ({
    totalCount,
    page,
    pageSize,
    lastPage: lastPageProp,
    onPageChange,
    pageSearchParam = 'page',
    className,
}: TablePaginationFooterProps) => {
    const [, setSearchParams] = useSearchParams();

    const derivedLastPage =
        totalCount === 0 ? 1 : Math.max(1, Math.ceil(totalCount / pageSize));

    const lastPage = lastPageProp ?? derivedLastPage;
    const safePage = Math.min(Math.max(1, page), lastPage);

    const rangeStart = totalCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const rangeEnd = Math.min(safePage * pageSize, totalCount);

    const items = buildPaginationItems(safePage, lastPage);

    const handlePageChange = useCallback(
        (nextPage: number) => {
            if (onPageChange) {
                onPageChange(nextPage);
                return;
            }

            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);

                if (nextPage <= 1) {
                    next.delete(pageSearchParam);
                } else {
                    next.set(pageSearchParam, String(nextPage));
                }

                return next;
            });
        },
        [onPageChange, pageSearchParam, setSearchParams],
    );

    return (
        <div
            className={clsx(
                'flex flex-wrap items-center justify-between gap-4 pb-10',
                className,
            )}
        >
            <p className='text-sm text-[#6a7282]'>
                총 {totalCount.toLocaleString()}개 중{' '}
                {totalCount === 0
                    ? '0'
                    : `${rangeStart.toLocaleString()}-${rangeEnd.toLocaleString()}`}
                개 표시
            </p>
            <div className='flex items-center gap-2'>
                <button
                    type='button'
                    className={navButtonClass}
                    aria-label='이전 페이지'
                    disabled={safePage <= 1}
                    onClick={() => handlePageChange(safePage - 1)}
                >
                    <ChevronLeftSmallIcon className='h-4 w-4' />
                </button>
                {items.map((item, index) =>
                    item === 'ellipsis' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className='flex h-8 w-8 select-none items-center justify-center text-sm text-[#99a1af]'
                            aria-hidden
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={item}
                            type='button'
                            className={clsx(
                                pageButtonLayoutClass,
                                item === safePage
                                    ? 'border border-brand-500 bg-brand-500 font-semibold text-white hover:bg-brand-600'
                                    : 'border border-[#e5e7eb] bg-white text-[#6a7282] hover:bg-gray-50',
                            )}
                            aria-label={`${item}페이지`}
                            aria-current={
                                item === safePage ? 'page' : undefined
                            }
                            onClick={() => handlePageChange(item)}
                        >
                            {item}
                        </button>
                    ),
                )}
                <button
                    type='button'
                    className={navButtonClass}
                    aria-label='다음 페이지'
                    disabled={safePage >= lastPage}
                    onClick={() => handlePageChange(safePage + 1)}
                >
                    <ChevronRightSmallIcon className='h-4 w-4' />
                </button>
            </div>
        </div>
    );
};

export default TablePaginationFooter;
