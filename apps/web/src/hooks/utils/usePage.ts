import { PATHS } from '@/const/paths';
import { useRouter } from 'next/router';

const usePage = () => {
    const router = useRouter();

    const isShopMainPage =
        router.asPath === PATHS.SHOP.DISCOVERY ||
        router.asPath === PATHS.SHOP.KIDS ||
        router.asPath === PATHS.SHOP.LIFE;

    return {
        isShopMainPage,
    };
};

export default usePage;
