import {
    parseAsEnum,
    parseAsOptionalString,
} from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';
import type { InquirySearchType, InquiryStatusType } from '@/models';

type InquiriesStatusTab = 'ALL' | InquiryStatusType;

const inquiriesStatusTabParser = parseAsEnum<InquiriesStatusTab>([
    'ALL',
    'ISSUED',
    'ANSWERED',
] as const).withDefault('ALL');

const inquiriesStatusTabOptions = (
    t: Translate,
): ReadonlyArray<ToggleOption<InquiriesStatusTab>> => [
    { value: 'ALL', label: t('전체') },
    { value: 'ISSUED', label: t('답변 대기') },
    { value: 'ANSWERED', label: t('답변 완료') },
];

type InquiriesSearchTypeTab = InquirySearchType;

export const inquiriesSearchTypeParser = parseAsEnum<InquiriesSearchTypeTab>([
    'ALL',
    'TITLE',
    'CONTENT',
] as const).withDefault('ALL');

export const inquiriesKeywordParser = parseAsOptionalString;

export const inquiriesStatusTabSpec = {
    parser: inquiriesStatusTabParser,
    options: inquiriesStatusTabOptions,
    defaultValue: 'ALL' as const,
} as const;
