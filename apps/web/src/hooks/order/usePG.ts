import { includes } from '@fxts/core';
import { useScript } from 'usehooks-ts';

import type { PgType } from '@/models';

const usePG = ({ pgType }: { pgType?: PgType } = {}) => {
    useScript('https://shop-api.e-ncp.com/payments/ncp_pay.js');

    /** KCP */
    useScript('https://spay.kcp.co.kr/plugin/kcp_spay_hub.js', {
        shouldPreventLoad: !includes(pgType, ['KCP', 'KCP_MOBILE', 'KCP_APP']),
    });

    /** 이니시스 */
    useScript('https://stdpay.inicis.com/stdjs/INIStdPay.js', {
        shouldPreventLoad: !includes(pgType, ['INICIS']),
    });

    /** 토스페이먼츠 */
    useScript('https://xpay.tosspayments.com/xpay/js/xpay_crossplatform.js', {
        shouldPreventLoad: !includes(pgType, ['TOSS_PAYMENTS', 'LG_U_PLUS']),
    });

    /** 나이스페이 */
    useScript('https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js', {
        shouldPreventLoad: !includes(pgType, ['NICEPAY']),
    });

    /** 네이버페이 결제형 */
    useScript('https://nsp.pay.naver.com/sdk/js/naverpay.min.js', {
        shouldPreventLoad: !includes(pgType, ['NAVER_EASY_PAY']),
    });

    /** 갤럭시아머니트리 */
    useScript('https://pay.billgate.net/paygate/plugin/gx_web_client.js', {
        shouldPreventLoad: !includes(pgType, ['GALAXIA_MONEY_TREE']),
    });

    /** 엑심베이 */
    useScript('https://api.eximbay.com/v1/javascriptSDK.js', {
        shouldPreventLoad: !includes(pgType, ['EXIMBAY_GLOBAL']),
    });
    /** NOTE: 엑심베이의 경우 아래 스크립트도 로드되어야함 */
    useScript('https://spay.kcp.co.kr/plugin/kcp_spay_hub.js', {
        shouldPreventLoad: !includes(pgType, ['EXIMBAY_GLOBAL']),
    });
};

export default usePG;
