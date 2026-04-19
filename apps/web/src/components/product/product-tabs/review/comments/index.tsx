import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import { useState } from 'react';

import * as styles from '@/components/product/product-tabs/review/comments/index.css';
import PagingV2 from '@/components/ui/paging-v2';
import useProductReviewCommentList from '@/hooks/query/display/review/useProductReviewCommentList';

const PAGE_SIZE = 5;

const Comments = ({
    productNo,
    reviewNo,
}: {
    productNo: number;
    reviewNo: number;
}) => {
    const [page, setPage] = useState(1);

    const { data: productReviewCommentListData } = useProductReviewCommentList({
        productNo,
        reviewNo,
        searchParams: {
            page,
            size: PAGE_SIZE,
            hasTotalCount: true,
        },
    });

    const comments = productReviewCommentListData?.contents ?? [];
    const totalCount = Number(productReviewCommentListData?.totalCount) || 0;

    if (isEmpty(comments)) {
        return null;
    }

    return (
        <div className={styles.container} aria-label='리뷰 댓글'>
            {comments.map((item) => {
                const author = item.isAdmin ? '담당자' : item.registerNo;
                const dateText = item.registerYmdt
                    ? dayjs(item.registerYmdt).format('YYYY.MM.DD')
                    : '';

                return (
                    <div key={item.commentNo} className={styles.item}>
                        <div className={styles.authorRow}>
                            <span className={styles.author}>{author}</span>
                            {dateText && (
                                <span className={styles.date}>{dateText}</span>
                            )}
                        </div>
                        <div className={styles.content}>{item.content}</div>
                    </div>
                );
            })}

            <PagingV2
                currentPage={page}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                onPageClick={(next) => setPage(next)}
            />
        </div>
    );
};

export default Comments;
