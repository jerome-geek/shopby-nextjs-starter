import FetchBoundary from '@/components/common/FetchBoundary';
import CategorySection from '@/components/drawer/category/shopping/category-section';
import { RecommendProductsSection } from '@/components/drawer/search/recommend-products-section';
import { RecommendProductsSkeleton } from '@/components/drawer/search/recommend-products-section/skeleton';

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
