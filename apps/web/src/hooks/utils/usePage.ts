import { PATHS } from '@/const/paths';
import { useRouter } from 'next/router';

const usePage = () => {
    const router = useRouter();

    const isShopMainPage =
        router.pathname === PATHS.SHOP.DISCOVERY ||
        router.pathname === '/shop/[slug]';

    const isCallbackPage =
        router.pathname === PATHS.CALLBACK.AUTH ||
        router.pathname === PATHS.CALLBACK.KCP_AUTH;

    const isMyAppBridgePage = router.pathname === '/app/auth.html';

    return {
        isShopMainPage,
        isCallbackPage,
        isMyAppBridgePage,
    };
};

export default usePage;
