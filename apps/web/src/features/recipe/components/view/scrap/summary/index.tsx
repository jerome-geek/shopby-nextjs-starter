import { motion } from 'motion/react';

import FetchBoundary from '@/shared/components/common/FetchBoundary';
import { ProductGridSection } from '@/features/product/components/grid-section';
import { ProductGridSkeleton } from '@/features/product/components/grid-section/skeleton';
import { RecipeGridSection } from '@/features/recipe/components/view/grid-section';
import { RecipeGridSkeleton } from '@/features/recipe/components/view/grid-section/skeleton';
import * as styles from '@/features/recipe/components/view/scrap/summary/index.css';
import { ScrapCollectionSection } from '@/features/recipe/components/scrap-collection-section';
import { CollectionGridSkeleton } from '@/features/recipe/components/scrap-collection-section/skeleton';
import { useResponsive } from '@/hooks/utils';

/**
 * 전체 탭 레이아웃 (컬렉션, 상품, 레시피 그리드)
 */
const RecipeScrapSummary = () => {
    const { isMobile } = useResponsive();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.container}
        >
            {/* 레시피 섹션 */}
            <FetchBoundary
                fallback={<RecipeGridSkeleton count={isMobile ? 2 : 5} />}
            >
                <RecipeGridSection />
            </FetchBoundary>

            {/* 컬렉션 섹션 */}
            <FetchBoundary fallback={<CollectionGridSkeleton />}>
                <ScrapCollectionSection />
            </FetchBoundary>

            {/* 상품 섹션 */}
            <FetchBoundary fallback={<ProductGridSkeleton />}>
                <ProductGridSection />
            </FetchBoundary>
        </motion.div>
    );
};

export default RecipeScrapSummary;
