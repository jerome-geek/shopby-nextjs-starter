'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import { map, pipe, range, toArray } from '@fxts/core';
// import { SmallCaretIcon } from '@/components/icons';
import * as styles from './paging.css';

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
            className={`${styles.pagingContainer} ${className || ''}`}
            {...props}
        >
            <div className={styles.buttonGroup}>
                {!isFirstPage && (
                    <>
                        <button
                            disabled={isFirstPage}
                            type="button"
                            onClick={() => onPageClick(1)}
                            className={styles.arrowButton}
                        >
                            <span className={styles.buttonContents}>
                                <DoubleCaret direction="left" />
                            </span>
                        </button>
                        <button
                            disabled={isFirstPage}
                            type="button"
                            onClick={() => onPageClick(parseCurrentPage - 1)}
                            className={styles.arrowButton}
                        >
                            <span className={styles.buttonContents}>
                                {/* <SmallCaretIcon direction="left" /> */}
                            </span>
                        </button>
                    </>
                )}
            </div>

            <div className={styles.pageListContainer}>
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
                        className={styles.pageButton}
                    >
                        <span>{page}</span>
                    </button>
                ))}
            </div>

            <div className={styles.buttonGroup}>
                {!isLastPage && (
                    <>
                        <button
                            type="button"
                            onClick={() => onPageClick(parseCurrentPage + 1)}
                            className={styles.arrowButton}
                        >
                            <span className={styles.buttonContents}>
                                <SmallCaretIcon direction="right" />
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onPageClick(maxTotalPage)}
                            className={styles.arrowButton}
                        >
                            <span className={styles.buttonContents}>
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
    <div className={styles.doubleCaretContainer}>
        <SmallCaretIcon direction={direction} />
        <SmallCaretIcon
            direction={direction}
            className={styles.doubleCaretSecond}
        />
    </div>
);

export default Paging;
