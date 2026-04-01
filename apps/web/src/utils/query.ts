export const getSafeQueryString = (
    value: string | string[] | undefined | null,
) => {
    if (typeof value === 'string') {
        return value;
    }

    if (Array.isArray(value)) {
        return value[0] ?? '';
    }

    return '';
};
