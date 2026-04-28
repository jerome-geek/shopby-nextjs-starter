import { parseAsEnum } from '@/entities/mypage/utils/parsers';
import type {
    ToggleOption,
    Translate,
} from '@/entities/mypage/utils/tabs/_types';
import type { ClaimType } from '@/models';

type ClaimsTab = 'ALL' | ClaimType;

const claimsTabParser = parseAsEnum<ClaimsTab>([
    'ALL',
    'CANCEL',
    'EXCHANGE',
    'RETURN',
] as const).withDefault('ALL');

const claimsTabOptions = (
    t: Translate,
): ReadonlyArray<ToggleOption<ClaimsTab>> => [
    { value: 'ALL', label: t('전체') },
    { value: 'CANCEL', label: t('취소') },
    { value: 'EXCHANGE', label: t('교환') },
    { value: 'RETURN', label: t('반품') },
];

const resolveClaimTypes = (tab: ClaimsTab) => {
    return tab === 'ALL' ? null : [tab];
};

export const claimsTabSpec = {
    parser: claimsTabParser,
    options: claimsTabOptions,
    resolveClaimTypes,
    defaultValue: 'ALL' as const,
} as const;
