import { ChevronLeft, ChevronRight } from 'lucide-react';

import * as styles from '@/shared/ui/paging-v3/index.css';

type PagingV3Props = {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageClick: (nextPage: number) => void;
};

export const PagingV3 = ({
    currentPage,
    totalCount,
    pageSize,
    onPageClick,
}: PagingV3Props) => {
    const totalPage = Math.max(1, Math.ceil(totalCount / pageSize));
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPage;

    return (
        <div className={styles.container}>
            <button
                type='button'
                className={styles.button}
                disabled={isPrevDisabled}
                onClick={() => onPageClick(currentPage - 1)}
                aria-label='이전 페이지'
            >
                <ChevronLeft size={16} />
            </button>

            <span className={styles.text}>
                <span className={styles.current}>{currentPage}</span>
                <span className={styles.separator}>/</span>
                <span className={styles.total}>{totalPage}</span>
            </span>

            <button
                type='button'
                className={styles.button}
                disabled={isNextDisabled}
                onClick={() => onPageClick(currentPage + 1)}
                aria-label='다음 페이지'
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};
