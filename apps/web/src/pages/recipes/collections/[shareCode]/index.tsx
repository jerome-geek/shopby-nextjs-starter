import Seo from '@/components/common/seo';
import { filter, map, pipe, take, toArray } from '@fxts/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCheck, Share2, Users } from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { collection } from '@/api/shop';
import { RecipeDetailCard } from '@/components/recipe/detail-card';
import { VerticalMoreMenu } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { useCollectionMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { collectionKeys } from '@/hooks/queryKeys';
import { useSharedCollection } from '@/hooks/suspenseQuery/shop/collection';
import { useCustomDialog } from '@/hooks/ui';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/recipes/collections/[shareCode]/index.css';

// --- 컬렉션 상세 (데이터 연동) ---
const CollectionDetailContent = ({ shareCode }: { shareCode: string }) => {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();
    const { openCollectionForm, openLoginDialog } = useCustomDialog();

    const { data: profileData } = useProfile();

    const router = useRouter();

    const { data: sharedCollectionData } = useSharedCollection({
        shareCode,
    });

    const {
        bookmarkCollection: { mutate: bookmarkCollectionMutate },
        unBookmarkCollection: { mutate: unBookmarkCollectionMutate },
    } = useCollectionMutation();

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: sharedCollectionData.title, url });
        } else {
            await navigator.clipboard.writeText(url);
            addToast({
                message: t('링크가 복사되었습니다.'),
                variant: 'success',
            });
        }
    };

    const handleBookmarkCollection = (
        collectionSno: number,
        bookmarked: boolean,
    ) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        if (bookmarked) {
            unBookmarkCollectionMutate(
                { collectionSno },
                {
                    onSuccess: () => {
                        addToast({
                            message: '북마크를 취소했습니다.',
                            variant: 'success',
                        });
                    },
                },
            );
        } else {
            bookmarkCollectionMutate(
                { collectionSno },
                {
                    onSuccess: () => {
                        addToast({
                            message: '북마크를 추가했습니다.',
                            variant: 'success',
                        });
                    },
                },
            );
        }
    };

    const recipes = sharedCollectionData.recipes ?? [];

    // sharedCollectionData.recipes가 있으면 해당 썸네일을 사용하고, 없으면 recipeImageUrls를 사용합니다.
    const previewImages = pipe(
        recipes,
        map((r) => r.thumbnailUrl),
        filter((url): url is string => !!url),
        take(3),
        toArray,
    );

    const hasImages = previewImages.length > 0;

    const isEditable = sharedCollectionData.memberNo === profileData?.memberNo;

    const {
        remove: { mutateAsync: removeCollectionMutateAsync },
    } = useCollectionMutation();

    const handleEditCollection = () => {
        openCollectionForm({
            shareCode: sharedCollectionData.shareCode,
        });
    };

    const handleDeleteCollection = async () => {
        if (!collection) {
            return;
        }

        const isAgree = await openAsyncDialog({
            message: `${sharedCollectionData.title} 컬렉션을 삭제하시겠습니까?`,
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        try {
            await removeCollectionMutateAsync({
                collectionSno: sharedCollectionData.sno,
            });

            addToast({
                variant: 'success',
                message: `${sharedCollectionData.title} 컬렉션이 삭제되었습니다.`,
            });

            router.replace(PATHS.RECIPES.SCRAP);
        } catch (error) {
            // Error handled by mutation hook
        }
    };

    return (
        <>
            <Seo
                title={sharedCollectionData.title}
                description={
                    sharedCollectionData.description ??
                    `${sharedCollectionData.memberName ?? ''}님의 레시피 컬렉션`
                }
            />

            <div className={styles.container}>
                {/* --- Hero Section --- */}
                <section className={styles.heroSection}>
                    {/* 컬렉션 정보 */}
                    <div className={styles.heroInfo}>
                        <span className={styles.badge}>
                            <Bookmark size={12} />
                            {t('레시피 컬렉션')}
                        </span>

                        <div className={styles.titleWrapper}>
                            <h1 className={styles.collectionTitle}>
                                {sharedCollectionData.title}
                            </h1>

                            {isEditable && (
                                <VerticalMoreMenu
                                    id={`collection-more-menu-${sharedCollectionData.sno}`}
                                    onEdit={handleEditCollection}
                                    onDelete={handleDeleteCollection}
                                />
                            )}
                        </div>

                        {sharedCollectionData.description && (
                            <p className={styles.collectionDescription}>
                                {sharedCollectionData.description}
                            </p>
                        )}

                        <div className={styles.metaRow}>
                            <span className={styles.metaItem}>
                                <Users size={14} />
                                <span className={styles.metaItemStrong}>
                                    {sharedCollectionData.memberName ??
                                        t('익명')}
                                </span>
                            </span>
                            <span className={styles.divider}>·</span>
                            <span className={styles.metaItem}>
                                {t('레시피')}{' '}
                                <span className={styles.metaItemStrong}>
                                    {sharedCollectionData.recipes.length || 0}
                                </span>
                                {t('개')}
                            </span>
                            <span className={styles.divider}>·</span>
                            <span className={styles.metaItem}>
                                <Bookmark size={14} />
                                <span className={styles.metaItemStrong}>
                                    {sharedCollectionData.bookmarkCount}
                                </span>
                            </span>
                        </div>

                        <div className={styles.actionRow}>
                            {sharedCollectionData.memberNo !==
                                profileData?.memberNo && (
                                <button
                                    className={styles.bookmarkButton}
                                    data-bookmarked={
                                        sharedCollectionData.bookmarked
                                    }
                                    onClick={() =>
                                        handleBookmarkCollection(
                                            sharedCollectionData.sno,
                                            sharedCollectionData.bookmarked,
                                        )
                                    }
                                    id='btn-bookmark-collection'
                                >
                                    {sharedCollectionData.bookmarked ? (
                                        <BookmarkCheck size={18} />
                                    ) : (
                                        <Bookmark size={18} />
                                    )}
                                    {sharedCollectionData.bookmarked
                                        ? t('북마크됨')
                                        : t('컬렉션 북마크')}
                                </button>
                            )}

                            <button
                                className={styles.shareButton}
                                onClick={handleShare}
                                id='btn-share-collection'
                            >
                                <Share2 size={18} />
                                {t('공유')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Recipe Grid Section --- */}
                <section className={styles.recipeSection}>
                    {recipes.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Bookmark size={40} />
                            <p className={styles.emptyStateText}>
                                {t('아직 담긴 레시피가 없습니다.')}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.recipeGrid}>
                            {recipes.map((r) => (
                                <RecipeDetailCard key={r.sno} recipe={r} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

// --- Skeleton ---
const CollectionDetailSkeleton = () => (
    <div className={styles.container}>
        <section className={styles.heroSection}>
            <div className={styles.heroInfo}>
                <div
                    className={styles.skeletonBar}
                    style={{ width: 100, height: 24, borderRadius: 100 }}
                />
                <div
                    className={styles.skeletonBar}
                    style={{ width: '70%', height: 36, marginTop: 8 }}
                />
                <div
                    className={styles.skeletonBar}
                    style={{ width: '90%', height: 20 }}
                />
                <div
                    className={styles.skeletonBar}
                    style={{ width: '50%', height: 16 }}
                />
            </div>
        </section>
        <section className={styles.recipeSection}>
            <div className={styles.recipeGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}
                    >
                        <div className={styles.skeletonThumb} />
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonText} />
                    </div>
                ))}
            </div>
        </section>
    </div>
);

// --- Page ---
const CollectionSharePage = ({
    shareCode,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Suspense fallback={<CollectionDetailSkeleton />}>
            <CollectionDetailContent shareCode={shareCode} />
        </Suspense>
    );
};

// --- ISR ---
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking', // 처음 접하는 shareCode는 서버에서 생성 후 캐싱
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const shareCode = params?.shareCode as string;

    if (!shareCode) {
        return { notFound: true };
    }

    const queryClient = new QueryClient();

    try {
        await queryClient.fetchQuery({
            queryKey: collectionKeys.detail(shareCode, 0),
            queryFn: async () => {
                const { data } = await collection.getShared(shareCode);

                return data;
            },
        });
    } catch (error) {
        console.error('Failed to fetch shared collection:', error);

        return { notFound: true };
    }

    return {
        props: {
            shareCode,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 60, // 1시간마다 ISR 갱신 체크
    };
};

export default CollectionSharePage;
