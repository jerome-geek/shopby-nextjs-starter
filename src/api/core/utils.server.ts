import { getCookie, getCookies, hasCookie } from 'cookies-next/server';

export const getCookiesFromServer = async () => {
    const { cookies } = await import('next/headers');

    const allCookies = await getCookies({ cookies });

    return allCookies;
};
