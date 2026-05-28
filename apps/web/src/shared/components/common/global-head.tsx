import { generateDefaultSeo } from 'next-seo/pages';
import Head from 'next/head';

/**
 * 전역 Head 설정 컴포넌트
 * - viewport, 기본 SEO, 공통 메타 태그 등을 관리합니다.
 */
const GlobalHead = () => {
    const defaultSeo = generateDefaultSeo({
        titleTemplate: '%s | JollyPot',
        defaultTitle: 'JollyPot',
        noindex: true,
        nofollow: true,
    });

    return (
        <Head>
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
            />
            {defaultSeo}
        </Head>
    );
};

export default GlobalHead;
