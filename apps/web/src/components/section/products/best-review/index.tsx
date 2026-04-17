import { isEmpty } from '@fxts/core';

import FetchBoundary from '@/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';
import useBestReviewProductList from '@/hooks/suspenseQuery/product/product/useBestSellerProductList';

const BestReviewContent = ({ categoryNos }: { categoryNos?: number[] }) => {
    const { data: productListData } = useBestReviewProductList({
        searchParams: {
            pageNumber: 1,
            pageSize: 12,
            categoryNos,
        },
    });

    const productList = productListData?.items ?? [];

    if (isEmpty(productList)) {
        return null;
    }

    return (
        <Products
            title='후기 좋은 순 스와이프'
            description='실제 구매자들이 인정한 만족도 높은 상품'
            products={productList}
        />
    );
};

const BestReview = ({ categoryNos }: { categoryNos?: number[] }) => {
    return (
        <FetchBoundary fallback={<ProductsSectionSkeleton />}>
            <BestReviewContent categoryNos={categoryNos} />
        </FetchBoundary>
    );
};

export default BestReview;
