import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
    Bookmark,
    Clock,
    Flame,
    Heart,
    MessageCircle,
    ShoppingCart,
    Timer,
    Users,
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
import {
    RecipeCollectionCreateModal,
    RecipeSaveModal,
} from '@/components/modal';
import { RecipeCommentSection } from '@/components/recipe';
import { useRecipeMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { recipeKeys } from '@/hooks/queryKeys';
import { useRecipeDetail } from '@/hooks/suspenseQuery/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import * as styles from '@/pages/recipes/[sno]/index.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- MOCK DATA ---
const MOCK_RECIPE = {
    title: '크림 까르보나라',
    author: '이탈리아키친',
    description:
        '갑자기 먹고 싶은 데 레시피 완전 쉽게 하는 아빠... \n밖에서 사먹는것보다 훨씬 고소하고 맛있어하더라구요^^',
    time: '10분',
    servings: '4인분',
    calories: '425Kcal',
    likes: 456,
    bookmarks: 2750,
    images: [
        'https://picsum.photos/800/800?random=1',
        'https://picsum.photos/800/800?random=2',
        'https://picsum.photos/800/800?random=3',
    ],
    ingredients: [
        { name: '스파게티면', amount: '200g', hasProduct: true },
        { name: '파마산 치즈', amount: '50g', hasProduct: true },
        { name: '소금', amount: '약간', hasProduct: true },
        { name: '베이컨', amount: '100g', hasProduct: true },
        { name: '계란 노른자', amount: '2개', hasProduct: true },
        { name: '후추', amount: '약간', hasProduct: true },
        { name: '생크림', amount: '200ml', hasProduct: true },
        { name: '마늘', amount: '3쪽', hasProduct: true },
    ],
    tools: [
        {
            productNo: 1,
            productName: '유기농 파스타면 500g',
            brandNo: 1,
            brandName: '테씨오리아',
            salePrice: 8900,
            imageUrlInfo: [
                {
                    url: 'https://picsum.photos/300/300?random=11',
                    type: 'IMAGE_URL',
                    imageUrlType: 'IMAGE_URL',
                },
            ],
            likeCount: 10,
            liked: false,
            reviewRating: 4.5,
            totalReviewCount: 100,
            stickerInfos: [],
        },
        {
            productNo: 2,
            productName: '유리 밀폐용기 10종',
            brandNo: 2,
            brandName: '글라스락',
            salePrice: 28900,
            immediateDiscountAmt: 5000,
            additionDiscountAmt: 0,
            imageUrlInfo: [
                {
                    url: 'https://picsum.photos/300/300?random=12',
                    type: 'IMAGE_URL',
                    imageUrlType: 'IMAGE_URL',
                },
            ],
            likeCount: 5,
            liked: true,
            reviewRating: 5.0,
            totalReviewCount: 50,
            stickerInfos: [],
        },
        {
            productNo: 3,
            productName: '세라믹 논스틱 프라이팬',
            brandNo: 3,
            brandName: '슈타인볼',
            salePrice: 45000,
            immediateDiscountAmt: 10000,
            additionDiscountAmt: 0,
            imageUrlInfo: [
                {
                    url: 'https://picsum.photos/300/300?random=13',
                    type: 'IMAGE_URL',
                    imageUrlType: 'IMAGE_URL',
                },
            ],
            likeCount: 20,
            liked: false,
            reviewRating: 4.8,
            totalReviewCount: 200,
            stickerInfos: [],
        },
        {
            productNo: 4,
            productName: '프리미엄 올리브 오일 500ml',
            brandNo: 4,
            brandName: '올리브팜',
            salePrice: 19900,
            immediateDiscountAmt: 2000,
            additionDiscountAmt: 0,
            imageUrlInfo: [
                {
                    url: 'https://picsum.photos/300/300?random=14',
                    type: 'IMAGE_URL',
                    imageUrlType: 'IMAGE_URL',
                },
            ],
            likeCount: 15,
            liked: false,
            reviewRating: 4.9,
            totalReviewCount: 120,
            stickerInfos: [],
        },
    ],
    steps: [
        {
            no: 1,
            desc: '팬에 올리브오일을 두르고 중불로 예열합니다. 마늘을 넣고 향이 날 때까지 볶아주세요.',
            time: '0:00',
        },
        {
            no: 2,
            desc: '준비한 채소를 넣고 소금, 후추로 간을 합니다. 중약불에서 5분간 볶아주세요.',
            time: '0:45',
        },
        {
            no: 3,
            desc: '파스타 면을 넣고 소스와 잘 버무려줍니다. 파마산 치즈를 뿌려 완성합니다.',
            time: '2:30',
        },
        {
            no: 4,
            desc: '접시에 담고 파슬리를 추천 마무리합니다. 따뜻할 때 바로 드세요.',
            time: '5:15',
        },
    ],
    comments: [
        {
            author: '요리왕유미',
            date: '3시간 전',
            content: '내공 깃든게 잘 전달되네요! 가족들과 다 같이 먹습니다 👍',
            images: [
                'https://picsum.photos/200/200?random=31',
                'https://picsum.photos/200/200?random=32',
            ],
        },
        {
            author: '짭짤요정',
            date: '8시간 전',
            content: '레시피 따라했는데 정말 쉽고 맛있어요. 감사합니다!',
        },
        {
            author: '건강밥상',
            date: '5일 전',
            content: '맛있겠어요 레시피 주문합니다',
            images: ['https://picsum.photos/200/200?random=33'],
        },
    ],
    recommended: [
        {
            title: '간장 계란밥',
            author: '요리왕유미',
            time: '10분',
            likes: 22,
            image: 'https://picsum.photos/400/400?random=41',
        },
        {
            title: '그릭 요거트 볼',
            author: '다이어터',
            time: '10분',
            likes: 11,
            image: 'https://picsum.photos/400/400?random=42',
        },
        {
            title: '김치볶음',
            author: '밥한그릇',
            time: '15분',
            likes: 30,
            image: 'https://picsum.photos/400/400?random=43',
        },
        {
            title: '된장찌개',
            author: '국민엄마',
            time: '15분',
            likes: 42,
            image: 'https://picsum.photos/400/400?random=44',
        },
    ],
};

const RecipeDetailPage = ({
    sno,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { addToast } = useToast();

    const { openLoginDialog } = useCustomDialog();

    const queryClient = useQueryClient();

    const isLogin = useAuth();
    console.log('🚀 ~ RecipeDetailPage ~ isLogin:', isLogin);
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data: recipeDetailData } = useRecipeDetail({ sno, memberNo });
    console.log('🚀 ~ RecipeDetailPage ~ recipeDetailData:', recipeDetailData);
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
            openRecipeSaveModal();
        }
    };

    const scrollToComments = () => {
        const element = document.getElementById('recipe-comments');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openRecipeSaveModal = () => {
        overlay.open((props) => (
            <RecipeSaveModal
                {...props}
                recipeSno={sno}
                onAddCollection={() => {
                    openRecipeCollectionCreateModal();
                }}
            />
        ));
    };

    const openRecipeCollectionCreateModal = () => {
        overlay.open((props) => <RecipeCollectionCreateModal {...props} />);
    };

    console.log('🚀 ~ RecipeDetailPage ~ recipeDetailData:', recipeDetailData);

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
                        style={{ height: '100%' }}
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
                                    fill={bookmarked ? 'currentColor' : 'none'}
                                />
                                <span>{bookmarkCount.toLocaleString()}</span>
                            </button>
                        </div>
                    </div>

                    <p className={styles.author}>
                        {`By ${recipeDetailData.authorName}`}
                    </p>

                    <p className={styles.description}>
                        {recipeDetailData.description}
                    </p>

                    <div className={styles.metaList}>
                        {recipeDetailData.durationSeconds && (
                            <div className={styles.durationMetaItem}>
                                <Timer size={24} />
                                <span>{`${Math.floor(recipeDetailData.durationSeconds / 60)}분`}</span>
                            </div>
                        )}

                        {recipeDetailData.servings && (
                            <div className={styles.metaItem}>
                                <Users size={24} />
                                <span>{`${recipeDetailData.servings}인분`}</span>
                            </div>
                        )}

                        {recipeDetailData.caloriesPerServingKcal && (
                            <div className={styles.metaItem}>
                                <Flame size={24} />
                                <span>{`${recipeDetailData.caloriesPerServingKcal} Kcal`}</span>
                            </div>
                        )}
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
                                            · {name}{' '}
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
                                    {step.timestampSeconds &&
                                        step.timestampSeconds > 0 && (
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

            {/* --- COMMENTS AREA --- */}
            <div id='recipe-comments'>
                <Suspense fallback={<div>Loading comments...</div>}>
                    <RecipeCommentSection recipeSno={Number(sno)} />
                </Suspense>
            </div>

            {/* --- RECOMMENDED RECIPES --- */}
            <section>
                <h2
                    className={styles.sectionTitle}
                    style={{ marginBottom: '24px' }}
                >
                    이런 레시피는 어때요?
                </h2>
                <div className={styles.recommendedGrid}>
                    {MOCK_RECIPE.recommended.map((recipe, idx) => (
                        <div key={idx} className={styles.recipeCard}>
                            <div className={styles.recipeCardThumbWrapper}>
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className={styles.recipeCardThumb}
                                />
                                <button
                                    className={styles.recipeCardBookmarkBtn}
                                >
                                    <Bookmark size={16} />
                                </button>
                            </div>
                            <h3 className={styles.recipeCardTitle}>
                                {recipe.title}
                            </h3>
                            <p className={styles.recipeCardAuthor}>
                                {recipe.author}
                            </p>
                            <div className={styles.recipeCardMeta}>
                                <span>
                                    <Clock
                                        size={14}
                                        style={{
                                            display: 'inline',
                                            verticalAlign: 'text-bottom',
                                            marginRight: '4px',
                                        }}
                                    />
                                    {recipe.time}
                                </span>
                                <span>
                                    <Heart
                                        size={14}
                                        style={{
                                            display: 'inline',
                                            verticalAlign: 'text-bottom',
                                            marginRight: '4px',
                                        }}
                                    />
                                    {recipe.likes}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

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
        console.error('Failed to fetch recipe:', error);
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
