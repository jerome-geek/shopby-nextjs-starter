import { map, pipe, range, toArray, toAsync } from '@fxts/core';

import { category } from '@/api/display';
import { product } from '@/api/product';
import NewProductList from '@/components/product/new/ProductList';
import CategoryListTab from '@/components/product/CategoryListTab';
import { NEW_CATEGORY_NO } from '@/const/category';
import { PATHS } from '@/const/paths';
import { ProductSearchParams } from '@/models/product/product';

type NewProductsPageProps = AppPageProps<'/products/new'>;

export default async function NewProductsPage(props: NewProductsPageProps) {
    const searchParams = await props.searchParams;

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 2;
    const categoryNo = Number(searchParams.categoryNo) || 0;

    const productSearchParams: ProductSearchParams = {
        pageNumber,
        pageSize,
        categoryNos: categoryNo ? [categoryNo] : [],
        order: {
            by: 'SALE_YMD',
            direction: 'DESC',
        },
    };

    const response = await pipe(
        range(1, pageNumber + 1),
        toAsync,
        map((a) => {
            return product
                .searchProducts({
                    ...productSearchParams,
                    pageNumber: a,
                })
                .json();
        }),
        toArray,
    );

    const initialData = response.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    const categoryData = await category.getCategory(NEW_CATEGORY_NO).json();

    return (
        <section>
            <CategoryListTab
                href={PATHS.PRODUCTS.NEW}
                categoryData={categoryData}
            />

            <NewProductList
                searchParams={productSearchParams}
                initialData={initialData}
            />
        </section>
    );
}
