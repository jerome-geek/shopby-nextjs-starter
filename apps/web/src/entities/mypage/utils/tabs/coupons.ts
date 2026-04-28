import { parseAsEnum } from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';

type CouponUsableTab = 'all' | 'true' | 'false';

const couponUsableTabParser = parseAsEnum<CouponUsableTab>([
    'all',
    'true',
    'false',
] as const).withDefault('all');

const couponUsableTabOptions = (
    t: Translate,
): ReadonlyArray<ToggleOption<CouponUsableTab>> => [
    { value: 'all', label: t('전체') },
    { value: 'true', label: t('사용 가능 쿠폰') },
    { value: 'false', label: t('사용 불가 쿠폰') },
];

const resolveUsable = (tab: CouponUsableTab) => {
    return tab === 'all' ? undefined : tab === 'true';
};

export const couponUsableTabSpec = {
    parser: couponUsableTabParser,
    options: couponUsableTabOptions,
    resolveUsable,
    defaultValue: 'all' as const,
} as const;
