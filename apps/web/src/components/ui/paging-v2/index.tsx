'use client';

import React, { HTMLAttributes, useMemo } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { map, pipe, range, toArray } from '@fxts/core';

import * as styles from '@/components/ui/paging-v2/index.css';

interface PagingV2Props extends HTMLAttributes<HTMLElement> {
    currentPage: number | string;
    totalCount: number | string;
    pageSize: number;
    onPageClick: (pageNumber: number) => void;
    type?: 'default' | 'simple';
}

/**
 * 헬퍼 함수: 페이지 번호 리스트 생성
 */
const getPageList = (start: number, end: number, currentPageIndex: number) => {
    return pipe(
        range(start, end + 1),
        map((page) => ({
            page,
            isSelected: page === currentPageIndex,
        })),
        toArray,
    );
};

const PagingV2 = ({
    currentPage,
    totalCount,
    pageSize,
    onPageClick,
    type = 'default',
    className,
    ...props
}: PagingV2Props) => {
    // 1. 데이터 파싱 및 파생 변수 계산 (Derived State)
    const normalizedCurrentPage = Number(currentPage) || 1;
    const totalPage = Math.ceil(Number(totalCount) / pageSize) || 1;
    const maxTotalPage = Math.min(totalPage, 5000);

    const isFirstPage = normalizedCurrentPage === 1;
    const isLastPage = normalizedCurrentPage === maxTotalPage;

    // 2. 페이지 리스트 메모이제이션 (성능 최적화 및 useEffect 제거)
    const pages = useMemo(() => {
        if (maxTotalPage < 5) {
            return getPageList(1, maxTotalPage, normalizedCurrentPage);
        }
        if (normalizedCurrentPage <= 3) {
            return getPageList(1, 5, normalizedCurrentPage);
        }
        if (maxTotalPage - normalizedCurrentPage <= 1) {
            return getPageList(
                maxTotalPage - 4,
                maxTotalPage,
                normalizedCurrentPage,
            );
        }
        return getPageList(
            normalizedCurrentPage - 2,
            normalizedCurrentPage + 2,
            normalizedCurrentPage,
        );
    }, [normalizedCurrentPage, maxTotalPage]);

    if (Number(totalCount) === 0 || totalPage <= 1) {
        return null;
    }

    // 3. 심플 타입 렌더링
    if (type === 'simple') {
        return (
            <nav
                aria-label='Pagination'
                className={`${styles.container} ${className || ''}`}
                {...props}
            >
                <button
                    disabled={isFirstPage}
                    type='button'
                    onClick={() => onPageClick(normalizedCurrentPage - 1)}
                    className={styles.arrowButton}
                    aria-label='Go to previous page'
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    className={styles.pageList}
                    data-type='simple'
                    aria-live='polite'
                >
                    <span
                        className={styles.pageButton}
                        data-selected='true'
                        aria-current='page'
                    >
                        {normalizedCurrentPage}
                    </span>
                    <span className={styles.slash} aria-hidden='true'>
                        /
                    </span>
                    <span className={styles.pageButton}>{maxTotalPage}</span>
                </div>

                <button
                    disabled={isLastPage}
                    type='button'
                    onClick={() => onPageClick(normalizedCurrentPage + 1)}
                    className={styles.arrowButton}
                    aria-label='Go to next page'
                >
                    <ChevronRight size={24} />
                </button>
            </nav>
        );
    }

    // 4. 기본 타입 렌더링 (시멘틱 HTML 및 ARIA 적용)
    return (
        <nav
            aria-label='Pagination Navigation'
            className={`${styles.container} ${className || ''}`}
            {...props}
        >
            {!isFirstPage && (
                <div className={styles.arrowGroup}>
                    <button
                        type='button'
                        onClick={() => onPageClick(1)}
                        className={styles.arrowButton}
                        aria-label='Go to first page'
                    >
                        <ChevronsLeft size={16} />
                    </button>
                    <button
                        type='button'
                        onClick={() => onPageClick(normalizedCurrentPage - 1)}
                        className={styles.arrowButton}
                        aria-label='Go to previous page'
                    >
                        <ChevronLeft size={16} />
                    </button>
                </div>
            )}

            <ul className={styles.pageList}>
                {pages.map(({ page, isSelected }) => (
                    <li key={page}>
                        <button
                            type='button'
                            data-selected={isSelected}
                            aria-current={isSelected ? 'page' : undefined}
                            aria-label={`Go to page ${page}`}
                            onClick={() => {
                                if (normalizedCurrentPage === page) return;
                                onPageClick(page);
                            }}
                            className={styles.pageButton}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>

            {!isLastPage && (
                <div className={styles.arrowGroup}>
                    <button
                        type='button'
                        onClick={() => onPageClick(normalizedCurrentPage + 1)}
                        className={styles.arrowButton}
                        aria-label='Go to next page'
                    >
                        <ChevronRight size={16} />
                    </button>
                    <button
                        type='button'
                        onClick={() => onPageClick(maxTotalPage)}
                        className={styles.arrowButton}
                        aria-label='Go to last page'
                    >
                        <ChevronsRight size={16} />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default PagingV2;
