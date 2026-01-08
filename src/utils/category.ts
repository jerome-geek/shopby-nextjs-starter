import { FlatCategory, MultiLevelCategory } from '@/models/display';

export const findFlatCategory = (
    flatCategories: FlatCategory[],
    categoryNo: string | number,
) => {
    const findCategory = flatCategories?.find(
        (category) =>
            category.depth1CategoryNo === Number(categoryNo) ||
            category.depth2CategoryNo === Number(categoryNo) ||
            category.depth3CategoryNo === Number(categoryNo) ||
            category.depth4CategoryNo === Number(categoryNo) ||
            category.depth5CategoryNo === Number(categoryNo) ||
            false,
    );

    return findCategory;
};

export const findMultiLevelCategory = (
    multiLevelCategories: MultiLevelCategory[],
    flatCategory: FlatCategory,
    categoryNo: number,
    index = 1,
): MultiLevelCategory | null => {
    const findCategory = multiLevelCategories?.find(
        (category) =>
            category.categoryNo ===
            flatCategory[`depth${index}CategoryNo` as keyof FlatCategory],
    );

    if (findCategory?.categoryNo === categoryNo) {
        return findCategory;
    }

    if (findCategory) {
        return findMultiLevelCategory(
            findCategory?.children ?? [],
            flatCategory,
            categoryNo,
            index + 1,
        );
    }

    return null;
};
