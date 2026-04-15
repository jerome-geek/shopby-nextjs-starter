import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import * as styles from '@/components/drawer/search/index.css';
import { RankingSection } from '@/components/drawer/search/ranking-section';
import { RecommendProductsSection } from '@/components/drawer/search/recommend-products-section';
import { RecommendProductsSkeleton } from '@/components/drawer/search/recommend-products-section/skeleton';
import { DefaultModalLayoutProps } from '@/components/layout';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { Column } from '@/components/ui/layout/flex';
import { useFavoriteKeywords } from '@/hooks/query/product/product';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { useResponsive } from '@/hooks/utils';

export const SearchDrawer = ({
    isOpen,
    close,
    unmount,
}: DefaultModalLayoutProps) => {
    const { isMobile } = useResponsive();

    const [recipePage, setRecipePage] = useState(1);
    const [productPage, setProductPage] = useState(1);

    const { data: recipeData } = usePublicRecipeSearch({
        params: {
            order: 'DESC',
            sortBy: 'BOOKMARK_COUNT',
            page: 1,
            take: 18,
        },
    });

    const recipeKeywords = useMemo(() => {
        return (
            recipeData?.data
                ?.map((recipe) => recipe.title?.trim())
                .filter((title): title is string => Boolean(title)) ?? []
        );
    }, [recipeData?.data]);

    const { data: favoriteKeywordData = [] } = useFavoriteKeywords({
        size: 18,
    });

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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
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
                                        items={recipeKeywords}
                                        page={recipePage}
                                        onPageChange={setRecipePage}
                                        onItemClick={close}
                                    />

                                    <RankingSection
                                        title='지금 많이 찾는 상품'
                                        items={favoriteKeywordData}
                                        page={productPage}
                                        onPageChange={setProductPage}
                                        onItemClick={close}
                                    />
                                </div>

                                <FetchBoundary
                                    fallback={<RecommendProductsSkeleton />}
                                >
                                    <RecommendProductsSection />
                                </FetchBoundary>
                            </Column>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
