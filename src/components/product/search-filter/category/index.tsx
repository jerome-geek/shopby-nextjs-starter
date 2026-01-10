import { isEmpty } from '@fxts/core';
import { notFound } from 'next/navigation';

import { getCachedCategoryData } from '@/api/display/category.server';
import ChildCategory from '@/components/product/search-filter/category/ChildCategory';
import { css } from '@/styled-system/css';
import { findFlatCategory, findMultiLevelCategory } from '@/utils/category';
import { getIsMobile } from '@/utils/device.server';

export default async function Category({
    categoryNo,
    childCategoryNo,
}: {
    categoryNo: number;
    childCategoryNo?: number;
}) {
    try {
        const isMobile = await getIsMobile();

        const selectCategoryNo = childCategoryNo || categoryNo;

        const mainCategoryData = await getCachedCategoryData();

        const flatCategory = findFlatCategory(
            mainCategoryData?.flatCategories ?? [],
            categoryNo,
        );

        const multiLevelCategory = flatCategory
            ? findMultiLevelCategory(
                  mainCategoryData?.multiLevelCategories ?? [],
                  flatCategory,
                  categoryNo,
              )
            : null;

        if (!multiLevelCategory) {
            return notFound();
        }

        const isEmptyChildCategory = isEmpty(multiLevelCategory?.children);

        return (
            <div>
                <div
                    className={css({
                        padding: '40px 0 24px',
                        display: { base: 'none', md: 'block' },
                        borderBottom: isEmptyChildCategory
                            ? '2px solid {colors.black}'
                            : 'none',
                    })}
                >
                    <h1 className={css({ textStyle: 'display1.semibold' })}>
                        {multiLevelCategory.label}
                    </h1>
                </div>

                <ChildCategory
                    categoryNo={categoryNo}
                    selectCategoryNo={selectCategoryNo}
                    childCategoryList={multiLevelCategory?.children ?? []}
                    isMobile={isMobile}
                />
            </div>
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
