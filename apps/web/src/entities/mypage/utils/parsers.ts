import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createParser, parseAsString } from 'nuqs';

dayjs.extend(customParseFormat);

export const parseAsYmd = createParser<string>({
    parse: (value) => {
        return dayjs(value, 'YYYY-MM-DD', true).isValid() ? value : null;
    },
    serialize: (value) => value,
});

export const parseAsPositiveInt = createParser<number>({
    parse: (value) => {
        const n = Number.parseInt(value, 10);
        return Number.isFinite(n) && n > 0 ? n : null;
    },
    serialize: (value) => String(value),
});

export const parseAsOptionalString = parseAsString;

export const parseAsEnum = <T extends string>(allowed: readonly T[]) => {
    return createParser<T>({
        parse: (value) => {
            return (allowed as readonly string[]).includes(value) ? (value as T) : null;
        },
        serialize: (value) => value,
    });
};

