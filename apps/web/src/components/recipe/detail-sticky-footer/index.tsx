import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react';
import { overlay } from 'overlay-kit';

import ShareBottomSheet from '@/components/bottom-sheet/share';
import ShareModal from '@/components/modal/share';
import * as styles from '@/components/recipe/detail-sticky-footer/index.css';
import { useRecipeCommentList } from '@/hooks/suspenseQuery/shop/comment';
import { useResponsive } from '@/hooks/utils';

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
    const { isMobile } = useResponsive();

    const { data: recipeCommentListData } = useRecipeCommentList({
        params: {
            contentType: 'BOARD',
            contentSno: recipeSno,
        },
    });

    const handleShareButtonClick = () => {
        overlay.open((props) => {
            return isMobile ? (
                <ShareBottomSheet {...props} />
            ) : (
                <ShareModal {...props} />
            );
        });
    };

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

            <div className={styles.buttonContainer}>
                <button
                    type='button'
                    onClick={handleShareButtonClick}
                    aria-label='공유하기'
                >
                    <Share2 size={24} strokeWidth={1.5} />
                </button>

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
            </div>
        </footer>
    );
};
