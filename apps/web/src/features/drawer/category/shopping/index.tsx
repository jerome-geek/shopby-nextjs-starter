import FetchBoundary from '@/components/common/FetchBoundary';
import CategorySection from '@/features/drawer/category/shopping/category-section';
import { RecommendProductsSection } from '@/features/drawer/search/recommend-products-section';
import { RecommendProductsSkeleton } from '@/features/drawer/search/recommend-products-section/skeleton';

const Shopping = () => {
    return (
        <>
            <CategorySection />

            <FetchBoundary fallback={<RecommendProductsSkeleton />}>
                <RecommendProductsSection />
            </FetchBoundary>
        </>
    );
};

export default Shopping;
