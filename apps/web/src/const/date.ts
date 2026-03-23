const currentYear = new Date().getFullYear();

export const YEAR_LIST = Array.from({ length: 100 }, (_, i) => ({
    label: `${currentYear - i}년`,
    value: String(currentYear - i),
}));

export const MONTH_LIST = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}월`,
    value: String(i + 1).padStart(2, '0'),
}));

export const DAY_LIST = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}일`,
    value: String(i + 1).padStart(2, '0'),
}));
