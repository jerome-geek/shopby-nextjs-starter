import FetchBoundary from '@/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';
import useBestReviewProductList from '@/hooks/suspenseQuery/product/product/useBestSellerProductList';

const BestReviewContent = () => {
    const { data: productListData } = useBestReviewProductList({
        searchParams: {
            pageNumber: 1,
            pageSize: 12,
        },
    });

    return (
        <Products
            title='후기 좋은 순 스와이프'
            description='실제 구매자들이 인정한 만족도 높은 상품'
            products={productListData.items ?? []}
        />
    );
};

const BestReview = () => {
    return (
        <FetchBoundary fallback={<ProductsSectionSkeleton />}>
            <BestReviewContent />
        </FetchBoundary>
    );
};

export default BestReview;
