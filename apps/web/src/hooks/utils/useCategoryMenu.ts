import { useRouter } from 'next/router';

import { CATEGORY_CODE } from '@/const/category';
import { useCategory, useCategoryAll } from '@/hooks/query/display/category';
import type { MultiLevelCategory } from '@/models/display';

const EMPTY_CATEGORY_LIST: MultiLevelCategory[] = [];

const findCategoryPath = (
    mainRoot: MultiLevelCategory,
    targetCategoryNo: number,
): MultiLevelCategory[] | null => {
    if (mainRoot.categoryNo === targetCategoryNo) {
        return [mainRoot];
    }

    for (const child of mainRoot.children ?? []) {
        const childPath = findCategoryPath(child, targetCategoryNo);
        if (childPath) {
            return [mainRoot, ...childPath];
        }
    }

    return null;
};

export const useCategoryMenu = (categoryNoFromProps?: number) => {
    const router = useRouter();
    const { categoryNo: categoryNoFromRoute } = router.query;

    const parsedCategoryNo =
        categoryNoFromProps ??
        Number(
            Array.isArray(categoryNoFromRoute)
                ? categoryNoFromRoute[0]
                : categoryNoFromRoute,
        );

    const { data: categoryAllData } = useCategoryAll();
    const { data: categoryData } = useCategory({
        categoryNo: parsedCategoryNo,
        searchParams: { needsBrands: true },
    });

    const mainCategoryData = categoryAllData?.multiLevelCategories.find(
        (category) => category.managementCode === CATEGORY_CODE.MAIN,
    );

    const categoryBreadcrumbPath =
        mainCategoryData && Number.isFinite(parsedCategoryNo)
            ? findCategoryPath(mainCategoryData, parsedCategoryNo)
            : null;

    const selectedDepth1Category = categoryBreadcrumbPath?.[0];
    const selectedDepth2Category = categoryBreadcrumbPath?.[1];
    const selectedDepth3Category = categoryBreadcrumbPath?.[2];
    const selectedDepth4Category = categoryBreadcrumbPath?.[3];

    const currentCategoryDepth = categoryBreadcrumbPath?.length ?? 0;

    const depth1CategoryList = mainCategoryData
        ? [mainCategoryData]
        : EMPTY_CATEGORY_LIST;
    const depth2CategoryList =
        selectedDepth1Category?.children ?? EMPTY_CATEGORY_LIST;
    const depth3CategoryList =
        selectedDepth2Category?.children ?? EMPTY_CATEGORY_LIST;
    const depth4CategoryList =
        selectedDepth3Category?.children ?? EMPTY_CATEGORY_LIST;

    const depth2CategoryLabel = selectedDepth2Category?.label ?? '';
    const depth1CategoryNo = selectedDepth1Category?.categoryNo;
    const depth2CategoryNo = selectedDepth2Category?.categoryNo;
    const depth3CategoryNo = selectedDepth3Category?.categoryNo;
    const depth4CategoryNo = selectedDepth4Category?.categoryNo;

    return {
        categoryData,
        mainCategoryData,
        categoryBreadcrumbPath,
        currentCategoryDepth,
        depth2CategoryLabel,
        depth1CategoryNo,
        depth2CategoryNo,
        depth3CategoryNo,
        depth4CategoryNo,
        depth1CategoryList,
        depth2CategoryList,
        depth3CategoryList,
        depth4CategoryList,
    };
};
