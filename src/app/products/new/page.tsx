import { map, pipe, range, toArray, toAsync } from '@fxts/core';

import { product } from '@/api/product';
import NewProductList from '@/components/New/ProductList';
import NewCategoryList from '@/components/New/CategoryList';
import { category } from '@/api/display';

interface BestPageParams {
    pageNumber?: number;
    pageSize?: number;
    //1102157
    categoryNo?: number;
}

export default async function BestPage(props: {
    searchParams: Promise<BestPageParams>;
}) {
    const searchParams = await props.searchParams;

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 2;
    const categoryNo = Number(searchParams.categoryNo) || 0;

    const response = await pipe(
        range(1, pageNumber + 1),
        toAsync,
        map((a) => {
            return product
                .searchProducts({
                    pageNumber: a,
                    pageSize,
                    categoryNos: categoryNo ? [categoryNo] : [],
                })
                .json();
        }),
        toArray
    );

    const initialData = response.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    console.log('🚀 ~ BestPage ~ initialData:', initialData);

    try {
    } catch (error) {
        console.error(error);
    }
    const categoryData = await category.getCategory(1102158).json();
    console.log('🚀 ~ BestPage ~ categoryData:', categoryData);

    return (
        <section>
            <NewCategoryList categoryData={categoryData} />

            <NewProductList
                searchParams={{
                    pageNumber,
                    pageSize,
                }}
                initialData={initialData}
            />
        </section>
    );
}
