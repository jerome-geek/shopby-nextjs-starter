import { includes } from '@fxts/core';
import { keepPreviousData, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { recipe } from '@/api/shop';
import FetchBoundary from '@/components/common/FetchBoundary';
import * as styles from '@/components/drawer/search/index.css';
import { RankingSection } from '@/components/drawer/search/ranking-section';
import { RecommendProductsSection } from '@/components/drawer/search/recommend-products-section';
import { RecommendProductsSkeleton } from '@/components/drawer/search/recommend-products-section/skeleton';
import { type DefaultModalLayoutProps } from '@/components/layout';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { Column } from '@/components/ui/layout/flex';
import { BOTTOM_NAV_INVISIBLE_PATHS } from '@/const/bottomNavigation';
import { useFavoriteKeywords } from '@/hooks/query/product/product';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import { useResponsive } from '@/hooks/utils';

const RECIPE_ITEMS_PER_PAGE = 6;
const RECIPE_SEARCH_BASE_PARAMS = {
    order: 'DESC' as const,
    sortBy: 'BOOKMARK_COUNT' as const,
    take: RECIPE_ITEMS_PER_PAGE,
};

export const SearchDrawer = ({
    isOpen,
    close,
    unmount,
}: DefaultModalLayoutProps) => {
    const router = useRouter();

    const { isMobile } = useResponsive();
    const queryClient = useQueryClient();

    const [recipePage, setRecipePage] = useState(1);
    const [productPage, setProductPage] = useState(1);

    const { data: recipeData } = usePublicRecipeSearch({
        searchParams: {
            ...RECIPE_SEARCH_BASE_PARAMS,
            page: recipePage,
        },
        options: {
            placeholderData: keepPreviousData,
        },
    });

    const recipeKeywords = useMemo(() => {
        return (
            recipeData?.data
                ?.map((recipe) => recipe.title?.trim())
                .filter((title): title is string => Boolean(title)) ?? []
        );
    }, [recipeData?.data]);
    const recipeTotalPages = Math.max(
        1,
        Math.ceil((recipeData?.count ?? 0) / RECIPE_ITEMS_PER_PAGE),
    );

    useEffect(() => {
        const pagesToPrefetch = [recipePage - 1, recipePage + 1].filter(
            (targetPage) => targetPage >= 1 && targetPage <= recipeTotalPages,
        );

        pagesToPrefetch.forEach((targetPage) => {
            const params = {
                ...RECIPE_SEARCH_BASE_PARAMS,
                page: targetPage,
            };

            queryClient.prefetchQuery({
                queryKey: recipeKeys.publicSearch(params),
                queryFn: async () => {
                    const { data } = await recipe.searchPublicRecipes(params);
                    return data;
                },
            });
        });
    }, [queryClient, recipePage, recipeTotalPages]);

    const { data: favoriteKeywordData = [] } = useFavoriteKeywords({
        size: 30,
    });

    const isBottomNavigationInvisible = !!includes(
        router.pathname,
        BOTTOM_NAV_INVISIBLE_PATHS,
    );

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.dimmed}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        style={{ zIndex: isMobile ? 999 : 1001 }}
                    />

                    <motion.div
                        className={clsx(
                            styles.container,
                            isBottomNavigationInvisible &&
                                styles.bottomNavigationInvisible,
                        )}
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
                                        totalPages={recipeTotalPages}
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
