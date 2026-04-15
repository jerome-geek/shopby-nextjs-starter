import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import * as styles from '@/components/drawer/search/index.css';
import { RankingSection } from '@/components/drawer/search/ranking-section';
import { RecommendProductsSection } from '@/components/drawer/search/recommend-products-section';
import { RecommendProductsSkeleton } from '@/components/drawer/search/recommend-products-section/skeleton';
import { DefaultModalLayoutProps } from '@/components/layout';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { Column } from '@/components/ui/layout/flex';
import { useFavoriteKeywords } from '@/hooks/query/product/product';
import { useSearchKeyword } from '@/hooks/useSearchKeyword';
import { useResponsive } from '@/hooks/utils';

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
