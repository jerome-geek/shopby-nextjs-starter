import { cache } from 'react';
import { isEmpty } from '@fxts/core';

import { category } from '@/api/display';

export const getCachedCategoryData = cache(async () => {
    try {
        const response = await category
            .getCategoriesByManagementCode({ codes: ['MAIN'] })
            .json();

        const categoryNo = response?.[0]?.displayCategoryNo ?? 0;

        if (categoryNo) {
            const categoryResponse = await category
                .getCategory(categoryNo.toString())
                .json();

            if (!isEmpty(categoryResponse?.multiLevelCategories)) {
                return categoryResponse;
            }
        }

        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
});
