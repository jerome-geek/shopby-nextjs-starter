import { useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeCard } from '@/components/recipe/card';
import * as integratedStyles from '@/components/search/integrated-results/index.css';
import { Column } from '@/components/ui/layout/flex';
import { PagingV3 } from '@/components/ui/paging-v3';
import { useInfinitePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { useResponsive } from '@/hooks/utils';

const RECOMMEND_ITEMS_PER_PAGE = 4;
const SWIPER_SLIDE_CONFIG = {
    tablet: {
        slidesPerView: 2.2,
        slidesPerGroup: 1,
        spaceBetween: 16,
    },
    desktop: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
    },
} as const;

const MOBILE_TABLET_PREFETCH_REMAINING_ITEMS = 2;

type RecipeRecommendSectionProps = {
    enabled: boolean;
};

export const RecipeRecommendSection = ({
    enabled,
}: RecipeRecommendSectionProps) => {
    const { isTablet } = useResponsive();

    const [desktopRecommendPage, setDesktopRecommendPage] = useState(1);
    const pendingDesktopRecommendPageRef = useRef<number | null>(null);
    const desktopRecommendNavSourceRef = useRef<'pagination' | 'swipe' | null>(
        null,
    );

    const swiperRef = useRef<SwiperType | null>(null);

    const {
        data: infiniteRecipeData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfinitePublicRecipeSearch({
        searchParams: {
            order: 'DESC',
            sortBy: 'BOOKMARK_COUNT',
            take: RECOMMEND_ITEMS_PER_PAGE,
        },
        options: {
            enabled,
        },
    });

    const recipes = useMemo(
        () => infiniteRecipeData?.pages.flatMap((page) => page.data) ?? [],
        [infiniteRecipeData],
    );

    const desktopRecommendTotalCount =
        infiniteRecipeData?.pages?.[0]?.count ?? 0;
    const desktopRecommendTotalPages = Math.max(
        1,
        Math.ceil(desktopRecommendTotalCount / RECOMMEND_ITEMS_PER_PAGE),
    );
    const desktopBlankSlideCount = useMemo(() => {
        if (isTablet || recipes.length < desktopRecommendTotalCount) {
            return 0;
        }

        const paddedSize =
            Math.ceil(desktopRecommendTotalCount / RECOMMEND_ITEMS_PER_PAGE) *
            RECOMMEND_ITEMS_PER_PAGE;

        return Math.max(0, paddedSize - recipes.length);
    }, [desktopRecommendTotalCount, isTablet, recipes.length]);

    const prefetchNextPage = async () => {
        if (!hasNextPage || isFetchingNextPage) {
            return;
        }

        await fetchNextPage();
    };

    const goToDesktopRecommendPage = (targetPage: number) => {
        const safePage = Math.min(
            Math.max(targetPage, 1),
            desktopRecommendTotalPages,
        );

        const loadedPageCount = Math.ceil(
            recipes.length / RECOMMEND_ITEMS_PER_PAGE,
        );
        const isMovingForward = safePage > desktopRecommendPage;
        const needsNextPageData = safePage > loadedPageCount;

        if (
            isMovingForward &&
            needsNextPageData &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }

        desktopRecommendNavSourceRef.current = 'pagination';
        setDesktopRecommendPage(safePage);

        if (swiperRef.current) {
            swiperRef.current.slideTo(
                (safePage - 1) * RECOMMEND_ITEMS_PER_PAGE,
            );
        } else {
            pendingDesktopRecommendPageRef.current = safePage;
        }
    };

    const setDesktopRecommendPageFromActiveIndex = (activeIndex: number) => {
        if (!isTablet) {
            desktopRecommendNavSourceRef.current = 'swipe';
            setDesktopRecommendPage(
                Math.floor(activeIndex / RECOMMEND_ITEMS_PER_PAGE) + 1,
            );
        }
    };

    useEffect(() => {
        if (isTablet) {
            return;
        }

        if (desktopRecommendNavSourceRef.current !== 'pagination') {
            return;
        }

        const swiper = swiperRef.current;
        if (!swiper) {
            return;
        }

        const targetIndex =
            (desktopRecommendPage - 1) * RECOMMEND_ITEMS_PER_PAGE;

        if (recipes.length > targetIndex) {
            swiper.slideTo(targetIndex, 0);
            desktopRecommendNavSourceRef.current = null;
        }
    }, [desktopRecommendPage, isTablet, recipes.length]);

    return (
        <Column gap='12px'>
            <h3 className={integratedStyles.productSectionTitle}>
                이 레시피는 어떠세요?
            </h3>
            <Swiper
                slidesPerView={SWIPER_SLIDE_CONFIG.tablet.slidesPerView}
                slidesPerGroup={SWIPER_SLIDE_CONFIG.tablet.slidesPerGroup}
                spaceBetween={SWIPER_SLIDE_CONFIG.tablet.spaceBetween}
                breakpoints={{
                    1025: {
                        slidesPerView:
                            SWIPER_SLIDE_CONFIG.desktop.slidesPerView,
                        slidesPerGroup:
                            SWIPER_SLIDE_CONFIG.desktop.slidesPerGroup,
                        spaceBetween: SWIPER_SLIDE_CONFIG.desktop.spaceBetween,
                    },
                }}
                style={{ width: '100%' }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setDesktopRecommendPageFromActiveIndex(swiper.activeIndex);

                    if (pendingDesktopRecommendPageRef.current) {
                        const pendingPage =
                            pendingDesktopRecommendPageRef.current;
                        pendingDesktopRecommendPageRef.current = null;

                        swiper.slideTo(
                            (pendingPage - 1) * RECOMMEND_ITEMS_PER_PAGE,
                        );
                        setDesktopRecommendPage(pendingPage);
                        desktopRecommendNavSourceRef.current = null;
                    }
                }}
                onSlideChange={(swiper) => {
                    setDesktopRecommendPageFromActiveIndex(swiper.activeIndex);

                    if (!isTablet) {
                        const desktopPageFromActiveIndex =
                            Math.floor(
                                swiper.activeIndex /
                                    SWIPER_SLIDE_CONFIG.desktop.slidesPerGroup,
                            ) + 1;

                        const isMovedToNextDesktopPage =
                            desktopPageFromActiveIndex > desktopRecommendPage;

                        if (isMovedToNextDesktopPage) {
                            prefetchNextPage();
                        }

                        return;
                    }

                    const lastVisibleIndex = Math.ceil(
                        swiper.activeIndex +
                            SWIPER_SLIDE_CONFIG.tablet.slidesPerView,
                    );

                    const remainingItemsCount =
                        recipes.length - lastVisibleIndex;

                    if (
                        remainingItemsCount <=
                        MOBILE_TABLET_PREFETCH_REMAINING_ITEMS
                    ) {
                        prefetchNextPage();
                    }
                }}
                onReachEnd={() => {
                    if (isTablet) {
                        prefetchNextPage();
                    }
                }}
            >
                {recipes.map((recipe) => (
                    <SwiperSlide key={recipe.sno}>
                        <RecipeCard recipe={recipe} />
                    </SwiperSlide>
                ))}
                {!isTablet &&
                    Array.from({ length: desktopBlankSlideCount }).map(
                        (_, index) => (
                            <SwiperSlide key={`desktop-blank-${index}`} />
                        ),
                    )}
            </Swiper>
            {!isTablet && (
                <PagingV3
                    currentPage={desktopRecommendPage}
                    totalCount={desktopRecommendTotalCount}
                    pageSize={RECOMMEND_ITEMS_PER_PAGE}
                    onPageClick={goToDesktopRecommendPage}
                />
            )}
        </Column>
    );
};
