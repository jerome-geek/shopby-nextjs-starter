import { useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@/components/product';
import * as integratedStyles from '@/components/search/integrated-results/index.css';
import { Column } from '@/components/ui/layout/flex';
import { PagingV3 } from '@/components/ui/paging-v3';
import {
    useProductSectionById,
    useSuspenseInfiniteProductSectionProductList,
} from '@/hooks/suspenseQuery/display/productSection';
import { useResponsive } from '@/hooks/utils';
import { ImageUrlType } from '@/models/product';

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

export const ShoppingRecommendSection = () => {
    const { isTablet } = useResponsive();

    const [desktopPageNumber, setDesktopPageNumber] = useState(1);
    const pendingDesktopPageNumberRef = useRef<number | null>(null);
    const desktopNavSourceRef = useRef<'pagination' | 'swipe' | null>(null);

    const swiperRef = useRef<SwiperType | null>(null);

    const { data: productSectionData } = useProductSectionById({
        sectionId: 'RECOMMEND_02',
    });

    const {
        data: infiniteProductSectionData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSuspenseInfiniteProductSectionProductList({
        sectionId: 'RECOMMEND_02',
        searchParams: {
            by: 'ADMIN_SETTING',
            direction: 'DESC',
            soldout: false,
            saleStatus: 'RESERVATION_AND_ONSALE',
            pageSize: RECOMMEND_ITEMS_PER_PAGE,
            hasOptionValues: false,
            includeStopProduct: false,
            hasTotalCount: true,
        },
    });

    const filteredProducts = useMemo(() => {
        const products =
            infiniteProductSectionData?.pages.flatMap(
                (page) => page.data.products,
            ) ?? [];

        return products.map((product) => ({
            ...product,
            imageUrlInfo: product.imageUrlInfo?.map((img) => ({
                url: img.url,
                type: 'IMAGE_URL',
            })),
            stickerInfos:
                product.stickerInfos?.map((sticker) => ({
                    type: sticker.type,
                    label: sticker.label,
                    name: sticker.label,
                })) || [],
        }));
    }, [infiniteProductSectionData]);

    const totalCount =
        infiniteProductSectionData?.pages?.[0]?.data.productTotalCount ?? 0;

    const totalPageForDesktop = Math.max(
        1,
        Math.ceil(totalCount / RECOMMEND_ITEMS_PER_PAGE),
    );

    const blankSlideCount = useMemo(() => {
        if (isTablet || filteredProducts.length < totalCount) {
            return 0;
        }

        const paddedSize =
            Math.ceil(totalCount / RECOMMEND_ITEMS_PER_PAGE) *
            RECOMMEND_ITEMS_PER_PAGE;

        return Math.max(0, paddedSize - filteredProducts.length);
    }, [totalCount, filteredProducts, isTablet]);

    const prefetchNextPage = async () => {
        if (!hasNextPage || isFetchingNextPage) {
            return;
        }

        await fetchNextPage();
    };

    const goToDesktopPage = (targetPage: number) => {
        const safePage = Math.min(Math.max(targetPage, 1), totalPageForDesktop);

        const loadedPageCount = Math.ceil(
            filteredProducts.length / RECOMMEND_ITEMS_PER_PAGE,
        );
        const isMovingForward = safePage > desktopPageNumber;
        const needsNextPageData = safePage > loadedPageCount;

        if (
            isMovingForward &&
            needsNextPageData &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }

        desktopNavSourceRef.current = 'pagination';
        setDesktopPageNumber(safePage);
        if (swiperRef.current) {
            swiperRef.current.slideTo(
                (safePage - 1) * RECOMMEND_ITEMS_PER_PAGE,
            );
        } else {
            pendingDesktopPageNumberRef.current = safePage;
        }
    };

    const setDesktopPageNumberFromActiveIndex = (activeIndex: number) => {
        if (!isTablet) {
            desktopNavSourceRef.current = 'swipe';
            setDesktopPageNumber(
                Math.floor(activeIndex / RECOMMEND_ITEMS_PER_PAGE) + 1,
            );
        }
    };

    useEffect(() => {
        if (isTablet) {
            return;
        }

        if (desktopNavSourceRef.current !== 'pagination') {
            return;
        }

        const swiper = swiperRef.current;
        if (!swiper) {
            return;
        }

        const targetIndex = (desktopPageNumber - 1) * RECOMMEND_ITEMS_PER_PAGE;

        if (filteredProducts.length > targetIndex) {
            swiper.slideTo(targetIndex, 0);
            desktopNavSourceRef.current = null;
        }
    }, [desktopPageNumber, filteredProducts.length, isTablet]);

    return (
        <Column gap='12px'>
            <h3 className={integratedStyles.productSectionTitle}>
                {productSectionData?.label ?? '이 상품은 어떠세요?'}
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
                    setDesktopPageNumberFromActiveIndex(swiper.activeIndex);

                    if (pendingDesktopPageNumberRef.current) {
                        const pendingPage = pendingDesktopPageNumberRef.current;
                        pendingDesktopPageNumberRef.current = null;

                        swiper.slideTo(
                            (pendingPage - 1) * RECOMMEND_ITEMS_PER_PAGE,
                        );
                        setDesktopPageNumber(pendingPage);
                        desktopNavSourceRef.current = null;
                    }
                }}
                onSlideChange={(swiper) => {
                    setDesktopPageNumberFromActiveIndex(swiper.activeIndex);

                    if (!isTablet) {
                        const desktopPageFromActiveIndex =
                            Math.floor(
                                swiper.activeIndex /
                                    SWIPER_SLIDE_CONFIG.desktop.slidesPerGroup,
                            ) + 1;
                        const isMovedToNextDesktopPage =
                            desktopPageFromActiveIndex > desktopPageNumber;

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
                        filteredProducts.length - lastVisibleIndex;

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
                {filteredProducts.map((product) => {
                    return (
                        <SwiperSlide key={product.productNo}>
                            <ProductCard
                                productNo={product.productNo}
                                productName={product.productName}
                                brandName={product.brandName}
                                brandNo={product.brandNo}
                                salePrice={product.salePrice}
                                immediateDiscountAmt={
                                    product.immediateDiscountAmt
                                }
                                additionDiscountAmt={
                                    product.additionDiscountAmt
                                }
                                imageUrlInfo={
                                    product.imageUrlInfo as ImageUrlType[]
                                }
                                stickerInfos={product.stickerInfos}
                                likeCount={product.likeCount}
                                liked={product.liked}
                                reviewRating={product.reviewRating}
                                totalReviewCount={product.totalReviewCount}
                                isAdditionalDiscount
                            />
                        </SwiperSlide>
                    );
                })}
                {!isTablet &&
                    Array.from({ length: blankSlideCount }).map((_, index) => (
                        <SwiperSlide key={`desktop-blank-${index}`} />
                    ))}
            </Swiper>
            {!isTablet && (
                <PagingV3
                    currentPage={desktopPageNumber}
                    totalCount={totalCount}
                    pageSize={RECOMMEND_ITEMS_PER_PAGE}
                    onPageClick={goToDesktopPage}
                />
            )}
        </Column>
    );
};
