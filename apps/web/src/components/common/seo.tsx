import Head from 'next/head';

/**
 * 페이지별 SEO 메타태그 컴포넌트
 *
 * - 기본 메타태그(title, description 등)는 최상위 컴포넌트(_app.tsx)에서 관리
 * - 이 컴포넌트는 props로 전달된 값만 렌더링 (값이 없으면 해당 태그 자체를 생략)
 * - JSON-LD 구조화 데이터도 jsonLd prop으로 주입 가능
 */

// ─── Types ───────────────────────────────────────────────

interface SeoProps {
    /* 기본 메타 */
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
    author?: string;

    /* 크롤링 제어 */
    type?: 'website' | 'product' | 'article';
    noindex?: boolean;

    /* 쇼핑몰 특화 (상품 페이지 전용) */
    priceAmount?: number;
    priceCurrency?: string;
    brandName?: string;

    /* 구조화 데이터 (JSON-LD) */
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

// ─── Component ───────────────────────────────────────────

const SITE_NAME = 'JollyPot';

export default function Seo({
    title,
    description,
    image,
    url,
    keywords,
    author,
    type,
    noindex,
    priceAmount,
    priceCurrency = 'KRW',
    brandName,
    jsonLd,
}: SeoProps) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    return (
        <Head>
            {/* ── 기본 메타 태그 ── */}
            <title>{fullTitle}</title>
            {description && <meta name='description' content={description} />}
            {keywords && <meta name='keywords' content={keywords} />}
            {author && <meta name='author' content={author} />}

            {/* ── 크롤링 및 인덱싱 제어 ── */}
            {noindex && <meta name='robots' content='noindex, nofollow' />}
            {/* Canonical: URL 파라미터로 인한 중복 페이지 방지 */}
            {url && <link rel='canonical' href={url} />}

            {/* ── Open Graph (카카오톡 · 페이스북 · 네이버 등) ── */}
            {type && <meta property='og:type' content={type} />}
            <meta property='og:title' content={fullTitle} />
            {description && (
                <meta property='og:description' content={description} />
            )}
            {image && (
                <>
                    <meta property='og:image' content={image} />
                    <meta property='og:image:alt' content={title || ''} />
                </>
            )}
            <meta property='og:locale' content='ko_KR' />
            {url && <meta property='og:url' content={url} />}

            {/* ── 쇼핑몰 특화 (페이스북 · 인스타그램 다이나믹 광고 등) ── */}
            {type === 'product' && (
                <>
                    {priceAmount !== undefined && (
                        <meta
                            property='product:price:amount'
                            content={priceAmount.toString()}
                        />
                    )}
                    {priceCurrency && (
                        <meta
                            property='product:price:currency'
                            content={priceCurrency}
                        />
                    )}
                    {brandName && (
                        <meta property='product:brand' content={brandName} />
                    )}
                </>
            )}

            {/* ── Twitter · 슬랙 · 디스코드 ── */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            {description && (
                <meta name='twitter:description' content={description} />
            )}
            {image && <meta name='twitter:image' content={image} />}

            {/* ── JSON-LD 구조화 데이터 (구글 리치 검색결과) ── */}
            {jsonLd && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd),
                    }}
                />
            )}

            <link
                rel='icon'
                type='image/png'
                href='/favicon-96x96.png'
                sizes='96x96'
            />
            <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
            <link rel='shortcut icon' href='/favicon.ico' />
            <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/apple-touch-icon.png'
            />
            <meta
                name='apple-mobile-web-app-title'
                content={title || SITE_NAME}
            />
            <link rel='manifest' href='/site.webmanifest' />
        </Head>
    );
}
