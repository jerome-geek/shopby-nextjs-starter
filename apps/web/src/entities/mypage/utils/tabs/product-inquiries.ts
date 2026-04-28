import {
    parseAsEnum,
    parseAsOptionalString,
} from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';
import type { ProductInquirySearchType } from '@/models';

type ProductInquiriesAnsweredTab = 'ALL' | 'true' | 'false';

const productInquiriesAnsweredTabParser =
    parseAsEnum<ProductInquiriesAnsweredTab>([
        'ALL',
        'true',
        'false',
    ] as const).withDefault('ALL');

const resolveAnsweredParam = (tab: ProductInquiriesAnsweredTab) => {
    if (tab === 'ALL') {
        return undefined;
    }
    return tab === 'true';
};

const productInquiriesAnsweredTabOptions = (
    t: Translate,
): ReadonlyArray<ToggleOption<ProductInquiriesAnsweredTab>> => [
    { value: 'ALL', label: t('전체') },
    { value: 'false', label: t('답변 대기') },
    { value: 'true', label: t('답변 완료') },
];

export const productInquiriesSearchTypeParser =
    parseAsEnum<ProductInquirySearchType>([
        'ALL',
        'PRODUCT_NAME',
        'CONTENT',
    ] as const).withDefault('ALL');

export const productInquiriesSearchKeywordParser = parseAsOptionalString;

export const productInquiriesAnsweredTabSpec = {
    parser: productInquiriesAnsweredTabParser,
    options: productInquiriesAnsweredTabOptions,
    resolveAnsweredParam,
    defaultValue: 'ALL' as const,
} as const;
