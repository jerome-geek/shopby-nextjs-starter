import { useMemo } from 'react';

import { CATEGORY_CODE } from '@/const/category';
import { useCategoryAll } from '@/hooks/query/display/category';
import type { CategoryAllParams as UseCategoryAllParams } from '@/entities/category/queries';
import { useCategoryAll as useSuspenseCategoryAll } from '@/hooks/suspenseQuery/display/category';
import type { GetCategoriesResponse } from '@/models/display/category';

const useDerivedMainCategory = ({
    categoryAllData,
}: {
    categoryAllData?: GetCategoriesResponse;
}) => {
    return useMemo(() => {
        const mainCategory = categoryAllData?.multiLevelCategories.find(
            (category) => category.managementCode === CATEGORY_CODE.MAIN,
        );

        const mainCategoryNo = mainCategory?.categoryNo ?? 0;
        const mainCategoryChildrenList = mainCategory
            ? mainCategory.children
            : [];

        const kidsCategoryNo =
            mainCategoryChildrenList?.find(
                (category) => category.managementCode === CATEGORY_CODE.KIDS,
            )?.categoryNo ?? 0;

        const lifeCategoryNo =
            mainCategoryChildrenList?.find(
                (category) => category.managementCode === CATEGORY_CODE.LIFE,
            )?.categoryNo ?? 0;

        const oneDepthDefaultCategoryNo =
            mainCategoryChildrenList?.[0]?.categoryNo ?? 0;

        return {
            mainCategory,
            mainCategoryChildrenList,
            mainCategoryNo,
            kidsCategoryNo,
            lifeCategoryNo,
            oneDepthDefaultCategoryNo,
        };
    }, [categoryAllData]);
};

export const useSuspenseMainCategory = () => {
    const { data: categoryAllData } = useSuspenseCategoryAll();

    return useDerivedMainCategory({ categoryAllData });
};

export const useMainCategory = ({ options }: UseCategoryAllParams = {}) => {
    const { data: categoryAllData, ...props } = useCategoryAll({ options });

    return {
        ...useDerivedMainCategory({ categoryAllData }),
        ...props,
    };
};
