import { getPlatform } from '@/api/core/utils';
import { env } from '@/configs/env';
import { PATHS } from '@/const/paths';
import type { NaverPayOrderSheetItem } from '@/models/order/naverPay';
import { accessTokenCookie } from '@/utils/cookie';

// import type { NaverPayOrderSheetItem } from '@/models/order';
// import { getPlatform } from '@/utils';
// import { authCookieManager } from '@/utils/cookie';
// import { checkLogin } from '@/utils/users';

const payment = {
    setConfiguration: () => {
        const accessToken = accessTokenCookie.get();

        return window.NCPPay.setConfiguration({
            clientId: env.NEXT_PUBLIC_CLIENT_ID,
            confirmUrl: `${window.location.origin}${PATHS.ORDER.COMPLETE}`,
            platform: getPlatform(),
            currency: env.NEXT_PUBLIC_CURRENCY,
            // shopbyAuthorization: checkLogin()
            //     ? `Bearer ${accessToken}`
            //     : undefined,
            shopbyAuthorization: accessToken
                ? `Bearer ${accessToken}`
                : undefined,
            language: env.NEXT_PUBLIC_LOCALE,
        });
    },
    reservation: (
        paymentData: any,
        callback?: (response: any) => void,
        errorCallback?: (error: ShopByErrorResponse) => void,
    ) => {
        if (!window.NCPPay) {
            throw new Error('ncp_pay 스크립트를 로드해주세요.');
        }

        window.NCPPay.reservation(
            paymentData,
            (response) => {
                console.log('🚀 ~ response:', response);
                callback?.(response);
            },
            (error) => {
                console.log('🚀 ~ error:', error);
                errorCallback?.(error);
            },
            false,
        );
    },
    naverPayOrder: (items: NaverPayOrderSheetItem[]) => {
        if (!window.NCPPay) {
            throw new Error('ncp_pay 스크립트를 로드해주세요.');
        }

        window.NCPPay.requestNaverPayOrder(
            {
                items,
                clientReturnUrl: `${window.location.origin}/order/complete`,
            },
            (error: ShopByErrorResponse) => {
                console.error(error);
            },
        );
    },
    naverPayWish: (productNo: number) => {
        if (!window.NCPPay) {
            throw new Error('ncp_pay 스크립트를 로드해주세요.');
        }

        window.NCPPay.requestNaverPayWishList({
            productNo,
            clientReturnUrl: location.href,
        });
    },
};

export default Object.freeze(payment);
