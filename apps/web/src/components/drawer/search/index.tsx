import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ObserverTarget } from '@/components/common/observer-target';
import * as styles from '@/components/drawer/search/index.css';
import { RankingSection } from '@/components/drawer/search/ranking-section';
import { DefaultModalLayoutProps } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { Column } from '@/components/ui/layout/flex';
import { useInfiniteProductSectionProductList } from '@/hooks/query/display/productSection';
import { useFavoriteKeywords } from '@/hooks/query/product/product';
import { useSearchKeyword } from '@/hooks/useSearchKeyword';
import { useResponsive } from '@/hooks/utils';
import { ImageUrlType } from '@/models/product';

const DEFAULT_RECIPE_KEYWORDS = [
    '고든 램지 삼겹살 요리',
    '최강록 셰프 라면',
    '밥도둑 한가인 삼겹살 강된장',
    '돈까스 김치나베',
    '맛있는 멍게 토마토 비빔 파스타',
    '두부 샐러드',
    '백종원 김치찌개',
    '저당 닭가슴살 샌드위치',
    '집밥 오므라이스',
];

export const SearchDrawer = ({
    isOpen,
    close,
    unmount,
}: DefaultModalLayoutProps) => {
    const { isMobile } = useResponsive();

    const [recipePage, setRecipePage] = useState(1);
    const [productPage, setProductPage] = useState(1);

    const { searchByKeyword } = useSearchKeyword();

    const { data: favoriteKeywordData = [] } = useFavoriteKeywords({
        size: 18,
    });

    const {
        data: infiniteProductSectionData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteProductSectionProductList({
        sectionId: 'SEARCH_RECOMMEND',
        searchParams: {
            by: 'ADMIN_SETTING',
            direction: 'DESC',
            soldout: false,
            saleStatus: 'RESERVATION_AND_ONSALE',
            pageSize: 6,
            hasOptionValues: false,
            includeStopProduct: false,
            hasTotalCount: true,
        },
    });

    const productTotalCount =
        infiniteProductSectionData?.pages[0]?.data.productTotalCount ?? 0;

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

    const handleRecommendSlideChange = useCallback(
        (swiper: SwiperType) => {
            if (!hasNextPage || isFetchingNextPage) {
                return;
            }

            const total = filteredProducts.length;

            if (total === 0) {
                return;
            }

            const { activeIndex } = swiper;

            const thresholdIndex = Math.max(0, total - 2);

            if (activeIndex >= thresholdIndex) {
                fetchNextPage();
            }
        },
        [
            fetchNextPage,
            filteredProducts.length,
            hasNextPage,
            isFetchingNextPage,
        ],
    );

    const submitSearch = (value: string) => {
        if (searchByKeyword(value)) {
            close();
        }
    };

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <>
                    {!isMobile && (
                        <motion.div
                            className={styles.dimmed}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            style={{ zIndex: 1001 }}
                        />
                    )}

                    <motion.div
                        className={styles.container}
                        initial={{ x: isMobile ? '-100%' : '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: isMobile ? '-100%' : '100%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 50,
                        }}
                        style={{ zIndex: 1001 }}
                    >
                        {!isMobile && (
                            <button
                                type='button'
                                className={styles.closeButton}
                                onClick={close}
                                aria-label='검색 닫기'
                            >
                                <X size={60} strokeWidth={1} />
                            </button>
                        )}

                        <div className={styles.innerContainer}>
                            <ProductListSearchInput
                                searchAfterAction={close}
                                onBack={close}
                            />

                            <Column
                                className={styles.scrollArea}
                                style={{ gap: isMobile ? '48px' : '60px' }}
                                data-lenis-prevent
                            >
                                <div className={styles.drawerContentInset}>
                                    <RankingSection
                                        title='지금 많이 찾는 레시피'
                                        items={DEFAULT_RECIPE_KEYWORDS}
                                        page={recipePage}
                                        onPageChange={setRecipePage}
                                        onItemClick={submitSearch}
                                    />

                                    <RankingSection
                                        title='지금 많이 찾는 상품'
                                        items={favoriteKeywordData}
                                        page={productPage}
                                        onPageChange={setProductPage}
                                        onItemClick={submitSearch}
                                    />
                                </div>

                                {filteredProducts.length > 0 && (
                                    <Column
                                        className={
                                            styles.productSectionContainer
                                        }
                                    >
                                        <h3
                                            className={`${styles.sectionTitle} ${styles.productSectionTitle}`}
                                        >
                                            추천 상품
                                        </h3>
                                        {isMobile ? (
                                            <Swiper
                                                className={
                                                    styles.recommendSwiper
                                                }
                                                slidesPerView={2.3}
                                                spaceBetween={12}
                                                onSlideChange={
                                                    handleRecommendSlideChange
                                                }
                                                slidesOffsetBefore={20}
                                                slidesOffsetAfter={20}
                                            >
                                                {filteredProducts.map(
                                                    (product) => (
                                                        <SwiperSlide
                                                            key={
                                                                product.productNo
                                                            }
                                                            className={
                                                                styles.recommendSlide
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.recommendCardWrap
                                                                }
                                                            >
                                                                <ProductCard
                                                                    productNo={
                                                                        product.productNo
                                                                    }
                                                                    productName={
                                                                        product.productName
                                                                    }
                                                                    brandName={
                                                                        product.brandName
                                                                    }
                                                                    brandNo={
                                                                        product.brandNo
                                                                    }
                                                                    salePrice={
                                                                        product.salePrice
                                                                    }
                                                                    immediateDiscountAmt={
                                                                        product.immediateDiscountAmt
                                                                    }
                                                                    additionDiscountAmt={
                                                                        product.additionDiscountAmt
                                                                    }
                                                                    imageUrlInfo={
                                                                        product.imageUrlInfo as ImageUrlType[]
                                                                    }
                                                                    stickerInfos={
                                                                        product.stickerInfos
                                                                    }
                                                                    likeCount={
                                                                        product.likeCount
                                                                    }
                                                                    liked={
                                                                        product.liked
                                                                    }
                                                                    reviewRating={
                                                                        product.reviewRating
                                                                    }
                                                                    totalReviewCount={
                                                                        product.totalReviewCount
                                                                    }
                                                                    isAdditionalDiscount
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    ),
                                                )}
                                            </Swiper>
                                        ) : (
                                            <div className={styles.productGrid}>
                                                {filteredProducts.map(
                                                    (product) => (
                                                        <ProductCard
                                                            key={
                                                                product.productNo
                                                            }
                                                            productNo={
                                                                product.productNo
                                                            }
                                                            productName={
                                                                product.productName
                                                            }
                                                            brandName={
                                                                product.brandName
                                                            }
                                                            brandNo={
                                                                product.brandNo
                                                            }
                                                            salePrice={
                                                                product.salePrice
                                                            }
                                                            immediateDiscountAmt={
                                                                product.immediateDiscountAmt
                                                            }
                                                            additionDiscountAmt={
                                                                product.additionDiscountAmt
                                                            }
                                                            imageUrlInfo={
                                                                product.imageUrlInfo as ImageUrlType[]
                                                            }
                                                            stickerInfos={
                                                                product.stickerInfos
                                                            }
                                                            likeCount={
                                                                product.likeCount
                                                            }
                                                            liked={
                                                                product.liked
                                                            }
                                                            reviewRating={
                                                                product.reviewRating
                                                            }
                                                            totalReviewCount={
                                                                product.totalReviewCount
                                                            }
                                                            isAdditionalDiscount
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        )}

                                        {!isMobile && (
                                            <ObserverTarget
                                                onIntersect={() => {
                                                    if (hasNextPage) {
                                                        fetchNextPage();
                                                    }
                                                }}
                                                hasNextPage={hasNextPage}
                                                totalCount={productTotalCount}
                                            />
                                        )}
                                    </Column>
                                )}
                            </Column>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
