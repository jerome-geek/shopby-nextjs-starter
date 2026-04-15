import { Bookmark, Heart, MessageCircle } from 'lucide-react';

import * as styles from '@/components/recipe/detail-sticky-footer/index.css';
import { useRecipeCommentList } from '@/hooks/suspenseQuery/shop/comment';

export { RecipeDetailStickyFooterSkeleton } from '@/components/recipe/detail-sticky-footer/skeleton';

interface RecipeDetailStickyFooterProps {
    recipeSno: number;
    liked: boolean;
    likeCount: number;
    bookmarked: boolean;
    bookmarkCount: number;
    onLikeToggle: () => void;
    onBookmarkToggle: () => void;
    onCommentClick: () => void;
}

export const RecipeDetailStickyFooter = ({
    recipeSno,
    liked,
    likeCount,
    bookmarked,
    bookmarkCount,
    onLikeToggle,
    onBookmarkToggle,
    onCommentClick,
}: RecipeDetailStickyFooterProps) => {
    const { data: recipeCommentListData } = useRecipeCommentList({
        params: {
            contentType: 'BOARD',
            contentSno: recipeSno,
        },
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.actionButton}
                    onClick={onLikeToggle}
                    data-active={liked}
                    data-type='like'
                >
                    <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
                    <span>{likeCount.toLocaleString()}</span>
                </button>

                <button
                    className={styles.actionButton}
                    onClick={onCommentClick}
                >
                    <MessageCircle size={24} />
                    <span>{recipeCommentListData.count.toLocaleString()}</span>
                </button>
            </div>

            <button
                className={styles.actionButton}
                onClick={onBookmarkToggle}
                data-active={bookmarked}
                data-type='bookmark'
            >
                <Bookmark
                    size={24}
                    fill={bookmarked ? 'currentColor' : 'none'}
                />
                <span>{bookmarkCount.toLocaleString()}</span>
            </button>
        </footer>
    );
};
