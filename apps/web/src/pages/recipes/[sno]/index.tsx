import { filter, pipe, toArray, uniq } from '@fxts/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Heart,
    ShoppingCart,
} from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { recipe } from '@/api/shop';
import FetchBoundary from '@/components/common/FetchBoundary';
import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';
import {
    RecipeCommentSection,
    RecipeDetailStickyFooter,
    RecipeDetailStickyFooterSkeleton,
    RecipeRecommend,
} from '@/components/recipe';
import { useRecipeMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { recipeKeys } from '@/hooks/queryKeys';
import { useBookmark } from '@/hooks/recipe';
import { useRecipeDetail } from '@/hooks/suspenseQuery/shop/recipe';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/[sno]/index.css';
import { vars } from '@/styles/theme.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HEADER_HEIGHT = 90;
const HEADER_HEIGHT_MOBILE = 70;
const SCROLL_OFFSET_MARGIN = 16;

const RecipeDetailPage = ({
    sno,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();
    const { openLoginDialog } = useCustomDialog();
    const { toggleRecipeBookmark } = useBookmark();

    const isLogin = useAuth();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data: recipeDetailData } = useRecipeDetail({ sno, memberNo });

    const cookingMinutes = recipeDetailData.durationSeconds
        ? Math.floor(recipeDetailData.durationSeconds / 60)
        : 0;

    const liked = !!recipeDetailData?.liked;
    const likeCount = recipeDetailData?.likeCount ?? 0;

    const bookmarked = !!recipeDetailData?.bookmarked;
    const bookmarkCount = recipeDetailData?.bookmarkCount ?? 0;

    const ingredients = recipeDetailData?.ingredients ?? [];
    const imageList = pipe(
        [
            recipeDetailData.thumbnailUrl,
            ...(recipeDetailData.steps?.map((s) => s.stepImageUrl) ?? []),
        ],
        filter((img): img is string => !!img),
        uniq,
        toArray,
    );

    const swiperRef = useRef<SwiperType | null>(null);

    const { likeRecipe, unlikeRecipe } = useRecipeMutation();
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

            const top =
                element.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                SCROLL_OFFSET_MARGIN;

            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const isSwiperEnabled = imageList.length > 1;

    return (
        <div className={styles.container}>
            <Head>
                <title>{recipeDetailData.title} | JollyPot</title>
            </Head>

            {/* --- HEADER AREA --- */}
            <section className={styles.headerArea}>
                <div className={styles.imageCarouselContainer}>
                    <div className={styles.imageCarousel}>
                        <Swiper
                            modules={[Pagination]}
                            enabled={isSwiperEnabled}
                            pagination={{
                                clickable: true,
                                el: '.recipe-thumbnail-pagination',
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            style={{ height: '100%', width: '100%' }}
                        >
                            {imageList.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <img
                                        src={img}
                                        alt={`recipe image ${idx}`}
                                        className={styles.carouselImage}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {isSwiperEnabled && (
                            <>
                                <button
                                    className={`${styles.carouselNavButton} ${styles.carouselNavPrev}`}
                                    onClick={() =>
                                        swiperRef.current?.slidePrev()
                                    }
                                    aria-label='이전 이미지'
                                >
                                    <ChevronLeft size={24} strokeWidth={2} />
                                </button>
                                <button
                                    className={`${styles.carouselNavButton} ${styles.carouselNavNext}`}
                                    onClick={() =>
                                        swiperRef.current?.slideNext()
                                    }
                                    aria-label='다음 이미지'
                                >
                                    <ChevronRight size={24} strokeWidth={2} />
                                </button>
                            </>
                        )}
                    </div>
                    {isSwiperEnabled && (
                        <div className='recipe-thumbnail-pagination' />
                    )}
                </div>

                <div className={styles.headerInfo}>
                    <div className={styles.recipeInfo}>
                        <div className={styles.titleRow}>
                            <h1 className={styles.title}>
                                {recipeDetailData.title}
                            </h1>
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
                                    />
                                    <span>
                                        {bookmarkCount.toLocaleString()}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <p className={styles.author}>
                            {`By ${recipeDetailData.authorName}`}
                        </p>

                        <p className={styles.description}>
                            {recipeDetailData.description}
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
                <h2 className={styles.sectionTitle}>요리 재료 List</h2>

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
                                        <Link
                                            href={coupangProduct.url}
                                            target='_blank'
                                            className={styles.buyButton}
                                        >
                                            <ShoppingCart
                                                size={14}
                                                fill='currentColor'
                                            />
                                            <span>구매</span>
                                        </Link>
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
                                    {step.timestampSeconds && (
                                        <Link
                                            href={
                                                recipeDetailData.sourceType ===
                                                'YOUTUBE'
                                                    ? `https://www.youtube.com/watch?v=${recipeDetailData.sourceId}&t=${step.timestampSeconds}s`
                                                    : recipeDetailData.sourceUrl ||
                                                      '#'
                                            }
                                            target='_blank'
                                            className={styles.stepTime}
                                        >
                                            {dayjs()
                                                .startOf('day')
                                                .add(
                                                    step.timestampSeconds,
                                                    'second',
                                                )
                                                .format('mm:ss')}
                                        </Link>
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

    try {
        await queryClient.fetchQuery({
            queryKey: recipeKeys.detail(sno, 0),
            queryFn: async () => {
                const { data } = await recipe.getRecipeDetail(sno);

                return data;
            },
        });
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    return {
        props: {
            sno,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 60 * 6, // 6시간마다 데이터 갱신 여부 체크 (ISR)
    };
};

export default RecipeDetailPage;
