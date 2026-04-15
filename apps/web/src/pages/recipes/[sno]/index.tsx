import { useTranslation } from 'react-i18next';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
    Bookmark,
    FlameIcon,
    Heart,
    MessageCircle,
    ShoppingCart,
} from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { overlay } from 'overlay-kit';
import { Suspense } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { recipe } from '@/api/shop';
import { CollectionCreateModal, RecipeSaveModal } from '@/components/modal';
import { RecipeCommentSection } from '@/components/recipe';
import { useRecipeMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { recipeKeys } from '@/hooks/queryKeys';
import { useRecipeDetail } from '@/hooks/suspenseQuery/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import RecipeRecommend from '@/components/recipe/recommend';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import * as styles from '@/pages/recipes/[sno]/index.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useResponsive } from '@/hooks/utils';
import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';
import { vars } from '@/styles/theme.css';
import FetchBoundary from '@/components/common/FetchBoundary';

const RecipeDetailPage = ({
    sno,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();
    const { openLoginDialog, openRecipeSave } = useCustomDialog();

    const queryClient = useQueryClient();

    const isLogin = useAuth();
    console.log('🚀 ~ RecipeDetailPage ~ isLogin:', isLogin);
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data: recipeDetailData } = useRecipeDetail({ sno, memberNo });
    const cookingMinutes = recipeDetailData.durationSeconds
        ? Math.floor(recipeDetailData.durationSeconds / 60)
        : 0;

    const { likeRecipe, unlikeRecipe, unBookmarkRecipe } = useRecipeMutation();

    const liked = !!recipeDetailData?.liked;
    const likeCount = recipeDetailData?.likeCount ?? 0;

    const bookmarked = !!recipeDetailData?.bookmarked;
    const bookmarkCount = recipeDetailData?.bookmarkCount ?? 0;

    const ingredients = recipeDetailData?.ingredients ?? [];

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
                    queryClient.invalidateQueries({
                        queryKey: recipeKeys.detail(sno, memberNo),
                    });
                    addToast({
                        message: liked
                            ? '좋아요를 취소했습니다.'
                            : '레시피를 좋아합니다.',
                        variant: 'success',
                    });
                },
            },
        );
    };

    const onBookmarkToggle = () => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        if (bookmarked) {
            unBookmarkRecipe.mutate(
                { sno },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: recipeKeys.detail(sno, memberNo),
                        });
                        addToast({
                            message: '북마크를 취소했습니다.',
                            variant: 'success',
                        });
                    },
                },
            );
        } else {
            openRecipeSave();
        }
    };

    const scrollToComments = () => {
        const element = document.getElementById('recipe-comments');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>{recipeDetailData.title} | JollyPot</title>
            </Head>

            {/* --- HEADER AREA --- */}
            <section className={styles.headerArea}>
                <div className={styles.imageCarousel}>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation
                        style={{ height: '100%', width: '100%' }}
                    >
                        {[recipeDetailData.thumbnailUrl].map((img, idx) => {
                            if (img) {
                                return (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={img}
                                            alt={`recipe image ${idx}`}
                                            className={styles.carouselImage}
                                        />
                                    </SwiperSlide>
                                );
                            }
                        })}
                    </Swiper>
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
                        <span className={styles.IconTimerText}>
                            <TimerIcon currentColor={vars.color.gray['80']} />
                            {cookingMinutes > 0 ? `${cookingMinutes}분` : '-'}
                        </span>
                        <span className={styles.IconText}>
                            <PeopleIcon currentColor={vars.color.gray['60']} />
                            {recipeDetailData.servings
                                ? `${recipeDetailData.servings}인분`
                                : '-'}
                        </span>

                        <span className={styles.IconText}>
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
                                    {coupangProduct && (
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
            <footer className={styles.mobileStickyFooter}>
                <button
                    className={styles.mobileActionButton}
                    onClick={onLikeToggle}
                    data-active={liked}
                    data-type='like'
                >
                    <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
                    <span>{likeCount}</span>
                </button>

                <button
                    className={styles.mobileActionButton}
                    onClick={scrollToComments}
                >
                    <MessageCircle size={24} />
                    {/* <span>{recipeDetailData?.commentCount ?? 0}</span> */}
                    <span>0</span>
                </button>

                <button
                    className={styles.mobileActionButton}
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
