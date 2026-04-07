import crypto from 'crypto';

export const MYPAGE_EDIT_COOKIE_NAME = 'mypage_edit_token';
const MYPAGE_EDIT_TOKEN_SECRET = 'mypage_edit_token_secret';

const TTL_MS = 1000 * 60 * 10; // 10분
const IV_SIZE = 12;
const TAG_SIZE = 16;

type Payload = {
    password: string;
    expiresAt: number;
};

export type MypageEditTokenValidationResult =
    | { ok: true; payload: Payload }
    | {
          ok: false;
          reason:
              | 'malformed_token'
              | 'decrypt_failed'
              | 'invalid_payload'
              | 'expired';
      };

const getKey = () => {
    return crypto
        .createHash('sha256')
        .update(MYPAGE_EDIT_TOKEN_SECRET)
        .digest();
};

const toBase64Url = (buffer: Buffer) => {
    return buffer
        .toString('base64')
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');
};

const fromBase64Url = (input: string) => {
    const base64 = input.replaceAll('-', '+').replaceAll('_', '/');
    const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        '=',
    );
    return Buffer.from(padded, 'base64');
};

export const createMypageEditToken = (password: string) => {
    const initializationVector = crypto.randomBytes(IV_SIZE);
    const encryptor = crypto.createCipheriv(
        'aes-256-gcm',
        getKey(),
        initializationVector,
    );

    const payload = {
        password,
        expiresAt: Date.now() + TTL_MS,
    } satisfies Payload;
    const plaintext = Buffer.from(JSON.stringify(payload), 'utf8');
    const ciphertext = Buffer.concat([
        encryptor.update(plaintext),
        encryptor.final(),
    ]);
    const authenticationTag = encryptor.getAuthTag();

    return toBase64Url(
        Buffer.concat([initializationVector, authenticationTag, ciphertext]),
    );
};

export const readMypageEditToken = (token: string) => {
    const result = validateMypageEditToken(token);
    return result.ok ? result.payload : null;
};

export const validateMypageEditToken = (
    token: string,
): MypageEditTokenValidationResult => {
    let raw: Buffer;

    try {
        raw = fromBase64Url(token);
    } catch {
        return { ok: false, reason: 'malformed_token' };
    }

    if (raw.length <= IV_SIZE + TAG_SIZE) {
        return { ok: false, reason: 'malformed_token' };
    }

    const initializationVector = raw.subarray(0, IV_SIZE);
    const authenticationTag = raw.subarray(IV_SIZE, IV_SIZE + TAG_SIZE);
    const ciphertext = raw.subarray(IV_SIZE + TAG_SIZE);

    let plaintext: string;

    try {
        const decryptor = crypto.createDecipheriv(
            'aes-256-gcm',
            getKey(),
            initializationVector,
        );
        decryptor.setAuthTag(authenticationTag);
        plaintext = Buffer.concat([
            decryptor.update(ciphertext),
            decryptor.final(),
        ]).toString('utf8');
    } catch {
        return { ok: false, reason: 'decrypt_failed' };
    }

    let payload: Payload;

    try {
        payload = JSON.parse(plaintext) as Payload;
    } catch {
        return { ok: false, reason: 'invalid_payload' };
    }

    if (!payload?.password || !payload?.expiresAt) {
        return { ok: false, reason: 'invalid_payload' };
    }

    if (Date.now() > payload.expiresAt) {
        return { ok: false, reason: 'expired' };
    }

    return { ok: true, payload };
};
