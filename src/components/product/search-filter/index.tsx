import { ProductsPageProps } from '@/app/categories/[categoryNo]/products/page';
import Category from '@/components/product/search-filter/category';
import { css } from '@/styled-system/css';

export default async function ProductSearchFilter({
    props,
}: {
    props: ProductsPageProps;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const categoryNo = Number(params.categoryNo) || 0;
    const childCategoryNo = Number(searchParams?.childCategoryNo ?? '') || 0;

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
        </div>
    );
}
