import CategorySection from '@/features/drawer/category/shopping/category-section';

const Shopping = () => {
    return (
        <>
            <CategorySection />

            {/*  NOTE: 추천 상품 주석 처리
            <FetchBoundary fallback={<RecommendProductsSkeleton />}>
                <RecommendProductsSection />
            </FetchBoundary> */}
        </>
    );
};

export default Shopping;
