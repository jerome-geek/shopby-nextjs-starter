import { parseAsInteger, useQueryStates } from 'nuqs';

export const useNewProductParams = () => {
    return useQueryStates({
        pageNumber: parseAsInteger.withDefault(1),
        categoryNo: parseAsInteger,
        pageSize: parseAsInteger.withDefault(20),
    });
};
