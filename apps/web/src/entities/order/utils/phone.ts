import { type PhonePrefixType } from '@/schema/common.schema';

export const parsePhoneString = (phone: string) => {
    return {
        prefix: phone.slice(0, 3) as PhonePrefixType,
        middle: phone.slice(3, -4),
        suffix: phone.slice(-4),
    };
};

export const parsePhoneStringByHyphen = (phone: string | null | undefined) => {
    if (!phone)
        return { prefix: '010' as PhonePrefixType, middle: '', suffix: '' };

    // 하이픈이 포함된 경우 split 처리
    if (phone.includes('-')) {
        const [prefix, middle, suffix] = phone.split('-');
        return {
            prefix: (prefix || '010') as PhonePrefixType,
            middle: middle || '',
            suffix: suffix || '',
        };
    }

    // 하이픈이 없는 경우 기존 slice 방식 활용
    return parsePhoneString(phone);
};
