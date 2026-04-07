import type { NextApiRequest, NextApiResponse } from 'next';

import { profile } from '@/api/member';
import { env } from '@/configs/env';
import { COOKIE_KEYS } from '@/const/cookieKeys';
import {
    MYPAGE_EDIT_COOKIE_NAME,
    validateMypageEditToken,
} from '@/utils/editToken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const token = String(req.cookies?.[MYPAGE_EDIT_COOKIE_NAME] ?? '');
    if (!token) {
        res.status(401).json({ message: 'missing_token' });
        return;
    }

    const validation = validateMypageEditToken(token);
    if (!validation.ok) {
        res.status(401).json({ message: validation.reason });
        return;
    }

    const accessToken = req.cookies?.[COOKIE_KEYS.ACCESS_TOKEN];

    const headers = {
        'Shop-By-Authorization': `Bearer ${accessToken}`,
        version: env.NEXT_PUBLIC_VERSION || '',
        clientId: env.NEXT_PUBLIC_CLIENT_ID || '',
        language: env.NEXT_PUBLIC_LOCALE,
        currency: env.NEXT_PUBLIC_CURRENCY,
        baseURL: process.env.NEXT_PUBLIC_SHOPBY_BASE_URL,
    };

    const { data } = await profile.getNonMaskingMember(
        { password: validation.payload.password },
        { headers },
    );

    res.status(200).json(data);
}
