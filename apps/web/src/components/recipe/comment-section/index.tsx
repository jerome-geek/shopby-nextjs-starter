import * as styles from '@/components/recipe/comment-section/index.css';

import FetchBoundary from '@/shared/components/common/FetchBoundary';
import { CommentInput } from '@/components/recipe/comment-section/comment-input';
import { CommentList } from '@/components/recipe/comment-section/comment-list';

interface RecipeCommentSectionProps {
    recipeSno: number;
    scrollToComments: () => void;
}

/**
 * 레시피 상세 댓글 섹션
 */
export const RecipeCommentSection = ({
    recipeSno,
    scrollToComments,
}: RecipeCommentSectionProps) => {
    return (
        <section className={styles.commentSection}>
            <FetchBoundary
                fallback={
                    <div className={styles.commentList}>
                        Loading comments...
                    </div>
                }
                errorFallback={<div>Failed to load comments.</div>}
            >
                <CommentList
                    recipeSno={recipeSno}
                    scrollToComments={scrollToComments}
                />
            </FetchBoundary>

            <CommentInput recipeSno={recipeSno} />
        </section>
    );
};
