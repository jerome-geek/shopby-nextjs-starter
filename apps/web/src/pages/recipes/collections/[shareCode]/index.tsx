import { useQueryClient } from '@tanstack/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCheck, Heart, Share2, Users } from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import { PATHS } from '@/const/paths';
import { useAuth } from '@/hooks/useAuth';
import { useCustomDialog } from '@/hooks/ui';
import { collectionKeys, recipeKeys } from '@/hooks/queryKeys';
import { useSharedCollection } from '@/hooks/suspenseQuery/shop/recipe';
import { useToast } from '@/hooks/ui/useToast';
import { useCollectionMutation, useRecipeMutation } from '@/hooks/mutations';
import * as styles from '@/pages/recipes/collections/[shareCode]/index.css';

// --- 컬렉션 상세 (데이터 연동) ---
const CollectionDetailContent = ({ shareCode }: { shareCode: string }) => {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const isLogin = useAuth();
    const { openLoginDialog } = useCustomDialog();
    const queryClient = useQueryClient();

    const { data: collection } = useSharedCollection({ shareCode });
    console.log('🚀 ~ CollectionDetailContent ~ collection:', collection);

    const {
        bookmarkCollection: { mutate: bookmarkCollectionMutate },
        unBookmarkCollection: { mutate: unBookmarkCollectionMutate },
    } = useCollectionMutation();

    const {
        likeRecipe: { mutate: likeRecipeMutate },
        unlikeRecipe: { mutate: unlikeRecipeMutate },
    } = useRecipeMutation();

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: collection.title, url });
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
                        queryClient.invalidateQueries({
                            queryKey: collectionKeys.publicSearches(),
                        });
                        queryClient.invalidateQueries({
                            queryKey: recipeKeys.sharedCollection(shareCode),
                        });
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
                        queryClient.invalidateQueries({
                            queryKey: collectionKeys.publicSearches(),
                        });
                        queryClient.invalidateQueries({
                            queryKey: recipeKeys.sharedCollection(shareCode),
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

    const handleLikeRecipe = (sno: number, liked: boolean) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        if (liked) {
            unlikeRecipeMutate(
                { sno },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: recipeKeys.sharedCollection(shareCode),
                        });
                    },
                },
            );
        } else {
            likeRecipeMutate(
                { sno },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: recipeKeys.sharedCollection(shareCode),
                        });
                    },
                },
            );
        }
    };

    const recipes = collection.recipes ?? [];

    // collection.recipes가 있으면 해당 썸네일을 사용하고, 없으면 recipeImageUrls를 사용합니다.
    const previewImages =
        recipes.length > 0
            ? recipes
                  .map((r) => r.thumbnailUrl)
                  .filter((url): url is string => !!url)
                  .slice(0, 3)
            : (collection.recipeImageUrls?.slice(0, 3) ?? []);

    const hasImages = previewImages.length > 0;

    return (
        <>
            <Head>
                <title>{collection.title} | JollyPot</title>
                <meta
                    name='description'
                    content={
                        collection.description ??
                        `${collection.memberName ?? ''}님의 레시피 컬렉션`
                    }
                />
            </Head>

            <div className={styles.container}>
                {/* --- Hero Section --- */}
                <section className={styles.heroSection}>
                    {/* 컬렉션 대표 이미지 콜라주 */}
                    <div className={styles.collageWrapper}>
                        {hasImages ? (
                            <>
                                <img
                                    src={previewImages[0]}
                                    className={styles.collageMain}
                                    alt={collection.title}
                                />
                                {previewImages[1] && (
                                    <img
                                        src={previewImages[1]}
                                        className={styles.collageSub}
                                        alt=''
                                    />
                                )}
                                {previewImages[2] && (
                                    <img
                                        src={previewImages[2]}
                                        className={styles.collageSub}
                                        alt=''
                                    />
                                )}
                            </>
                        ) : (
                            <div className={styles.collagePlaceholder}>
                                <Bookmark size={48} />
                            </div>
                        )}
                    </div>

                    {/* 컬렉션 정보 */}
                    <div className={styles.heroInfo}>
                        <span className={styles.badge}>
                            <Bookmark size={12} />
                            {t('레시피 컬렉션')}
                        </span>

                        <h1 className={styles.collectionTitle}>
                            {collection.title}
                        </h1>

                        {collection.description && (
                            <p className={styles.collectionDescription}>
                                {collection.description}
                            </p>
                        )}

                        <div className={styles.metaRow}>
                            <span className={styles.metaItem}>
                                <Users size={14} />
                                <span className={styles.metaItemStrong}>
                                    {collection.memberName ?? t('익명')}
                                </span>
                            </span>
                            <span className={styles.divider}>·</span>
                            <span className={styles.metaItem}>
                                {t('레시피')}{' '}
                                <span className={styles.metaItemStrong}>
                                    {collection.recipeCount}
                                </span>
                                {t('개')}
                            </span>
                            <span className={styles.divider}>·</span>
                            <span className={styles.metaItem}>
                                <Bookmark size={14} />
                                <span className={styles.metaItemStrong}>
                                    {collection.bookmarkCount}
                                </span>
                            </span>
                        </div>

                        <div className={styles.actionRow}>
                            <button
                                className={styles.bookmarkButton}
                                data-bookmarked={collection.bookmarked}
                                onClick={() =>
                                    handleBookmarkCollection(
                                        collection.sno,
                                        collection.bookmarked,
                                    )
                                }
                                id='btn-bookmark-collection'
                            >
                                {collection.bookmarked ? (
                                    <BookmarkCheck size={18} />
                                ) : (
                                    <Bookmark size={18} />
                                )}
                                {collection.bookmarked
                                    ? t('북마크됨')
                                    : t('컬렉션 북마크')}
                            </button>

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
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            {t('레시피 목록')}
                            <span className={styles.recipeCount}>
                                {collection.recipeCount}
                            </span>
                        </h2>
                    </div>

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
                                <Link
                                    key={r.sno}
                                    href={PATHS.RECIPES.DETAIL.replace(
                                        '[recipeNo]',
                                        r.sno.toString(),
                                    )}
                                    className={styles.recipeCard}
                                >
                                    <div className={styles.recipeThumbWrapper}>
                                        <img
                                            src={r.thumbnailUrl ?? ''}
                                            alt={r.title}
                                            className={styles.recipeThumb}
                                        />
                                        <button
                                            className={
                                                styles.recipeBookmarkBadge
                                            }
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!isLogin) {
                                                    openLoginDialog();
                                                }
                                            }}
                                            aria-label={t('북마크')}
                                        >
                                            <Bookmark
                                                size={14}
                                                fill={
                                                    r.bookmarked
                                                        ? 'currentColor'
                                                        : 'none'
                                                }
                                            />
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className={styles.recipeTitle}>
                                            {r.title}
                                        </h3>
                                        <p className={styles.recipeAuthor}>
                                            {r.authorName ??
                                                r.memberName ??
                                                t('익명')}
                                        </p>
                                        <div className={styles.recipeMeta}>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLikeRecipe(
                                                        r.sno,
                                                        r.liked,
                                                    );
                                                }}
                                                aria-label={t('좋아요')}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    cursor: 'pointer',
                                                    color: 'inherit',
                                                    font: 'inherit',
                                                }}
                                            >
                                                <Heart
                                                    size={12}
                                                    fill={
                                                        r.liked
                                                            ? 'currentColor'
                                                            : 'none'
                                                    }
                                                />
                                                {r.likeCount}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
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
            <div
                className={styles.collageWrapper}
                style={{ background: '#f0f0f0' }}
            />
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
            <div
                className={styles.skeletonBar}
                style={{ width: 140, height: 28 }}
            />
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
            queryKey: recipeKeys.sharedCollection(shareCode),
            queryFn: async () => {
                const { data } = await recipe.getSharedCollection(shareCode);
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
