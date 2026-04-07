import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

import { MYPAGE_EDIT_COOKIE_NAME } from '@/utils/editToken';

const COOKIE_NAME = MYPAGE_EDIT_COOKIE_NAME;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    deleteCookie(COOKIE_NAME, { req, res, path: '/' });
    res.status(200).json({ ok: true });
}
