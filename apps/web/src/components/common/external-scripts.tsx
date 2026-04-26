import Script from 'next/script';

export function ExternalScripts() {
    return (
        <>
            {/* 샵바이 관련 */}
            <Script
                id="myapp-script"
                src="https://static.nhn-commerce.com/script/myapp.js"
                strategy="afterInteractive"
            />
            <Script
                id="shopby-external-script"
                src="https://shopby-skin.cdn-nhncommerce.com/shopby-external-script.js"
                strategy="afterInteractive"
            />
            {/* 기타 분석 도구 (GA, Pixel 등) */}
            {/* <Script id="google-analytics" ... /> */}
        </>
    );
}
