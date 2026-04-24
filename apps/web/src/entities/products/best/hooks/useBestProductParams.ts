import { parseAsInteger, useQueryStates } from 'nuqs';

export const useBestProductParams = () => {
    return useQueryStates({
        pageNumber: parseAsInteger.withDefault(1),
        categoryNo: parseAsInteger,
        pageSize: parseAsInteger.withDefault(12),
    });
};
