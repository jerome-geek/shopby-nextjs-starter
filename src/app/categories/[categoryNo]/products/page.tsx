import { map, pipe, range, toArray, toAsync } from '@fxts/core';

import { category } from '@/api/display';
import { product } from '@/api/product';
import ProductSearchFilter from '@/components/product/search-filter';
import { NEW_CATEGORY_NO } from '@/const/category';
import { ProductSearchParams } from '@/models/product/product';
import { css } from '@/styled-system/css';
import { getIsMobile } from '@/utils/device.server';
import NewProductList from '@/components/product/new/ProductList';
import { vstack } from '@/styled-system/patterns';
import { SORT_OPTIONS } from '@/const/product';
import ProductSearchSort from '@/components/product/search-sort';

export type ProductsPageProps =
    AppPageProps<'/categories/[categoryNo]/products'>;

export default async function ProductsPage(props: ProductsPageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const isMobile = await getIsMobile();

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 2;
    const categoryNo = Number(params.categoryNo) || 0;
    const categoryNos = searchParams.categoryNos;
    const childCategoryNo = Number(searchParams.childCategoryNo) || 0;

    console.log(categoryNos);
    const by = searchParams.by;
    const direction = searchParams.direction;

    const mainSearchCategoryNo = childCategoryNo || categoryNo;

    const productSearchParams: ProductSearchParams = {
        pageNumber,
        pageSize,
        categoryNos: [mainSearchCategoryNo],
        order: {
            by: by || SORT_OPTIONS[0].by,
            direction: direction || SORT_OPTIONS[0].direction,
        },
        categoryOperator: 'AND',
        filter: {
            soldout: true,
            discountedComparison: 'BETWEEN',
            saleStatus: 'RESERVATION_AND_ONSALE',
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

    const totalCount =
        initialData[initialData.length - 1]?.data.totalCount ?? 0;

    const categoryData = await category.getCategory(NEW_CATEGORY_NO).json();

    return (
        <section
            className={css({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                gap: { base: '0', md: '40px' },
            })}
        >
            <ProductSearchFilter props={props} />

            <div
                className={vstack({
                    gap: { base: '0', md: '36px' },
                    alignItems: 'end',
                    marginTop: { base: '0', md: '80px' },
                    flex: 1,
                })}
            >
                <ProductSearchSort isMobile={isMobile} onlyRender='desktop' />

                <NewProductList
                    searchParams={productSearchParams}
                    initialData={initialData}
                />
            </div>
        </section>
    );
}
