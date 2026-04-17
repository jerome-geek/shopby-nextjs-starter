import { isEmpty, pipe, toArray } from '@fxts/core';
import { useMemo } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';
import { useProductList } from '@/hooks/suspenseQuery/product/product';
import type {
    ProductSearchParams,
    SearchProductItem,
} from '@/models/product/product';

interface ProductSearchProps {
    searchParams: ProductSearchParams;
    title: string;
    description: string;
    filter?: (item: SearchProductItem[]) => SearchProductItem[];
}

const ProductsSearchContent = (props: ProductSearchProps) => {
    const { searchParams, title, description, filter } = props;

    const parsedSearchParams: ProductSearchParams = {
        ...searchParams,
        pageNumber: 1,
        pageSize: 12,
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

    if (isEmpty(filteredProductListData)) {
        return null;
    }

    return (
        <Products
            title={title}
            description={description}
            products={filteredProductListData}
        />
    );
};

const ProductsSearch = (props: ProductSearchProps) => {
    return (
        <FetchBoundary fallback={<ProductsSectionSkeleton />}>
            <ProductsSearchContent {...props} />
        </FetchBoundary>
    );
};

export default ProductsSearch;
