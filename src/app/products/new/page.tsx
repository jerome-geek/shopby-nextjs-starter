import { map, pipe, range, toArray, toAsync } from '@fxts/core';

import { category } from '@/api/display';
import { product } from '@/api/product';
import NewCategoryList from '@/components/New/CategoryList';
import NewProductList from '@/components/New/ProductList';
import { ProductSearchParams } from '@/models/product/product';

interface BestPageParams {
    pageNumber?: number;
    pageSize?: number;
    categoryNo?: number;
}

export default async function NewProductsPage(props: {
    searchParams: Promise<BestPageParams>;
}) {
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
        toArray
    );

    const initialData = response.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    const categoryData = await category.getCategory(1102158).json();

    return (
        <section>
            <NewCategoryList categoryData={categoryData} />

            <NewProductList
                searchParams={productSearchParams}
                initialData={initialData}
            />
        </section>
    );
}
