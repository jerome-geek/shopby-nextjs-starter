import { FlatCategory } from '@/models/display';

const findCategory = (
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

export default findCategory;
