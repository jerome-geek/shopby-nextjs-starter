import { type ReactNode, useRef, useState } from 'react';

import LoadingWrapper from '@/components/ui/loading-wrapper';

import { AngleLeftIcon, AngleRightIcon } from '@/icons';

type SwipeSectionProps = {
    title: string;
    description: string;
    isLoading: boolean;
    isError: boolean;
    emptyText: string;
    pageCount: number;
    children?: ReactNode;
};

export const SwipeSection = ({
    title,
    description,
    isLoading,
    isError,
    emptyText,
    pageCount,
    children,
}: SwipeSectionProps) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const scrollByPage = (direction: 'left' | 'right') => {
        const el = scrollerRef.current;
        if (!el) return;

        const amount = el.clientWidth;
        el.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    const scrollToPage = (idx: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollTo({
            left: el.clientWidth * idx,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const width = el.clientWidth || 1;
        const next = Math.round(el.scrollLeft / width);
        setPageIndex(Math.max(0, Math.min(next, Math.max(0, pageCount - 1))));
    };

    return (
        <div className='rounded-[14px] border border-[#e5e7eb] bg-white px-6 pb-6 pt-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] dark:border-gray-700 dark:bg-gray-900'>
            <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                    <h3 className='mb-1 truncate text-lg font-semibold leading-7 tracking-[-0.44px] text-[#101828] dark:text-white'>
                        {title}
                    </h3>
                    <p className='text-xs font-normal leading-4 text-[#99a1af]'>
                        {description}
                    </p>
                </div>

                <div className='flex shrink-0 items-center gap-2'>
                    <button
                        type='button'
                        onClick={() => scrollByPage('left')}
                        className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] transition-colors hover:bg-[#fafafa] hover:text-[#101828] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5'
                        aria-label='왼쪽으로 스크롤'
                        disabled={isLoading || isError}
                    >
                        <AngleLeftIcon className='h-5 w-5' />
                    </button>
                    <button
                        type='button'
                        onClick={() => scrollByPage('right')}
                        className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] transition-colors hover:bg-[#fafafa] hover:text-[#101828] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5'
                        aria-label='오른쪽으로 스크롤'
                        disabled={isLoading || isError}
                    >
                        <AngleRightIcon className='h-5 w-5' />
                    </button>
                </div>
            </div>

            <div className='mt-4'>
                <LoadingWrapper isLoading={isLoading}>
                    {isError ? (
                        <p className='py-10 text-center text-sm text-[#6a7282]'>
                            데이터를 불러오지 못했습니다.
                        </p>
                    ) : children ? (
                        <>
                            <div
                                ref={scrollerRef}
                                onScroll={handleScroll}
                                className='no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-1'
                            >
                                {children}
                            </div>
                            {pageCount > 1 ? (
                                <div className='mt-4 flex items-center justify-center gap-2'>
                                    {Array.from(
                                        { length: pageCount },
                                        (_, idx) => idx,
                                    ).map((idx) => (
                                        <button
                                            key={idx}
                                            type='button'
                                            onClick={() => scrollToPage(idx)}
                                            aria-label={`${
                                                idx + 1
                                            }페이지로 이동`}
                                            className={`h-2 w-2 rounded-full transition-colors ${
                                                idx === pageIndex
                                                    ? 'bg-brand-500'
                                                    : 'bg-[#e5e7eb] hover:bg-[#d1d5db] dark:bg-gray-700 dark:hover:bg-gray-600'
                                            }`}
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <p className='py-10 text-center text-sm text-[#6a7282]'>
                            {emptyText}
                        </p>
                    )}
                </LoadingWrapper>
            </div>
        </div>
    );
};
