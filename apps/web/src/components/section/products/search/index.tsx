import { useProductList } from '@/hooks/suspenseQuery/product/product';
import { ProductSearchParams } from '@/models/product/product';
import FetchBoundary from '@/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';

const ProductsSearch = ({
    searchParams,
    title,
    description,
}: {
    searchParams: ProductSearchParams;
    title: string;
    description: string;
}) => {
    const parsedSearchParams: ProductSearchParams = {
        ...searchParams,
        pageNumber: 1,
        pageSize: 12,
    };

    const { data: productListData } = useProductList({
        searchParams: parsedSearchParams,
    });

    return (
        <FetchBoundary fallback={<ProductsSectionSkeleton />}>
            <Products
                title={title}
                description={description}
                products={productListData}
            />
        </FetchBoundary>
    );
};

export default ProductsSearch;
