import { parseAsEnum } from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';
import type { AccumulationReasonType } from '@/models';

type AccumulationsReasonTab = 'ALL' | AccumulationReasonType;

const accumulationsReasonTabParser = parseAsEnum<AccumulationsReasonTab>([
    'ALL',
    'ADD',
    'SUB',
] as const).withDefault('ALL');

const accumulationsReasonTabOptions = (
    t: Translate,
): ReadonlyArray<ToggleOption<AccumulationsReasonTab>> => [
    { value: 'ALL', label: t('전체') },
    { value: 'ADD', label: t('적립') },
    { value: 'SUB', label: t('사용') },
];

export const accumulationsReasonTabSpec = {
    parser: accumulationsReasonTabParser,
    options: accumulationsReasonTabOptions,
    defaultValue: 'ALL' as const,
} as const;
