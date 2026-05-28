import { pipe, take, toArray } from '@fxts/core';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { BookmarkIcon } from '@/shared/ui/icons';
import { VerticalMoreMenu } from '@/shared/ui';
import { PATHS } from '@/const/paths';
import { useCustomDialog } from '@/features/dialog';
import * as styles from '@/features/recipe/components/scrap-collection-section/index.css';
import useBookmark from '@/features/recipe/hooks/useBookmark';
import { useCollectionMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useCollectionList } from '@/hooks/suspenseQuery/shop/collection';
import { useDialog, useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

export const ScrapCollectionSection = () => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { openCollectionForm, withRequiredAuth } = useCustomDialog();
    const { isMobile } = useResponsive();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const { data: collectionListData = [] } = useCollectionList({
        options: {
            select: (data) => {
                return pipe(data, take(6), toArray);
            },
        },
    });

    const { toggleCollectionBookmark } = useBookmark();

    const {
        remove: { mutateAsync: removeCollectionMutateAsync },
    } = useCollectionMutation();

    const handleEditCollection = (shareCode: string) => {
        openCollectionForm({ shareCode });
    };

    const handleDeleteCollection = async (sno: number) => {
        const isAgree = await openAsyncDialog({
            message: t('정말로 이 컬렉션을 삭제하시겠습니까?'),
            type: 'confirm',
            confirmText: t('삭제'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isAgree) {
            await removeCollectionMutateAsync({
                collectionSno: sno,
            });
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t('컬렉션')}</h2>
            </div>

            <ul className={styles.collectionGrid}>
                {collectionListData.map((collection) => (
                    <motion.li
                        key={collection.sno}
                        whileHover={{ y: -8 }}
                        className={styles.collectionItem}
                    >
                        <article className={styles.collectionArticle}>
                            <Link
                                href={PATHS.RECIPES.COLLECTIONS.replace(
                                    '[shareCode]',
                                    collection.shareCode,
                                )}
                                className={styles.collectionCard}
                            >
                                {collection.recipeImageUrls &&
                                collection.recipeImageUrls.length > 0 ? (
                                    <div className={styles.collageGrid}>
                                        {collection.recipeImageUrls
                                            .slice(0, 5)
                                            .map((url, idx) => (
                                                <div
                                                    key={idx}
                                                    className={clsx(
                                                        styles.collageImage,
                                                        idx > 0 &&
                                                            styles.imageListItemOverlap,
                                                    )}
                                                    style={{
                                                        zIndex: idx + 1,
                                                    }}
                                                >
                                                    <img
                                                        src={url}
                                                        className={styles.image}
                                                        alt={`${collection.title} ${idx}`}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className={styles.collagePlaceholder}>
                                        <BookmarkIcon
                                            variant='filled'
                                            fill={vars.color.green['80']}
                                            strokeColor={vars.color.green['80']}
                                            width={32}
                                        />
                                    </div>
                                )}
                                <div className={styles.collectionInfo}>
                                    <div className={styles.collectionTitleArea}>
                                        <h3 className={styles.collectionTitle}>
                                            {collection.title}
                                        </h3>
                                        <p className={styles.collectionDesc}>
                                            {collection.description}
                                        </p>
                                        <p className={styles.collectionFooter}>
                                            By{' '}
                                            {collection.memberName || t('나')} ·{' '}
                                            {collection.recipeCount}
                                            {t('개')}
                                        </p>
                                    </div>

                                    <div className={styles.buttonContainer}>
                                        {memberNo === collection.memberNo ? (
                                            <VerticalMoreMenu
                                                id={String(collection.sno)}
                                                onEdit={() =>
                                                    handleEditCollection(
                                                        collection.shareCode,
                                                    )
                                                }
                                                onDelete={() =>
                                                    handleDeleteCollection(
                                                        collection.sno,
                                                    )
                                                }
                                            />
                                        ) : (
                                            <button
                                                type='button'
                                                className={
                                                    styles.bookmarkButton
                                                }
                                                onClick={withRequiredAuth(
                                                    (e) => {
                                                        e.preventDefault();
                                                        toggleCollectionBookmark(
                                                            {
                                                                sno: collection.sno,
                                                                bookmarked:
                                                                    collection.bookmarked,
                                                            },
                                                        );
                                                    },
                                                )}
                                            >
                                                <BookmarkIcon
                                                    variant={
                                                        collection.bookmarked
                                                            ? 'filled'
                                                            : 'outline'
                                                    }
                                                    fill={
                                                        collection.bookmarked
                                                            ? vars.color.green[
                                                                  '100'
                                                              ]
                                                            : 'none'
                                                    }
                                                    strokeColor={
                                                        collection.bookmarked
                                                            ? vars.color.green[
                                                                  '100'
                                                              ]
                                                            : vars.color.gray[
                                                                  '40'
                                                              ]
                                                    }
                                                    width={24}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </article>
                    </motion.li>
                ))}
            </ul>

            <button
                type='button'
                className={styles.createButton}
                onClick={() => openCollectionForm()}
            >
                <Plus size={isMobile ? 18 : 20} />
                <span>{t('새 컬렉션 만들기')}</span>
            </button>
        </section>
    );
};
