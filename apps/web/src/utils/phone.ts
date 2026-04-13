import { PHONE_PREFIX_NUMBER_LIST } from '@/const/form';

export const parseKrPhoneParts = ({
    receiverContact1,
    isKorean,
}: {
    receiverContact1?: string | null;
    isKorean: boolean;
}) => {
    const raw = receiverContact1 ?? '';
    const digits = raw.replace(/\D/g, '');

    if (!isKorean) {
        return { prefix: digits || raw, middle: '', suffix: '' };
    }

    if (raw.includes('-')) {
        const [prefix = '', middle = '', suffix = ''] = raw.split('-');
        const findPrefix =
            PHONE_PREFIX_NUMBER_LIST.find((x) => x.value === prefix)?.value ??
            PHONE_PREFIX_NUMBER_LIST[0]!.value;
        return { prefix: findPrefix, middle, suffix };
    }

    if (digits.length < 9) {
        return {
            prefix: '010' as (typeof PHONE_PREFIX_NUMBER_LIST)[number]['value'],
            middle: '',
            suffix: '',
        };
    }

    const prefix = digits.slice(0, 3);
    const findPrefix = PHONE_PREFIX_NUMBER_LIST.find((p) => p.value === prefix);
    const rest = digits.slice(3);

    if (rest.length === 8) {
        return {
            prefix: (findPrefix?.value ??
                PHONE_PREFIX_NUMBER_LIST[0]!
                    .value) as (typeof PHONE_PREFIX_NUMBER_LIST)[number]['value'],
            middle: rest.slice(0, 4),
            suffix: rest.slice(4, 8),
        };
    }

    return {
        prefix: (findPrefix?.value ??
            PHONE_PREFIX_NUMBER_LIST[0]!
                .value) as (typeof PHONE_PREFIX_NUMBER_LIST)[number]['value'],
        middle: rest.slice(0, Math.max(0, rest.length - 4)),
        suffix: rest.slice(-4),
    };
};
