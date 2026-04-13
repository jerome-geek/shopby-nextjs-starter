import { Bookmark, ChefHat } from 'lucide-react';
import { clsx } from 'clsx';

import * as styles from '@/components/collection/collection-card/index.css';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

export interface CollectionCardProps {
    collection: BookmarkedRecipeCollection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
    const imageUrls = collection.recipeImageUrls.filter(Boolean);
    const hasImages = imageUrls.length > 0;

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

                <Bookmark
                    size={24}
                    strokeWidth={1.5}
                    fill={
                        collection.bookmarked ? vars.color.green['100'] : 'none'
                    }
                    color={
                        collection.bookmarked
                            ? vars.color.green['100']
                            : 'black'
                    }
                />
            </div>
        </div>
    );
};
