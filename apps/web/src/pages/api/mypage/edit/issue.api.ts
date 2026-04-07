import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

import {
    createMypageEditToken,
    MYPAGE_EDIT_COOKIE_NAME,
} from '@/utils/editToken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const password = String(req.body?.password ?? '');
    if (!password) {
        res.status(400).json({ message: 'password is required' });
        return;
    }

    const token = createMypageEditToken(password);

    setCookie(MYPAGE_EDIT_COOKIE_NAME, token, {
        req,
        res,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 10,
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ ok: true });
}
