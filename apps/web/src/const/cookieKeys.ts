const PREFIX = 'SHOPBY';
const MALL_ID = 'JOLLYPOT';

const prefixed = (key: string) => `${PREFIX}_${MALL_ID}_${key}`;

export const COOKIE_KEYS = {
    ACCESS_TOKEN: prefixed('ACCESS_TOKEN'),
    REFRESH_TOKEN: prefixed('REFRESH_TOKEN'),
    GUEST_TOKEN: prefixed('GUEST_TOKEN'),
} as const;
