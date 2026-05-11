import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='ko'>
            <Head>
                {/** NOTE: ios에서 input 포커스 시 화면 확대 방지 */}
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
                />
                <link
                    rel='stylesheet'
                    as='style'
                    crossOrigin='anonymous'
                    href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
