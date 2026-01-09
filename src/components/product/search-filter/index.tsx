import { ProductsPageProps } from '@/app/categories/[categoryNo]/products/page';
import Category from '@/components/product/search-filter/category';
import { css } from '@/styled-system/css';
import Filter from '@/components/product/search-filter/Filter';
import { category } from '@/api/display';

export default async function ProductSearchFilter({
    props,
}: {
    props: ProductsPageProps;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const categoryNo = Number(params.categoryNo) || 0;
    const childCategoryNo = Number(searchParams?.childCategoryNo ?? '') || 0;

    const mainCategoryResponse = await category
        .getCategoriesByManagementCode({ codes: ['MAIN'] })
        .json();

    const filterResponse = await category
        .getCategoriesByManagementCode({ codes: ['FILTER'] })
        .json();

    const itemInfoResponse = await category
        .getCategoriesByManagementCode({ codes: ['ITEM_INFO'] })
        .json();

    const mainCategoryNo = mainCategoryResponse?.[0]?.displayCategoryNo ?? 0;
    const filterCategoryNo = filterResponse?.[0]?.displayCategoryNo ?? 0;
    const itemInfoCategoryNo = itemInfoResponse?.[0]?.displayCategoryNo ?? 0;

    return (
        <div
            className={css({
                width: '100%',
                maxWidth: { base: '100%', md: '204px' },
            })}
        >
            <Category
                categoryNo={categoryNo}
                childCategoryNo={childCategoryNo}
            />

            <Filter
                categoryNo={categoryNo}
                childCategoryNo={childCategoryNo}
                filterCategoryNo={filterCategoryNo}
                itemInfoCategoryNo={itemInfoCategoryNo}
                mainCategoryNo={mainCategoryNo}
            />
        </div>
    );
}
