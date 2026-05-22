import Seo from '@/components/common/seo';
import { filter, pipe, toArray, uniq } from '@fxts/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useLenis } from 'lenis/react';
import { Bookmark, Heart, ShoppingCart } from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import FetchBoundary from '@/components/common/FetchBoundary';
import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';
import {
    RecipeCommentSection,
    RecipeDetailStickyFooter,
    RecipeDetailStickyFooterSkeleton,
    RecipeRecommend,
} from '@/components/recipe';
import { VerticalMoreMenu } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { SIX_HOUR_IN_SECONDS } from '@/const/time';
import { createRecipeSeoData } from '@/entities/recipe/utils/seo';
import { useCustomDialog } from '@/features/dialog';
import useBookmark from '@/features/recipe/hooks/useBookmark';
import { useRecipeMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { recipeKeys } from '@/hooks/queryKeys';
import { useRecipeDetail } from '@/hooks/suspenseQuery/shop/recipe';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/[sno]/index.css';
import { vars } from '@/styles/theme.css';

const HEADER_HEIGHT = 90;
const HEADER_HEIGHT_MOBILE = 70;
const SCROLL_OFFSET_MARGIN = 16;

interface RecipeDetailContentProps {
    sno: number;
}

const RecipeDetailContent = ({ sno }: RecipeDetailContentProps) => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();

    const { addToast } = useToast();
    const { openLoginDialog } = useCustomDialog();
    const { toggleRecipeBookmark } = useBookmark();

    const lenis = useLenis();

    const isLogin = useAuth();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data: recipeDetailData } = useRecipeDetail({ sno, memberNo });

    const isEditable = memberNo === recipeDetailData.memberNo;

    const { likeRecipe, unlikeRecipe, deleteRecipe } = useRecipeMutation();

    const handleEdit = () => {
        router.push({
            pathname: PATHS.RECIPES.WRITE,
            query: { recipeNo: sno },
        });
    };

    const handleDelete = async () => {
        const isConfirm = await openAsyncDialog({
            type: 'confirm',
            message: t('정말 삭제하시겠습니까?'),
            confirmText: t('삭제'),
            cancelText: t('취소'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isConfirm) {
            deleteRecipe.mutate(
                { sno },
                {
                    onSuccess: () => {
                        addToast({
                            variant: 'success',
                            message: t('레시피가 삭제되었습니다.'),
                        });
                        router.replace(PATHS.RECIPES.SCRAP);
                    },
                },
            );
        }
    };

    const cookingMinutes = recipeDetailData.durationSeconds
        ? Math.floor(recipeDetailData.durationSeconds / 60)
        : 0;

    const liked = !!recipeDetailData.liked;
    const likeCount = recipeDetailData.likeCount ?? 0;

    const bookmarked = !!recipeDetailData.bookmarked;
    const bookmarkCount = recipeDetailData.bookmarkCount ?? 0;

    const sourceUrl = recipeDetailData.sourceUrl;

    const ingredients = recipeDetailData.ingredients ?? [];
    const imageList = pipe(
        [
            recipeDetailData.thumbnailUrl,
            ...(recipeDetailData.steps?.map((s) => s.stepImageUrl) ?? []),
        ],
        filter((img): img is string => !!img),
        uniq,
        toArray,
    );

    const youtubeIframeRef = useRef<HTMLIFrameElement | null>(null);

    const onLikeToggle = () => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        const mutation = liked ? unlikeRecipe : likeRecipe;

        mutation.mutate(
            { sno },
            {
                onSuccess: () => {
                    addToast({
                        message: liked
                            ? t('좋아요를 취소했습니다.')
                            : t('레시피를 좋아합니다.'),
                        variant: 'success',
                    });
                },
            },
        );
    };

    const onBookmarkToggle = () => {
        toggleRecipeBookmark({ sno, bookmarked });
    };

    const scrollToComments = () => {
        const element = document.getElementById('recipe-comments');
        if (element) {
            const headerHeight = isMobile
                ? HEADER_HEIGHT_MOBILE
                : HEADER_HEIGHT;

            const top = headerHeight + SCROLL_OFFSET_MARGIN;

            lenis?.scrollTo(element, {
                offset: -top,
                duration: 0.9,
                immediate: false,
            });
        }
    };

    const isYoutube = recipeDetailData.sourceType === 'YOUTUBE';
    const isYoutubeShorts = isYoutube && sourceUrl.includes('/shorts/');
    const isYoutubeLongForm = isYoutube && !isYoutubeShorts;
    const youtubeEmbedUrl =
        isYoutube && recipeDetailData.sourceId
            ? `https://www.youtube.com/embed/${recipeDetailData.sourceId}?enablejsapi=1&rel=0&playsinline=1`
            : null;
    const thumbnailUrl = recipeDetailData.thumbnailUrl || imageList[0];

    const seekYoutubeTo = (seconds: number) => {
        const contentWindow = youtubeIframeRef.current?.contentWindow;

        if (!contentWindow) {
            return;
        }

        contentWindow.postMessage(
            JSON.stringify({
                event: 'command',
                func: 'seekTo',
                args: [seconds, true],
            }),
            'https://www.youtube.com',
        );

        contentWindow.postMessage(
            JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: [],
            }),
            'https://www.youtube.com',
        );
    };

    return (
        <div className={styles.container}>
            {/* --- HEADER AREA --- */}
            <section className={styles.headerArea}>
                <div
                    className={styles.imageCarouselContainer({
                        sticky: isYoutubeLongForm,
                    })}
                >
                    <div
                        className={styles.imageCarousel({
                            ratio: isYoutubeLongForm ? 'wide' : 'square',
                        })}
                    >
                        {youtubeEmbedUrl ? (
                            <iframe
                                ref={youtubeIframeRef}
                                src={youtubeEmbedUrl}
                                title={recipeDetailData.title}
                                className={styles.carouselVideo}
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowFullScreen
                            />
                        ) : (
                            thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt={recipeDetailData.title}
                                    className={styles.carouselImage}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className={styles.headerInfo}>
                    <div className={styles.recipeInfo}>
                        <div className={styles.titleRow}>
                            <div className={styles.titleContainer}>
                                <h1 className={styles.title}>
                                    {recipeDetailData.title}
                                </h1>
                                {isEditable && (
                                    <div className={styles.moreMenuWrapper}>
                                        <VerticalMoreMenu
                                            id={`recipe-more-menu-${recipeDetailData.sno}`}
                                            iconSize={28}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.actionButton}
                                    onClick={onLikeToggle}
                                    data-active={liked}
                                    data-type='like'
                                >
                                    <Heart
                                        size={36}
                                        fill={liked ? 'currentColor' : 'none'}
                                        strokeWidth={1}
                                    />
                                    <span>{likeCount}</span>
                                </button>
                                <button
                                    className={styles.actionButton}
                                    onClick={onBookmarkToggle}
                                    data-active={bookmarked}
                                    data-type='bookmark'
                                >
                                    <Bookmark
                                        size={36}
                                        fill={
                                            bookmarked ? 'currentColor' : 'none'
                                        }
                                        strokeWidth={1}
                                    />
                                    <span>
                                        {bookmarkCount.toLocaleString()}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <p className={styles.author}>
                            {`By ${
                                recipeDetailData.authorName ??
                                recipeDetailData.memberName ??
                                recipeDetailData.memberId
                            }`}
                        </p>
                    </div>

                    <div className={styles.metaList}>
                        <span className={styles.iconTimerText}>
                            <TimerIcon currentColor={vars.color.gray['80']} />
                            {cookingMinutes > 0 ? `${cookingMinutes}분` : '-'}
                        </span>
                        <span className={styles.iconText}>
                            <PeopleIcon currentColor={vars.color.gray['60']} />
                            {recipeDetailData.servings
                                ? `${recipeDetailData.servings}인분`
                                : '-'}
                        </span>
                        <span className={styles.iconText}>
                            <CalorieIcon currentColor={vars.color.gray['60']} />
                            {!!recipeDetailData.caloriesPerServingKcal
                                ? `${recipeDetailData.caloriesPerServingKcal} kcal`
                                : '-'}
                        </span>
                    </div>
                </div>
            </section>

            {/* --- INGREDIENTS AREA --- */}
            <section className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>요리 재료 List</h2>
                    <p className={styles.partnersDisclaimer}>
                        이 게시물은 쿠팡파트너스 활동의 일환으로, 이에 따른
                        일정액의 수수료를 제공받습니다.
                    </p>
                </div>

                <ul className={styles.ingredientsGrid}>
                    {ingredients.map(
                        ({ sno, name, amount, coupangProduct }) => {
                            return (
                                <li
                                    key={`ingredients-${sno}`}
                                    className={styles.ingredientItem}
                                >
                                    <div className={styles.ingredientInfo}>
                                        <span className={styles.ingredientName}>
                                            {name}{' '}
                                            {amount && (
                                                <span
                                                    className={
                                                        styles.ingredientAmount
                                                    }
                                                >
                                                    - {amount}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {coupangProduct?.url && (
                                        <a
                                            href={coupangProduct.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={styles.buyButton}
                                        >
                                            <ShoppingCart
                                                size={isMobile ? 14 : 16}
                                                fill='currentColor'
                                            />
                                            <span>구매</span>
                                        </a>
                                    )}
                                </li>
                            );
                        },
                    )}
                </ul>
            </section>

            {/* --- TOOLS AREA --- */}
            {/* TODO: 기존에 없던 영역이므로 일단 제거, 어떻게 처리할진 논의 필요 */}
            {/* <section className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>사용할 도구</h2>

                <div className={styles.toolsGrid}>
                    {MOCK_RECIPE.tools.map((tool) => (
                        <div key={tool.productNo} className={styles.toolCard}>
                            <ProductCard {...tool} />
                        </div>
                    ))}
                </div>
            </section> */}

            {/* --- STEPS AREA --- */}
            <section className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>따라해봐 How to Cook</h2>

                <ul className={styles.stepList}>
                    {recipeDetailData.steps?.map((step) => (
                        <li key={step.sno} className={styles.stepItem}>
                            <div className={styles.stepNumber}>
                                {step.stepNumber}
                            </div>
                            <div className={styles.stepContent}>
                                <p className={styles.stepDescription}>
                                    {step.description}
                                    {isYoutube &&
                                        step.timestampSeconds != null && (
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    seekYoutubeTo(
                                                        step.timestampSeconds ??
                                                            0,
                                                    )
                                                }
                                                className={styles.stepTime}
                                                aria-label={`영상 ${dayjs()
                                                    .startOf('day')
                                                    .add(
                                                        step.timestampSeconds,
                                                        'second',
                                                    )
                                                    .format(
                                                        'mm:ss',
                                                    )} 구간으로 이동`}
                                            >
                                                {dayjs()
                                                    .startOf('day')
                                                    .add(
                                                        step.timestampSeconds,
                                                        'second',
                                                    )
                                                    .format('mm:ss')}
                                            </button>
                                        )}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {isMobile && <hr className={styles.mobileDivider} />}

            {/* --- COMMENTS AREA --- */}
            <div id='recipe-comments'>
                <FetchBoundary fallback={<div>Loading comments...</div>}>
                    <RecipeCommentSection recipeSno={Number(sno)} />
                </FetchBoundary>
            </div>

            {isMobile && <hr className={styles.mobileDivider} />}

            {/* --- RECOMMENDED RECIPES --- */}
            <FetchBoundary>
                <RecipeRecommend />
            </FetchBoundary>

            {/* --- MOBILE STICKY FOOTER --- */}
            <FetchBoundary fallback={<RecipeDetailStickyFooterSkeleton />}>
                <RecipeDetailStickyFooter
                    recipeSno={Number(sno)}
                    liked={liked}
                    likeCount={likeCount}
                    bookmarked={bookmarked}
                    bookmarkCount={bookmarkCount}
                    onLikeToggle={onLikeToggle}
                    onBookmarkToggle={onBookmarkToggle}
                    onCommentClick={scrollToComments}
                />
            </FetchBoundary>
        </div>
    );
};

const RecipeDetailPage = ({
    sno,
    seoData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            {seoData && <Seo type='article' {...seoData} />}
            <FetchBoundary>
                <RecipeDetailContent sno={sno} />
            </FetchBoundary>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking', // 처음 들어오는 sno에 대해 서버에서 생성될 때까지 대기(SEO 유리)
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();
    const sno = Number(params?.sno) || 0;

    if (!sno) {
        return { notFound: true };
    }

    let seoData = null;

    try {
        const recipeDetail = await queryClient.fetchQuery({
            queryKey: recipeKeys.detail(sno, 0),
            queryFn: async () => {
                const { data } = await recipe.getRecipeDetail(sno);

                return data;
            },
        });

        seoData = createRecipeSeoData({ recipeDetail, sno });
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    return {
        props: {
            sno,
            seoData,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: SIX_HOUR_IN_SECONDS,
    };
};

export default RecipeDetailPage;
