'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import { map, pipe, range, toArray } from '@fxts/core';
import { css, cx } from '@/styled-system/css';
import { SmallCaretIcon } from '@/components/icons';
import { token } from '@/styled-system/tokens';

interface PagingProps extends HTMLAttributes<HTMLDivElement> {
    currentPage: number | string;
    totalCount: number | string;
    pageSize: number;
    onPageClick: (pageNumber: number) => void;
}

const Paging = ({
    currentPage,
    totalCount,
    pageSize,
    onPageClick,
    className,
    ...props
}: PagingProps) => {
    const totalPage = Math.ceil(Number(totalCount) / pageSize) || 1;

    const parseCurrentPage =
        typeof currentPage === 'number' ? currentPage : parseInt(currentPage);

    const parseTotalPage =
        typeof totalPage === 'number' ? totalPage : parseInt(totalPage);

    const maxTotalPage = parseTotalPage > 5000 ? 5000 : parseTotalPage;

    const isFirstPage = parseCurrentPage === 1;
    const isLastPage = parseCurrentPage === maxTotalPage;

    const [currentPageList, setCurrentPageList] = useState<
        { page: number; isSelected: boolean }[]
    >([]);

    const pageList = (start: number, end: number, currentPageIndex: number) => {
        return pipe(
            range(start, end + 1),
            map((page) => ({
                page,
                isSelected: page === currentPageIndex,
            })),
            toArray
        );
    };

    useEffect(() => {
        if (parseTotalPage < 5) {
            setCurrentPageList(pageList(1, parseTotalPage, parseCurrentPage));
            return;
        }
        if (parseCurrentPage <= 3) {
            setCurrentPageList(pageList(1, 5, parseCurrentPage));
            return;
        }
        if (parseTotalPage - parseCurrentPage <= 1) {
            setCurrentPageList(
                pageList(parseTotalPage - 4, parseTotalPage, parseCurrentPage)
            );
            return;
        }
        setCurrentPageList(
            pageList(
                parseCurrentPage - 2,
                parseCurrentPage + 2,
                parseCurrentPage
            )
        );
    }, [parseCurrentPage, parseTotalPage]);

    return (
        <div
            className={cx(
                css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    gap: { base: '0', sm: '20px' },
                    '& svg': {
                        width: '13px',
                        height: '13px',
                        sm: {
                            width: 'auto',
                            height: 'auto',
                        },
                    },
                }),
                className
            )}
            {...props}
        >
            <div
                className={css({
                    display: 'flex',
                    gap: { base: '4px', sm: '8px' },
                })}
            >
                {!isFirstPage && (
                    <>
                        <button
                            disabled={isFirstPage}
                            type="button"
                            onClick={() => onPageClick(1)}
                            className={arrowButtonStyle}
                        >
                            <span className={leftButtonContentsStyle}>
                                <DoubleCaret direction="left" />
                            </span>
                        </button>
                        <button
                            disabled={isFirstPage}
                            type="button"
                            onClick={() => onPageClick(parseCurrentPage - 1)}
                            className={arrowButtonStyle}
                        >
                            <span className={leftButtonContentsStyle}>
                                <SmallCaretIcon direction="left" />
                            </span>
                        </button>
                    </>
                )}
            </div>

            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    sm: { gap: '4px' },
                })}
            >
                {currentPageList.map(({ page, isSelected }) => (
                    <button
                        key={page}
                        type="button"
                        aria-selected={isSelected}
                        onClick={() => {
                            if (parseCurrentPage === page) {
                                return;
                            }

                            onPageClick(page);
                        }}
                        className={pageButtonStyle}
                    >
                        <span>{page}</span>
                    </button>
                ))}
            </div>

            <div
                className={css({
                    display: 'flex',
                    gap: { base: '4px', sm: '8px' },
                })}
            >
                {!isLastPage && (
                    <>
                        <button
                            type="button"
                            onClick={() => onPageClick(parseCurrentPage + 1)}
                            className={arrowButtonStyle}
                        >
                            <span className={buttonContentsStyle}>
                                <SmallCaretIcon direction="right" />
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onPageClick(maxTotalPage)}
                            className={arrowButtonStyle}
                        >
                            <span className={buttonContentsStyle}>
                                <DoubleCaret direction="right" />
                            </span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// Double caret component using SmallCaretIcon
const DoubleCaret = ({ direction }: { direction: 'left' | 'right' }) => (
    <div className={css({ display: 'flex', alignItems: 'center' })}>
        <SmallCaretIcon direction={direction} />
        <SmallCaretIcon direction={direction} className={css({ ml: '-8px' })} />
    </div>
);

const pageButtonStyle = css({
    fontSize: '1.6rem',
    fontWeight: '500', // medium
    borderRadius: '50%',
    color: 'gray50',
    background: 'none',
    minWidth: '32px',
    height: 'auto',
    padding: '0 2px',
    aspectRatio: '1/1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
        color: 'black',
    },
    _selected: {
        color: 'black',
        backgroundColor: 'gray20',
    },
    sm: {
        fontSize: '1.8rem',
        width: '40px',
        height: '40px',
        padding: '0',
    },
});

const arrowButtonStyle = css({
    padding: '0',
    margin: '0',
    lineHeight: '0',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    sm: {
        width: '40px',
        height: '40px',
    },
});

const buttonContentsStyle = css({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    _hover: {
        '& svg path': {
            stroke: 'black',
        },
    },
});

const leftButtonContentsStyle = buttonContentsStyle;

export default Paging;
