import { PATHS } from '@/const/paths';
import { useRouter } from 'next/router';

const usePage = () => {
    const router = useRouter();

    const isShopMainPage =
        router.pathname === PATHS.SHOP.DISCOVERY ||
        router.pathname === '/shop/[slug]';

    return {
        isShopMainPage,
    };
};

export default usePage;
