import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * ## On-Demand Revalidation API (ISR 캐시 강제 갱신)
 *
 * [1. 토큰 발급 및 설정 방법]
 * - 터미널에서 다음 명령어로 무작위 64자 문자열 생성:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 * - 생성된 값을 Vercel 환경 변수 'REVALIDATE_SECRET'에 저장하세요.
 *
 * [2. S3 어드민 연동 가이드]
 * - 어드민이 S3 정적 호스팅(Client-side)이므로 네트워크 탭에 토큰이 노출될 수밖에 없습니다.
 * - 최선책: 어드민이 호출하는 '데이터 수정 API 백엔드' 서버에서 이 API를 백엔드 간 통신(Server-to-Server)으로 호출하는 것.
 * - 차선책: S3 브라우저에서 직접 호출 시, 아래 코드처럼 'x-revalidate-token' 헤더를 사용하고
 *   API 서버에서 CORS(Allow-Origin) 설정을 어드민 도메인으로만 제한해야 합니다.
 *
 * [3. 호출 예시 (Fetch)]
 * fetch('/api/revalidate?path=/products/123', {
 *   headers: { 'x-revalidate-token': 'YOUR_SECRET_TOKEN' }
 * })
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // 1. 보안 검증 (Header 방식 우선 체크)
    const secret = req.headers['x-revalidate-token'] || req.query.secret;

    if (secret !== process.env.REVALIDATE_SECRET) {
        return res.status(401).json({
            message: 'Invalid token',
            hint: 'Check x-revalidate-token header or secret query parameter',
        });
    }

    // 2. 갱신할 경로 확인
    const path = req.query.path as string;

    if (!path) {
        return res.status(400).json({ message: 'Path parameter is required' });
    }

    try {
        // 3. 해당 경로의 캐시를 즉시 무효화하고 다시 생성 시도
        await res.revalidate(path);

        return res.json({
            revalidated: true,
            path,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        // 갱신 도중 오류 발생 시
        console.error('Revalidation error:', err);
        return res.status(500).send('Error revalidating');
    }
}
