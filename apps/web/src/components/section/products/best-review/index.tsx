import { compact, isEmpty, pipe, toArray } from '@fxts/core';
import { useRouter } from 'next/router';

import FetchBoundary from '@/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';
import useBestReviewProductList from '@/hooks/suspenseQuery/product/product/useBestReviewProductList';
import { useSuspenseMainCategory } from '@/hooks/useMainCategory';
import { ShopType } from '@/pages/shop/[slug]';

const BestReviewContent = () => {
    const router = useRouter();
    const type = router.query.slug as ShopType;

    const { kidsCategoryNo, lifeCategoryNo } = useSuspenseMainCategory();

    const parsedCategoryNos = pipe(
        type === 'kids' ? [kidsCategoryNo] : [lifeCategoryNo],
        compact,
        toArray,
    );

    const categoryNos = isEmpty(parsedCategoryNos)
        ? undefined
        : parsedCategoryNos;

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

const BestReview = () => {
    return (
        <FetchBoundary
            fallback={<ProductsSectionSkeleton />}
            errorFallback={<></>}
        >
            <BestReviewContent />
        </FetchBoundary>
    );
};

export default BestReview;
