import { compact, isEmpty, pipe, toArray } from '@fxts/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import FetchBoundary from '@/shared/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';
import { useProductList } from '@/hooks/suspenseQuery/product/product';
import { useSuspenseMainCategory } from '@/hooks/useMainCategory';
import type {
    ProductSearchParams,
    SearchProductItem,
} from '@/models/product/product';
import { ShopType } from '@/pages/shop/[slug]';
interface ProductSearchProps {
    searchParams: ProductSearchParams;
    title: string;
    description: string;
    filter?: (item: SearchProductItem[]) => SearchProductItem[];
}

const ProductsSearchContent = (props: ProductSearchProps) => {
    const router = useRouter();
    const type = router.query.slug as ShopType;

    const { searchParams, title, description, filter } = props;

    const { kidsCategoryNo, lifeCategoryNo } = useSuspenseMainCategory();

    const parsedCategoryNos = pipe(
        type === 'kids' ? [kidsCategoryNo] : [lifeCategoryNo],
        compact,
        toArray,
    );

    const categoryNos = isEmpty(parsedCategoryNos)
        ? undefined
        : parsedCategoryNos;

    const parsedSearchParams: ProductSearchParams = {
        categoryNos,
        pageNumber: 1,
        pageSize: 12,
        ...searchParams,
    };

    const { data: productListData } = useProductList({
        searchParams: parsedSearchParams,
    });

    const filteredProductListData = useMemo(() => {
        if (filter) {
            return pipe(productListData.items ?? [], filter, toArray);
        }

        return productListData.items ?? [];
    }, [productListData, filter]);

    const slicedProductListData = useMemo(() => {
        return filteredProductListData.slice(0, 12);
    }, [filteredProductListData]);

    if (isEmpty(slicedProductListData)) {
        return null;
    }

    return (
        <Products
            title={title}
            description={description}
            products={slicedProductListData}
        />
    );
};

const ProductsSearch = (props: ProductSearchProps) => {
    return (
        <FetchBoundary
            fallback={<ProductsSectionSkeleton />}
            errorFallback={<></>}
        >
            <ProductsSearchContent {...props} />
        </FetchBoundary>
    );
};

export default ProductsSearch;
