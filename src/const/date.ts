import { map, pipe, range, reverse, toArray } from '@fxts/core';

const currentYear = new Date().getFullYear();

// 1900년부터 현재 연도로부터 14년 전까지의 연도 리스트를 생성합니다.
const yearList = pipe(
    range(1900, currentYear - 14),
    map((a) => ({ label: `${a}`, value: `${a}` })),
    reverse,
    toArray
);

// const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthList = pipe(
    range(1, 13),
    map((a) =>
        a >= 10
            ? { label: `${a}`, value: `${a}` }
            : { label: `0${a}`, value: `0${a}` }
    ),
    toArray
);

// const dayList = Array.from({ length: 31 }, (_, index) => index + 1);
const dayList = pipe(
    range(1, 32),
    map((a) =>
        a >= 10
            ? { label: `${a}`, value: `${a}` }
            : { label: `0${a}`, value: `0${a}` }
    ),
    toArray
);

export { dayList as DAY_LIST, monthList as MONTH_LIST, yearList as YEAR_LIST };
