import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { Bookmark, ChefHat } from 'lucide-react';

import * as styles from '@/components/collection/collection-card/index.css';
import { useCollectionMutation } from '@/hooks/mutations';
import { useCustomDialog } from '@/hooks/ui/useCustomDialog';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';
import { collectionKeys } from '@/hooks/queryKeys';

export interface CollectionCardProps {
    collection: BookmarkedRecipeCollection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
    const isLogin = useAuth();

    const { addToast } = useToast();

    const { openLoginDialog } = useCustomDialog();

    const queryClient = useQueryClient();

    const imageUrls = collection.recipeImageUrls.filter(Boolean);
    const hasImages = imageUrls.length > 0;

    const { bookmarkCollection, unBookmarkCollection } =
        useCollectionMutation();

    const onBookmarkToggle = (collection: BookmarkedRecipeCollection) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        if (collection.bookmarked) {
            unBookmarkCollection.mutate(
                { collectionSno: collection.sno },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: collectionKeys.publicSearches(),
                        });
                        addToast({
                            message: '북마크를 취소했습니다.',
                            variant: 'success',
                        });
                    },
                },
            );
        } else {
            bookmarkCollection.mutate(
                { collectionSno: collection.sno },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: collectionKeys.publicSearches(),
                        });
                        addToast({
                            message: '북마크를 추가했습니다.',
                            variant: 'success',
                        });
                    },
                },
            );
        }
    };

    return (
        <div className={styles.container}>
            {hasImages ? (
                <ul className={styles.imageList}>
                    {imageUrls.map((url, index) => (
                        <li
                            key={index}
                            className={clsx(
                                styles.imageListItem,
                                index > 0 && styles.imageListItemOverlap,
                            )}
                            style={{ zIndex: index + 1 }}
                        >
                            <img
                                className={styles.image}
                                src={url}
                                alt={collection.title}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles.imagePlaceholder}>
                    <ChefHat size={32} color={vars.color.green['80']} />
                </div>
            )}

            <div className={styles.collectionInfo}>
                <div className={styles.collectionInfoContent}>
                    <h3 className={styles.collectionTitle}>
                        {collection.title}
                    </h3>

                    <p className={styles.collectionDescription}>
                        {collection.description}
                    </p>

                    <div className={styles.collectionInfoFooter}>
                        <span className={styles.collectionInfoFooterItem}>
                            By {collection.memberName}
                        </span>

                        <div className={styles.dot} />

                        <span className={styles.collectionInfoFooterItem}>
                            {collection.recipeCount}개
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        onBookmarkToggle(collection);
                    }}
                >
                    <Bookmark
                        size={24}
                        strokeWidth={1.5}
                        fill={
                            collection.bookmarked
                                ? vars.color.green['100']
                                : 'none'
                        }
                        color={
                            collection.bookmarked
                                ? vars.color.green['100']
                                : 'black'
                        }
                    />
                </button>
            </div>
        </div>
    );
};
