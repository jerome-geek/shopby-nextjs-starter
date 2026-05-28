import Script from 'next/script';

export function ExternalScripts() {
    return (
        <>
            <meta
                name='naver-site-verification'
                content='1363febc455fbd821313d799e1f553a3dffdb1cc'
            />
            <meta
                name='google-site-verification'
                content='tltrrMHJ9cWS78-F9Mv0zbl8c0rjNuKBr60rmXdOPJI'
            />
            {/* 샵바이 관련 */}
            <Script
                id='myapp-script'
                src='https://static.nhn-commerce.com/script/myapp.js'
                strategy='afterInteractive'
            />
            <Script
                id='shopby-external-script'
                src='https://shopby-skin.cdn-nhncommerce.com/shopby-external-script.js'
                strategy='afterInteractive'
            />
            {/* 기타 분석 도구 (GA, Pixel 등) */}
            {/* <Script id="google-analytics" ... /> */}
        </>
    );
}
