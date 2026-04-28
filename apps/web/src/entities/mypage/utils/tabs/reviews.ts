import { parseAsEnum } from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';

type ReviewTabQuery = 'REVIEWABLE' | 'MY_REVIEW';

const reviewTabParser = parseAsEnum<ReviewTabQuery>([
    'REVIEWABLE',
    'MY_REVIEW',
] as const).withDefault('REVIEWABLE');

const reviewTabOptions = (
    t: Translate,
): ReadonlyArray<ToggleOption<ReviewTabQuery>> => [
    { value: 'REVIEWABLE', label: t('작성 가능한 리뷰') },
    { value: 'MY_REVIEW', label: t('내 리뷰') },
];

export const reviewTabSpec = {
    parser: reviewTabParser,
    options: reviewTabOptions,
    defaultValue: 'REVIEWABLE' as const,
} as const;
