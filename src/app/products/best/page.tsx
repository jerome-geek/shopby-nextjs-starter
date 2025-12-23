import { category } from '@/api/display';
import { product } from '@/api/product';
import CategoryListTab from '@/components/Product/CategoryListTab';
import NewProductList from '@/components/New/ProductList';
import { PATHS } from '@/const/paths';
import { GetBestSellerProductsParams } from '@/models/product/product';
import { map, pipe, pipe1, range, toArray, toAsync } from '@fxts/core';

interface BestProductsPageParams {
    pageNumber?: number;
    pageSize?: number;
    categoryNo?: number;
}

export default async function BestProductsPage(props: {
    searchParams: Promise<BestProductsPageParams>;
}) {
    const searchParams = await props.searchParams;

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 2;
    const categoryNo = Number(searchParams.categoryNo) || 0;

    const productSearchParams: GetBestSellerProductsParams = {
        pageNumber,
        pageSize,
        categoryNos: categoryNo ? [categoryNo] : [],
    };

    const data = await product
        .getBestSellerProducts(productSearchParams)
        .json();
    console.log('🚀 ~ BestPage ~ data:', data);

    const response = await pipe(
        range(1, pageNumber + 1),
        toAsync,
        map((a) => {
            return product
                .getBestSellerProducts({
                    ...productSearchParams,
                    pageNumber: a,
                })
                .json();
        }),
        toArray
    );

    const initialData = response.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    const categoryData = await category.getCategory(1102157).json();

    return (
        <section>
            <CategoryListTab
                href={PATHS.PRODUCTS.BEST}
                categoryData={categoryData}
            />
        </section>
    );
}
